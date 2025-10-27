import Entity, { IEntity, EntityType } from '@/lib/db/models/Entity';
import EntityMention, { IEntityMention } from '@/lib/db/models/EntityMention';
import { connectToDatabase } from '@/lib/db/mongodb';
import { generateAIResponse } from '@/lib/ai/ai-service';

interface ExtractedEntity {
  name: string;
  type: EntityType;
  ticker?: string;
  context: string;
  sentiment?: number;
  relevance?: number;
  position?: {
    start: number;
    end: number;
  };
  metadata?: Record<string, any>;
}

interface ExtractionResult {
  entities: IEntity[];
  mentions: IEntityMention[];
  errors: string[];
}

export class EntityExtractionService {
  private static instance: EntityExtractionService;

  private constructor() {}

  public static getInstance(): EntityExtractionService {
    if (!EntityExtractionService.instance) {
      EntityExtractionService.instance = new EntityExtractionService();
    }
    return EntityExtractionService.instance;
  }

  /**
   * Extract entities from a report
   */
  async extractFromReport(
    reportId: string,
    reportContent: string,
    reportTitle?: string,
    userId?: string
  ): Promise<ExtractionResult> {
    await connectToDatabase();

    const errors: string[] = [];
    const createdEntities: IEntity[] = [];
    const createdMentions: IEntityMention[] = [];

    try {
      // Use AI to extract entities
      const extractedData = await this.extractEntitiesWithAI(reportContent, reportTitle);

      // Process each extracted entity
      for (const extracted of extractedData) {
        try {
          // Find or create the entity
          const entity = await this.findOrCreateEntity(extracted);
          createdEntities.push(entity);

          // Create the mention
          const mention = await this.createMention(
            entity._id,
            reportId,
            extracted,
            'report'
          );
          createdMentions.push(mention);

          // Update entity statistics
          await entity.updateMentionStats(extracted.sentiment);
        } catch (error) {
          console.error(`Error processing entity ${extracted.name}:`, error);
          errors.push(`Failed to process ${extracted.name}: ${error}`);
        }
      }

      // Generate insights if we have enough mentions
      await this.generateInsightsIfNeeded(createdEntities);

    } catch (error) {
      console.error('Entity extraction failed:', error);
      errors.push(`Extraction failed: ${error}`);
    }

    return {
      entities: createdEntities,
      mentions: createdMentions,
      errors,
    };
  }

  /**
   * Extract entities from a message
   */
  async extractFromMessage(
    messageId: string,
    messageContent: string,
    threadId?: string
  ): Promise<ExtractionResult> {
    await connectToDatabase();

    const errors: string[] = [];
    const createdEntities: IEntity[] = [];
    const createdMentions: IEntityMention[] = [];

    try {
      // Simpler extraction for messages
      const extractedData = await this.extractEntitiesSimple(messageContent);

      for (const extracted of extractedData) {
        try {
          const entity = await this.findOrCreateEntity(extracted);
          createdEntities.push(entity);

          const mention = await this.createMention(
            entity._id,
            undefined,
            extracted,
            'message',
            messageId,
            threadId
          );
          createdMentions.push(mention);

          await entity.updateMentionStats(extracted.sentiment);
        } catch (error) {
          errors.push(`Failed to process ${extracted.name}: ${error}`);
        }
      }
    } catch (error) {
      errors.push(`Extraction failed: ${error}`);
    }

    return {
      entities: createdEntities,
      mentions: createdMentions,
      errors,
    };
  }

  /**
   * Use AI to extract entities from text
   */
  private async extractEntitiesWithAI(
    content: string,
    title?: string
  ): Promise<ExtractedEntity[]> {
    const prompt = `Extract entities from the following financial text.

Return a JSON array of entities with the following structure:
{
  "name": "Entity Name",
  "type": "COMPANY|PERSON|STOCK|CRYPTOCURRENCY|SECTOR|PRODUCT|COUNTRY|CURRENCY",
  "ticker": "TICKER (if applicable)",
  "context": "The sentence or phrase mentioning the entity",
  "sentiment": -1 to 1 (negative to positive),
  "relevance": 0 to 1 (how important is this entity to the text)
}

Title: ${title || 'N/A'}

Content:
${content.substring(0, 4000)}

Extract all important entities. Return only valid JSON array.`;

    try {
      const response = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        temperature: 0.3,
      });

      // Parse the AI response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }

