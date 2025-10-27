import Entity, { IEntity } from '@/lib/db/models/Entity';
import EntityMention, { IEntityMention } from '@/lib/db/models/EntityMention';
import EntityInsight, { IEntityInsight } from '@/lib/db/models/EntityInsight';
import { connectToDatabase } from '@/lib/db/mongodb';
import { generateAIResponse } from '@/lib/ai/ai-service';

interface AggregationResult {
  entity: IEntity;
  mentions: IEntityMention[];
  insights: IEntityInsight[];
  summary: string;
  trends: any[];
  relatedEntities: any[];
}

export class EntityAggregationService {
  private static instance: EntityAggregationService;

  private constructor() {}

  public static getInstance(): EntityAggregationService {
    if (!EntityAggregationService.instance) {
      EntityAggregationService.instance = new EntityAggregationService();
    }
    return EntityAggregationService.instance;
  }

  /**
   * Aggregate all data for an entity
   */
  async aggregateEntityData(entityId: string): Promise<AggregationResult | null> {
    await connectToDatabase();

    const entity = await Entity.findById(entityId);
    if (!entity) return null;

    // Get recent mentions
    const mentions = await EntityMention.findByEntity(entityId, 100);

    // Get active insights
    const insights = await EntityInsight.getActiveInsights(entityId);

    // Generate summary if needed
    const summary = await this.generateEntitySummary(entity, mentions);

    // Calculate trends
    const trends = await this.calculateTrends(entity, mentions);

    // Find related entities
    const relatedEntities = await EntityMention.getRelatedEntities(entityId);

    // Update entity master data
    await this.updateEntityMasterData(entity, mentions, insights, summary);

    return {
      entity,
      mentions,
      insights,
      summary,
      trends,
      relatedEntities,
    };
  }

  /**
   * Generate a comprehensive summary for an entity
   */
  private async generateEntitySummary(
    entity: IEntity,
    mentions: IEntityMention[]
  ): Promise<string> {
    if (mentions.length < 3) {
      return `${entity.name} has been mentioned ${entity.mentionCount} times in our analysis.`;
    }

    // Get recent mention contexts
    const recentContexts = mentions
      .slice(0, 10)
      .map(m => m.context)
      .join('\n');

    const prompt = `Generate a brief summary about ${entity.name} based on these recent mentions:

${recentContexts}

Provide a 2-3 sentence summary focusing on key themes and recent developments.`;

    try {
      const summary = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        temperature: 0.5,
      });

