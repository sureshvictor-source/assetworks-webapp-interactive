import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IEntityMention extends Document {
  entityId: Types.ObjectId;
  reportId?: Types.ObjectId;
  messageId?: Types.ObjectId;
  threadId?: Types.ObjectId;

  // Context
  context: string;
  fullContext?: string;
  position?: {
    start: number;
    end: number;
  };

  // Analysis
  sentiment?: number;
  relevance?: number;
  confidence?: number;

  // Categorization
  mentionType?: 'primary' | 'secondary' | 'reference';
  sectionType?: 'summary' | 'analysis' | 'financials' | 'risks' | 'opportunities' | 'other';

  // Extracted data
  extractedData?: {
    metrics?: Record<string, any>;
    relationships?: string[];
    events?: string[];
    quotes?: string[];
  };

  // Metadata
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const entityMentionSchema = new Schema<IEntityMention>(
  {
    entityId: {
      type: Schema.Types.ObjectId,
      ref: 'Entity',
      required: true,
      index: true,
    },
    reportId: {
      type: Schema.Types.ObjectId,
      // ref: 'Report', // Commented - Report model not implemented yet
      sparse: true,
      index: true,
    },
    messageId: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      sparse: true,
    },
    threadId: {
      type: Schema.Types.ObjectId,
      ref: 'Thread',
      sparse: true,
      index: true,
    },

    // Context
    context: {
      type: String,
      required: true,
    },
    fullContext: String,
    position: {
      start: Number,
      end: Number,
    },

    // Analysis
    sentiment: {
      type: Number,
      min: -1,
      max: 1,
      index: true,
    },
    relevance: {
      type: Number,
      min: 0,
      max: 1,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },

    // Categorization
    mentionType: {
      type: String,
      enum: ['primary', 'secondary', 'reference'],
      default: 'reference',
    },
    sectionType: {
      type: String,
      enum: ['summary', 'analysis', 'financials', 'risks', 'opportunities', 'other'],
      default: 'other',
    },

    // Extracted data
    extractedData: {
      metrics: Schema.Types.Mixed,
      relationships: [String],
      events: [String],
      quotes: [String],
    },

    // Metadata
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: 'entity_mentions',
  }
);

// Compound indexes for common queries
entityMentionSchema.index({ entityId: 1, createdAt: -1 });
entityMentionSchema.index({ entityId: 1, reportId: 1 }, { unique: true, sparse: true });
entityMentionSchema.index({ reportId: 1, sentiment: 1 });
entityMentionSchema.index({ threadId: 1, entityId: 1 });

// Virtual population
entityMentionSchema.virtual('entity', {
  ref: 'Entity',
  localField: 'entityId',
  foreignField: '_id',
  justOne: true,
});

// Commented out - Report model not implemented yet
// entityMentionSchema.virtual('report', {
//   ref: 'Report',
//   localField: 'reportId',
//   foreignField: '_id',
//   justOne: true,
// });

// Static methods
entityMentionSchema.statics.findByEntity = function(entityId: string, limit = 50) {
  return this.find({ entityId })
    .sort({ createdAt: -1 })
    .limit(limit);
    // .populate('report', 'title createdAt'); // Commented - Report model not implemented yet
};

entityMentionSchema.statics.findByReport = function(reportId: string) {
  return this.find({ reportId })
    .populate('entity', 'name type ticker logo');
};

entityMentionSchema.statics.getEntitySentiment = async function(entityId: string, days = 30) {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);

  const mentions = await this.find({
    entityId,
    sentiment: { $exists: true },
    createdAt: { $gte: dateLimit },
  }).select('sentiment createdAt');

  if (mentions.length === 0) return null;

  const avgSentiment = mentions.reduce((sum, m) => sum + (m.sentiment || 0), 0) / mentions.length;

  return {
    averageSentiment: avgSentiment,
    mentionCount: mentions.length,
    trend: mentions.map(m => ({
      date: m.createdAt,
      sentiment: m.sentiment,
    })),
  };
};

entityMentionSchema.statics.getRelatedEntities = async function(entityId: string, limit = 10) {
  // Find all reports that mention this entity
  const mentions = await this.find({ entityId }).select('reportId');
  const reportIds = mentions.map(m => m.reportId).filter(Boolean);

  if (reportIds.length === 0) return [];

  // Find other entities mentioned in the same reports
  const relatedMentions = await this.aggregate([
    {
      $match: {
        reportId: { $in: reportIds },
        entityId: { $ne: new mongoose.Types.ObjectId(entityId) },
      },
    },
    {
      $group: {
        _id: '$entityId',
        count: { $sum: 1 },
        avgSentiment: { $avg: '$sentiment' },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'entities',
        localField: '_id',
        foreignField: '_id',
        as: 'entity',
      },
    },
    {
      $unwind: '$entity',
    },
    {
      $project: {
        entity: 1,
        coMentionCount: '$count',
        avgSentiment: 1,
      },
    },
  ]);

  return relatedMentions;
};

// Instance methods
entityMentionSchema.methods.analyzeSentiment = async function() {
  // This would call an AI service to analyze sentiment
  // For now, returning a placeholder
  this.sentiment = 0;
  return this.sentiment;
};

const EntityMention = (mongoose.models.EntityMention as Model<IEntityMention>) ||
  mongoose.model<IEntityMention>('EntityMention', entityMentionSchema);

export default EntityMention;