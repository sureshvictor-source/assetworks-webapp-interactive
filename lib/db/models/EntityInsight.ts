import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type InsightType =
  | 'TREND'
  | 'COMPARISON'
  | 'PREDICTION'
  | 'SUMMARY'
  | 'RISK'
  | 'OPPORTUNITY'
  | 'METRIC'
  | 'NEWS'
  | 'RELATIONSHIP'
  | 'ALERT';

export interface IEntityInsight extends Document {
  entityId: Types.ObjectId;
  type: InsightType;
  title: string;
  content: string;

  // Source tracking
  sourceReportIds?: Types.ObjectId[];
  sourceMentionIds?: Types.ObjectId[];

  // Analysis metadata
  confidence?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timeframe?: string;
  category?: string;

  // AI generation info
  model?: string;
  prompt?: string;
  generationMetadata?: Record<string, any>;

  // Validity
  validFrom?: Date;
  validUntil?: Date;
  isActive: boolean;

  // User interaction
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;

  // Metadata
  metadata?: Record<string, any>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const entityInsightSchema = new Schema<IEntityInsight>(
  {
    entityId: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'TREND', 'COMPARISON', 'PREDICTION', 'SUMMARY', 'RISK',
        'OPPORTUNITY', 'METRIC', 'NEWS', 'RELATIONSHIP', 'ALERT'
      ],
      index: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },

    // Source tracking
    sourceReportIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Report',
    }],
    sourceMentionIds: [{
      type: Schema.Types.ObjectId,
      ref: 'EntityMention',
    }],

    // Analysis metadata
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
      index: true,
    },
    timeframe: String,
    category: {
      type: String,
      index: true,
    },

    // AI generation info
    model: {
      type: String,
      maxlength: 100,
    },
    prompt: String,
    generationMetadata: Schema.Types.Mixed,

    // Validity
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: Date,
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // User interaction
    viewCount: {
      type: Number,
      default: 0,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    notHelpfulCount: {
      type: Number,
      default: 0,
    },

    // Metadata
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'entity_insights',
  }
);

// Indexes for performance
entityInsightSchema.index({ entityId: 1, createdAt: -1 });
entityInsightSchema.index({ entityId: 1, type: 1, isActive: 1 });
entityInsightSchema.index({ entityId: 1, priority: -1, createdAt: -1 });
entityInsightSchema.index({ validUntil: 1 }, { sparse: true });

// Virtual population
entityInsightSchema.virtual('entity', {
  ref: 'Entity',
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

// Static methods
entityInsightSchema.statics.getActiveInsights = function(entityId: string, type?: InsightType) {
  const query: any = {
    entityId,
    isActive: true,
    $or: [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: new Date() } },
    ],
  };

  if (type) {
    query.type = type;
  }

  return this.find(query)
    .sort({ priority: -1, createdAt: -1 });
};

entityInsightSchema.statics.getLatestInsights = function(entityId: string, limit = 10) {
  return this.find({ entityId, isActive: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

entityInsightSchema.statics.getCriticalInsights = function(entityIds?: string[]) {
  const query: any = {
    priority: { $in: ['high', 'critical'] },
    isActive: true,
  };

  if (entityIds && entityIds.length > 0) {
    query.entityId = { $in: entityIds.map(id => new mongoose.Types.ObjectId(id)) };
  }

  return this.find(query)
    .populate('entity', 'name ticker type')
    .sort({ priority: -1, createdAt: -1 });
};

entityInsightSchema.statics.generateSummaryInsight = async function(
  entityId: string,
  mentions: any[],
  aiService: any
) {
  // Aggregate mention data
  const mentionTexts = mentions.map(m => m.context).join('\n');
  const avgSentiment = mentions.reduce((sum, m) => sum + (m.sentiment || 0), 0) / mentions.length;

  // Generate summary using AI
  const prompt = `Summarize the following mentions of an entity:\n\n${mentionTexts}\n\nProvide a concise summary.`;

  // This would call your AI service
  const summary = await aiService.generateText(prompt);

  // Create and save the insight
  const insight = new this({
    entityId,
    type: 'SUMMARY',
    title: 'Recent Activity Summary',
    content: summary,
    sourceMentionIds: mentions.map(m => m._id),
    confidence: 0.8,
    priority: avgSentiment < -0.3 ? 'high' : 'medium',
    model: 'claude-3',
  });

  return insight.save();
};

// Instance methods
entityInsightSchema.methods.markAsViewed = function() {
  this.viewCount += 1;
  return this.save();
};

entityInsightSchema.methods.markAsHelpful = function(helpful = true) {
  if (helpful) {
    this.helpfulCount += 1;
  } else {
    this.notHelpfulCount += 1;
  }
  return this.save();
};

entityInsightSchema.methods.deactivate = function() {
  this.isActive = false;
  this.validUntil = new Date();
  return this.save();
};

// Middleware to check validity
entityInsightSchema.pre('find', function() {
  // Automatically filter out expired insights
  this.where({
    $or: [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: new Date() } },
    ],
  });
});

const EntityInsight = (mongoose.models.EntityInsight as Model<IEntityInsight>) ||
  mongoose.model<IEntityInsight>('EntityInsight', entityInsightSchema);

export default EntityInsight;