      const entities = JSON.parse(jsonMatch[0]);
      return entities.filter((e: any) => e.name && e.type);
    } catch (error) {
      console.error('AI extraction failed:', error);
      // Fallback to simple extraction
      return this.extractEntitiesSimple(content);
    }
  }

  /**
   * Simple regex-based entity extraction (fallback)
   */
  private extractEntitiesSimple(content: string): ExtractedEntity[] {
    const entities: ExtractedEntity[] = [];

    // Extract stock tickers ($AAPL, $BTC, etc.)
    const tickerRegex = /\$([A-Z]{1,5})\b/g;
    let match;
    while ((match = tickerRegex.exec(content)) !== null) {
      entities.push({
        name: match[1],
        type: 'STOCK',
        ticker: match[1],
        context: content.substring(
          Math.max(0, match.index - 50),
          Math.min(content.length, match.index + 50)
        ),
        position: {
          start: match.index,
          end: match.index + match[0].length,
        },
      });
    }

    // Extract company names (basic - would need a dictionary for better results)
    const companyPatterns = [
      /\b([A-Z][a-z]+ (?:Inc|Corp|Corporation|LLC|Ltd|Company|Co\.))\b/g,
      /\b(Apple|Google|Microsoft|Amazon|Tesla|Meta|Netflix|Nvidia)\b/gi,
    ];

    for (const pattern of companyPatterns) {
      while ((match = pattern.exec(content)) !== null) {
        entities.push({
          name: match[1],
          type: 'COMPANY',
          context: content.substring(
            Math.max(0, match.index - 50),
            Math.min(content.length, match.index + 50)
          ),
          position: {
            start: match.index,
            end: match.index + match[0].length,
          },
        });
      }
    }

    // Deduplicate entities
    const uniqueEntities = entities.reduce((acc, entity) => {
      const key = `${entity.name}-${entity.type}`;
      if (!acc.has(key)) {
        acc.set(key, entity);
      }
      return acc;
    }, new Map<string, ExtractedEntity>());

    return Array.from(uniqueEntities.values());
  }

  /**
   * Find or create an entity
   */
  private async findOrCreateEntity(extracted: ExtractedEntity): Promise<IEntity> {
    // Try to find by ticker first
    if (extracted.ticker) {
      const existing = await Entity.findByTicker(extracted.ticker);
      if (existing) return existing;
    }

    // Try to find by name and type
    const slug = this.generateSlug(extracted.name, extracted.ticker);
    let entity = await Entity.findOne({
      $or: [
        { slug },
        { name: new RegExp(`^${extracted.name}$`, 'i'), type: extracted.type },
      ],
    });

    if (!entity) {
      // Create new entity
      entity = new Entity({
        name: extracted.name,
        type: extracted.type,
        ticker: extracted.ticker,
        slug,
        metadata: extracted.metadata || {},
      });

      await entity.save();
    }

    return entity;
  }

  /**
   * Create an entity mention
   */
  private async createMention(
    entityId: string,
    reportId?: string,
    extracted: ExtractedEntity,
    sourceType: 'report' | 'message' = 'report',
    messageId?: string,
    threadId?: string
  ): Promise<IEntityMention> {
    // Check if mention already exists for this report/entity combo
    if (reportId) {
      const existing = await EntityMention.findOne({
        entityId,
        reportId,
      });

      if (existing) {
        // Update existing mention if sentiment is different
        if (extracted.sentiment !== undefined) {
          existing.sentiment = extracted.sentiment;
          await existing.save();
        }
        return existing;
      }
    }

    // Create new mention
    const mention = new EntityMention({
      entityId,
      reportId,
      messageId,
      threadId,
      context: extracted.context,
      sentiment: extracted.sentiment,
      relevance: extracted.relevance,
      position: extracted.position,
      mentionType: extracted.relevance && extracted.relevance > 0.7 ? 'primary' : 'secondary',
      metadata: extracted.metadata || {},
    });

    await mention.save();
    return mention;
  }

  /**
   * Generate slug for entity
   */
  private generateSlug(name: string, ticker?: string): string {
    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (ticker) {
      slug = `${slug}-${ticker.toLowerCase()}`;
    }

    return slug;
  }

  /**
   * Generate insights if we have enough data
   */
  private async generateInsightsIfNeeded(entities: IEntity[]): Promise<void> {
    // This is a placeholder - would implement actual insight generation
    for (const entity of entities) {
      if (entity.mentionCount >= 5 && entity.mentionCount % 5 === 0) {
        // Generate insight every 5 mentions
        console.log(`Should generate insight for ${entity.name}`);
        // Would call insight generation service here
      }
    }
  }

  /**
   * Analyze sentiment for a text about an entity
   */
  async analyzeSentiment(text: string, entityName: string): Promise<number> {
    const prompt = `Analyze the sentiment of the following text about ${entityName}.
Return a number between -1 (very negative) and 1 (very positive).

Text: ${text}

Return only the number.`;

    try {
      const response = await generateAIResponse(prompt, {
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        temperature: 0.1,
      });

      const sentiment = parseFloat(response.trim());
      return isNaN(sentiment) ? 0 : Math.max(-1, Math.min(1, sentiment));
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const entityExtractionService = EntityExtractionService.getInstance();