      return summary.trim();
    } catch (error) {
      console.error('Failed to generate summary:', error);
      return `${entity.name} is a ${entity.type.toLowerCase()} that has been mentioned ${entity.mentionCount} times.`;
    }
  }

  /**
   * Calculate trends for an entity
   */
  private async calculateTrends(
    entity: IEntity,
    mentions: IEntityMention[]
  ): Promise<any[]> {
    const trends = [];

    // Sentiment trend
    const sentimentData = await EntityMention.getEntitySentiment(entity._id.toString(), 30);
    if (sentimentData) {
      trends.push({
        type: 'sentiment',
        current: sentimentData.averageSentiment,
        change: this.calculateSentimentChange(sentimentData.trend),
        data: sentimentData.trend,
      });
    }

    // Mention frequency trend
    const mentionTrend = this.calculateMentionFrequency(mentions);
    trends.push({
      type: 'mentions',
      current: mentionTrend.current,
      change: mentionTrend.change,
      data: mentionTrend.data,
    });

    // Topic trends (what's being discussed about this entity)
    const topics = await this.extractTrendingTopics(mentions);
    if (topics.length > 0) {
      trends.push({
        type: 'topics',
        current: topics.slice(0, 5),
        emerging: topics.filter(t => t.emerging).slice(0, 3),
      });
    }

    return trends;
  }

  /**
   * Calculate sentiment change over time
   */
  private calculateSentimentChange(
    sentimentTrend: Array<{ date: Date; sentiment: number | undefined }>
  ): number {
    if (sentimentTrend.length < 2) return 0;

    const recent = sentimentTrend.slice(0, Math.ceil(sentimentTrend.length / 2));
    const older = sentimentTrend.slice(Math.ceil(sentimentTrend.length / 2));

    const recentAvg = recent.reduce((sum, item) => sum + (item.sentiment || 0), 0) / recent.length;
    const olderAvg = older.reduce((sum, item) => sum + (item.sentiment || 0), 0) / older.length;

    return recentAvg - olderAvg;
  }

  /**
   * Calculate mention frequency trends
   */
  private calculateMentionFrequency(mentions: IEntityMention[]): any {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const lastDay = mentions.filter(m => m.createdAt >= dayAgo).length;
    const lastWeek = mentions.filter(m => m.createdAt >= weekAgo).length;
    const previousWeek = mentions.filter(
      m => m.createdAt < weekAgo && m.createdAt >= new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    return {
      current: lastDay,
      change: lastWeek - previousWeek,
      data: {
        lastDay,
        lastWeek,
        average: mentions.length / 30, // Assuming 30 days of data
      },
    };
  }

  /**
   * Extract trending topics from mentions
   */
  private async extractTrendingTopics(mentions: IEntityMention[]): Promise<any[]> {
    if (mentions.length < 5) return [];

    const recentMentions = mentions.slice(0, 20);
    const contexts = recentMentions.map(m => m.context).join('\n');

    const prompt = `Extract key topics and themes from these mentions. Return a JSON array of topics:
[
  {
    "topic": "Topic name",
    "frequency": 1-10,
    "sentiment": -1 to 1,
    "emerging": true/false
  }
]

Mentions:
${contexts}

Return only the JSON array.`;

    try {
      const response = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        temperature: 0.3,
      });

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) return [];

      const topics = JSON.parse(jsonMatch[0]);
      return topics.sort((a: any, b: any) => b.frequency - a.frequency);
    } catch (error) {
      console.error('Failed to extract topics:', error);
      return [];
    }
  }

  /**
   * Update entity master data
   */
  private async updateEntityMasterData(
    entity: IEntity,
    mentions: IEntityMention[],
    insights: IEntityInsight[],
    summary: string
  ): Promise<void> {
    // Update summary
    entity.summary = summary;

    // Update trending topics
    const topics = await this.extractTrendingTopics(mentions);
    entity.trendingTopics = topics.slice(0, 5).map(t => t.topic);

    // Calculate average sentiment
    const sentiments = mentions
      .filter(m => m.sentiment !== undefined && m.sentiment !== null)
      .map(m => m.sentiment as number);

    if (sentiments.length > 0) {
      entity.sentimentScore = sentiments.reduce((sum, s) => sum + s, 0) / sentiments.length;
    }

    // Generate master markdown document
    entity.masterMarkdown = await this.generateMasterMarkdown(entity, mentions, insights);

    await entity.save();
  }

  /**
   * Generate master markdown document for an entity
   */
  private async generateMasterMarkdown(
    entity: IEntity,
    mentions: IEntityMention[],
    insights: IEntityInsight[]
  ): Promise<string> {
    const sections = [];

    // Header
    sections.push(`# ${entity.name}`);
    if (entity.ticker) sections.push(`**Ticker:** ${entity.ticker}`);
    sections.push(`**Type:** ${entity.type}`);
    if (entity.sector) sections.push(`**Sector:** ${entity.sector}`);
    sections.push('');

    // Summary
    sections.push('## Summary');
    sections.push(entity.summary || 'No summary available.');
    sections.push('');

    // Key Metrics
    if (entity.marketCap || entity.revenue) {
      sections.push('## Key Metrics');
      if (entity.marketCap) sections.push(`- **Market Cap:** $${this.formatNumber(entity.marketCap)}`);
      if (entity.revenue) sections.push(`- **Revenue:** $${this.formatNumber(entity.revenue)}`);
      if (entity.peRatio) sections.push(`- **P/E Ratio:** ${entity.peRatio.toFixed(2)}`);
      sections.push('');
    }

    // Sentiment Analysis
    sections.push('## Sentiment Analysis');
    if (entity.sentimentScore !== undefined) {
      const sentiment = entity.sentimentScore > 0.3 ? 'Positive' :
                       entity.sentimentScore < -0.3 ? 'Negative' : 'Neutral';
      sections.push(`**Current Sentiment:** ${sentiment} (${entity.sentimentScore.toFixed(2)})`);
    }
    sections.push(`**Total Mentions:** ${entity.mentionCount}`);
    sections.push('');

    // Recent Insights
    if (insights.length > 0) {
      sections.push('## Recent Insights');
      insights.slice(0, 5).forEach(insight => {
        sections.push(`### ${insight.title}`);
        sections.push(insight.content);
        sections.push('');
      });
    }

    // Recent Mentions
    if (mentions.length > 0) {
      sections.push('## Recent Mentions');
      mentions.slice(0, 10).forEach(mention => {
        sections.push(`- ${mention.context}`);
      });
      sections.push('');
    }

    // Trending Topics
    if (entity.trendingTopics && entity.trendingTopics.length > 0) {
      sections.push('## Trending Topics');
      entity.trendingTopics.forEach(topic => {
        sections.push(`- ${topic}`);
      });
    }

    return sections.join('\n');
  }

  /**
   * Format large numbers
   */
  private formatNumber(num: number): string {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toString();
  }

  /**
   * Generate insights for an entity
   */
  async generateInsights(entityId: string, force = false): Promise<IEntityInsight[]> {
    await connectToDatabase();

    const entity = await Entity.findById(entityId);
    if (!entity) return [];

    // Check if we should generate insights
    if (!force && entity.mentionCount < 5) {
      return [];
    }

    const mentions = await EntityMention.findByEntity(entityId, 20);
    const insights: IEntityInsight[] = [];

    // Generate summary insight
    if (mentions.length >= 3) {
      const summaryInsight = await this.generateSummaryInsight(entity, mentions);
      if (summaryInsight) insights.push(summaryInsight);
    }

    // Generate trend insight
    const trendInsight = await this.generateTrendInsight(entity, mentions);
    if (trendInsight) insights.push(trendInsight);

    // Generate risk/opportunity insights
    const riskOpportunityInsights = await this.generateRiskOpportunityInsights(entity, mentions);
    insights.push(...riskOpportunityInsights);

    return insights;
  }

  /**
   * Generate a summary insight
   */
  private async generateSummaryInsight(
    entity: IEntity,
    mentions: IEntityMention[]
  ): Promise<IEntityInsight | null> {
    const contexts = mentions.map(m => m.context).join('\n');

    const prompt = `Generate a concise insight summary about ${entity.name} based on these mentions:

${contexts}

Provide a title and content for the insight. Format as JSON:
{
  "title": "Brief title",
  "content": "2-3 sentence insight"
}`;

    try {
      const response = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        temperature: 0.5,
      });

      const data = JSON.parse(response);

      const insight = new EntityInsight({
        entityId: entity._id,
        type: 'SUMMARY',
        title: data.title || 'Summary',
        content: data.content,
        sourceMentionIds: mentions.map(m => m._id),
        confidence: 0.8,
        priority: 'medium',
        model: 'claude-3-haiku',
      });

      await insight.save();
      return insight;
    } catch (error) {
      console.error('Failed to generate summary insight:', error);
      return null;
    }
  }

  /**
   * Generate a trend insight
   */
  private async generateTrendInsight(
    entity: IEntity,
    mentions: IEntityMention[]
  ): Promise<IEntityInsight | null> {
    const sentimentData = await EntityMention.getEntitySentiment(entity._id.toString(), 30);
    if (!sentimentData || sentimentData.mentionCount < 5) return null;

    const trendDirection = sentimentData.averageSentiment > 0 ? 'positive' : 'negative';
    const trendStrength = Math.abs(sentimentData.averageSentiment) > 0.5 ? 'strong' : 'moderate';

    const insight = new EntityInsight({
      entityId: entity._id,
      type: 'TREND',
      title: `${trendStrength.charAt(0).toUpperCase() + trendStrength.slice(1)} ${trendDirection} trend`,
      content: `${entity.name} shows a ${trendStrength} ${trendDirection} sentiment trend with an average score of ${sentimentData.averageSentiment.toFixed(2)} across ${sentimentData.mentionCount} recent mentions.`,
      confidence: 0.7,
      priority: Math.abs(sentimentData.averageSentiment) > 0.5 ? 'high' : 'medium',
      model: 'system',
    });

    await insight.save();
    return insight;
  }

  /**
   * Generate risk and opportunity insights
   */
  private async generateRiskOpportunityInsights(
    entity: IEntity,
    mentions: IEntityMention[]
  ): Promise<IEntityInsight[]> {
    const negativeMentions = mentions.filter(m => m.sentiment && m.sentiment < -0.3);
    const positiveMentions = mentions.filter(m => m.sentiment && m.sentiment > 0.3);
    const insights: IEntityInsight[] = [];

    // Generate risk insight if negative mentions
    if (negativeMentions.length >= 2) {
      const riskContexts = negativeMentions.map(m => m.context).join('\n');
      const riskInsight = await this.generateSpecificInsight(
        entity,
        'RISK',
        riskContexts,
        negativeMentions.map(m => m._id)
      );
      if (riskInsight) insights.push(riskInsight);
    }

    // Generate opportunity insight if positive mentions
    if (positiveMentions.length >= 2) {
      const opportunityContexts = positiveMentions.map(m => m.context).join('\n');
      const opportunityInsight = await this.generateSpecificInsight(
        entity,
        'OPPORTUNITY',
        opportunityContexts,
        positiveMentions.map(m => m._id)
      );
      if (opportunityInsight) insights.push(opportunityInsight);
    }

    return insights;
  }

  /**
   * Generate a specific type of insight
   */
  private async generateSpecificInsight(
    entity: IEntity,
    type: 'RISK' | 'OPPORTUNITY',
    contexts: string,
    mentionIds: any[]
  ): Promise<IEntityInsight | null> {
    const prompt = `Identify the main ${type.toLowerCase()} for ${entity.name} based on these mentions:

${contexts}

Provide a brief title and explanation. Format as JSON:
{
  "title": "Brief ${type.toLowerCase()} title",
  "content": "2-3 sentence explanation"
}`;

    try {
      const response = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        temperature: 0.5,
      });

      const data = JSON.parse(response);

      const insight = new EntityInsight({
        entityId: entity._id,
        type,
        title: data.title,
        content: data.content,
        sourceMentionIds: mentionIds,
        confidence: 0.7,
        priority: type === 'RISK' ? 'high' : 'medium',
        model: 'claude-3-haiku',
      });

      await insight.save();
      return insight;
    } catch (error) {
      console.error(`Failed to generate ${type} insight:`, error);
      return null;
    }
  }
}

// Export singleton instance
export const entityAggregationService = EntityAggregationService.getInstance();