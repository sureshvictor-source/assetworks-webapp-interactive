import mongoose, { Document, Model, Schema } from 'mongoose';

export type EntityType =
  | 'COMPANY'
  | 'STOCK'
  | 'PERSON'
  | 'PRODUCT'
  | 'SECTOR'
  | 'CRYPTOCURRENCY'
  | 'COMMODITY'
  | 'INDEX'
  | 'ETF'
  | 'MUTUAL_FUND'
  | 'COUNTRY'
  | 'CURRENCY';

export interface IEntity extends Document {
  name: string;
  slug: string;
  type: EntityType;

  // Identifiers
  ticker?: string;
  isin?: string;
  cik?: string;
  lei?: string;

  // Basic info
  description?: string;
  logo?: string;
  website?: string;

  // Company-specific
  industry?: string;
  sector?: string;
  headquarters?: string;
  founded?: number;
  employees?: number;

  // Financial metrics (latest)
  marketCap?: number;
  revenue?: number;
  profit?: number;
  peRatio?: number;

  // Aggregated data
  masterMarkdown?: string;
  summary?: string;
  trendingTopics?: string[];

  // Statistics
  mentionCount: number;
  sentimentScore?: number;
  lastMentioned?: Date;
  firstMentioned?: Date;

  // Metadata
  metadata?: Record<string, any>;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const entitySchema = new Schema<IEntity>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'COMPANY', 'STOCK', 'PERSON', 'PRODUCT', 'SECTOR',
        'CRYPTOCURRENCY', 'COMMODITY', 'INDEX', 'ETF',
        'MUTUAL_FUND', 'COUNTRY', 'CURRENCY'
      ],
      index: true,
    },

    // Identifiers
    ticker: { type: String, sparse: true, index: true },
    isin: { type: String, sparse: true },
    cik: { type: String, sparse: true },
    lei: { type: String, sparse: true },

    // Basic info
    description: String,
    logo: String,
    website: String,

    // Company-specific
    industry: String,
    sector: { type: String, index: true },
    headquarters: String,
    founded: Number,
    employees: Number,

    // Financial metrics
    marketCap: Number,
    revenue: Number,
    profit: Number,
    peRatio: Number,

    // Aggregated data
    masterMarkdown: String,
    summary: String,
    trendingTopics: [String],

    // Statistics
    mentionCount: {
      type: Number,
      default: 0,
      index: true,
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1,
    },
    lastMentioned: Date,
    firstMentioned: Date,

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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'entities',
  }
);

// Indexes for performance
entitySchema.index({ type: 1, mentionCount: -1 });
entitySchema.index({ sector: 1, marketCap: -1 });
entitySchema.index({ tags: 1 });
entitySchema.index({ '$**': 'text' }); // Text search on all string fields

// Static methods
entitySchema.statics.findBySlug = function(slug: string) {
  return this.findOne({ slug });
};

entitySchema.statics.findByTicker = function(ticker: string) {
  return this.findOne({ ticker: ticker.toUpperCase() });
};

entitySchema.statics.searchEntities = function(query: string, limit = 10) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit);
};

entitySchema.statics.getTopEntities = function(type?: EntityType, limit = 10) {
  const query = type ? { type } : {};
  return this.find(query)
    .sort({ mentionCount: -1 })
    .limit(limit);
};

// Instance methods
entitySchema.methods.generateSlug = function() {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (this.ticker) {
    this.slug = `${this.slug}-${this.ticker.toLowerCase()}`;
  }

  return this.slug;
};

entitySchema.methods.updateMentionStats = async function(sentiment?: number) {
  this.mentionCount += 1;
  this.lastMentioned = new Date();

  if (!this.firstMentioned) {
    this.firstMentioned = new Date();
  }

  // Update rolling sentiment average
  if (sentiment !== undefined && sentiment !== null) {
    if (this.sentimentScore === undefined) {
      this.sentimentScore = sentiment;
    } else {
      // Weighted average: give more weight to recent mentions
      this.sentimentScore = (this.sentimentScore * 0.7) + (sentiment * 0.3);
    }
  }

  return this.save();
};

// Pre-save middleware
entitySchema.pre('save', function(next) {
  if (!this.slug) {
    this.generateSlug();
  }
  next();
});

const Entity = (mongoose.models.Entity as Model<IEntity>) ||
  mongoose.model<IEntity>('Entity', entitySchema);

export default Entity;