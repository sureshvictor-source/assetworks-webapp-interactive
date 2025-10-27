#!/usr/bin/env tsx
/**
 * Create MongoDB Indexes for Performance Optimization
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { connectToDatabase } from '../lib/db/mongodb';
import User from '../lib/db/models/User';
import Thread from '../lib/db/models/Thread';
import Message from '../lib/db/models/Message';
import Report from '../lib/db/models/Report';
import Query from '../lib/db/models/Query';
import Widget from '../lib/db/models/Widget';
import PlaygroundReport from '../lib/db/models/PlaygroundReport';
import Template from '../lib/db/models/Template';

async function createIndexes() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectToDatabase();
    console.log('✅ Connected successfully\n');

    console.log('📊 Creating indexes for optimal performance...\n');

    // Helper function to safely create indexes
    async function safeCreateIndex(collection: any, index: any, options: any = {}) {
      try {
        await collection.createIndex(index, options);
        return true;
      } catch (error: any) {
        if (error.code === 85 || error.code === 86) {
          // Index already exists (85) or exists with different options (86)
          console.log(`   ⚠️  Index already exists: ${JSON.stringify(index)}`);
          return false;
        }
        throw error;
      }
    }

    // User indexes
    console.log('👤 User indexes...');
    await safeCreateIndex(User.collection, { email: 1 }, { unique: true });
    await safeCreateIndex(User.collection, { googleId: 1 }, { sparse: true });
    await safeCreateIndex(User.collection, { createdAt: -1 });
    await safeCreateIndex(User.collection, { plan: 1 });
    console.log('   ✓ Email (unique), GoogleId, CreatedAt, Plan\n');

    // Thread indexes
    console.log('🧵 Thread indexes...');
    await safeCreateIndex(Thread.collection, { userId: 1, status: 1, updatedAt: -1 });
    await safeCreateIndex(Thread.collection, { isTemplate: 1 });
    await safeCreateIndex(Thread.collection, { userId: 1, isTemplate: 1 });
    console.log('   ✓ User+Status+UpdatedAt, IsTemplate, User+IsTemplate\n');

    // Message indexes
    console.log('💬 Message indexes...');
    await safeCreateIndex(Message.collection, { threadId: 1, createdAt: 1 });
    await safeCreateIndex(Message.collection, { userId: 1 });
    await safeCreateIndex(Message.collection, { reportId: 1 }, { sparse: true });
    console.log('   ✓ Thread+CreatedAt, UserId, ReportId\n');

    // Report indexes
    console.log('📄 Report indexes...');
    await safeCreateIndex(Report.collection, { userId: 1, createdAt: -1 });
    await safeCreateIndex(Report.collection, { threadId: 1 }, { sparse: true });
    await safeCreateIndex(Report.collection, { status: 1 });
    console.log('   ✓ User+CreatedAt, ThreadId, Status\n');

    // Query indexes (for AI usage tracking)
    console.log('🤖 Query indexes...');
    await safeCreateIndex(Query.collection, { userId: 1, createdAt: -1 });
    await safeCreateIndex(Query.collection, { provider: 1 });
    console.log('   ✓ User+CreatedAt, Provider\n');

    // Widget indexes
    console.log('📊 Widget indexes...');
    await safeCreateIndex(Widget.collection, { userId: 1, createdAt: -1 });
    await safeCreateIndex(Widget.collection, { userId: 1, isVisible: 1 });
    console.log('   ✓ User+CreatedAt, User+IsVisible\n');

    // PlaygroundReport indexes
    console.log('🎮 PlaygroundReport indexes...');
    await safeCreateIndex(PlaygroundReport.collection, { threadId: 1, version: -1 });
    await safeCreateIndex(PlaygroundReport.collection, { threadId: 1, createdAt: -1 });
    await safeCreateIndex(PlaygroundReport.collection, { parentReportId: 1 }, { sparse: true });
    await safeCreateIndex(PlaygroundReport.collection, { shareId: 1 }, { sparse: true, unique: true });
    console.log('   ✓ Thread+Version, Thread+CreatedAt, ParentReportId, ShareId\n');

    // Template indexes
    console.log('📝 Template indexes...');
    await safeCreateIndex(Template.collection, { userId: 1, createdAt: -1 });
    await safeCreateIndex(Template.collection, { isPublic: 1, category: 1 });
    await safeCreateIndex(Template.collection, { isPublic: 1, usageCount: -1 });
    await safeCreateIndex(Template.collection, { tags: 1 });
    await safeCreateIndex(Template.collection, { isPublic: 1, tier: 1, rating: -1 });
    console.log('   ✓ User+CreatedAt, Public+Category, Public+Usage, Tags, Public+Tier+Rating\n');

    // Get all indexes for verification
    console.log('✅ All indexes created successfully!\n');
    console.log('📋 Summary of indexes created:');

    const collections = [
      { name: 'Users', model: User },
      { name: 'Threads', model: Thread },
      { name: 'Messages', model: Message },
      { name: 'Reports', model: Report },
      { name: 'Queries', model: Query },
      { name: 'Widgets', model: Widget },
      { name: 'PlaygroundReports', model: PlaygroundReport },
      { name: 'Templates', model: Template },
    ];

    for (const { name, model } of collections) {
      const indexes = await model.collection.indexes();
      console.log(`\n${name}: ${indexes.length} indexes`);
      indexes.forEach(index => {
        if (index.name !== '_id_') {
          console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
        }
      });
    }

    console.log('\n🎉 MongoDB performance optimization complete!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating indexes:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createIndexes();