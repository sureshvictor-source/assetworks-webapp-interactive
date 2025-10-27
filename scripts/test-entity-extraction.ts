#!/usr/bin/env tsx
/**
 * Test Entity Extraction System
 */

// IMPORTANT: Load environment variables BEFORE any other imports
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Now import everything else
import { Types } from 'mongoose';
import { connectToDatabase } from '../lib/db/mongodb';
import Entity from '../lib/db/models/Entity';
import EntityMention from '../lib/db/models/EntityMention';
import EntityInsight from '../lib/db/models/EntityInsight';
import { entityExtractionService } from '../lib/services/entity-extraction.service';
import { entityAggregationService } from '../lib/services/entity-aggregation.service';

// Sample financial text for testing
const sampleReports = [
  {
    id: new Types.ObjectId().toString(),
    title: 'Tech Giants Q3 2024 Earnings Analysis',
    content: `
      Apple Inc. (AAPL) reported strong Q3 earnings with revenue of $90.8 billion,
      beating analyst expectations. CEO Tim Cook highlighted the success of the iPhone 15
      and growing services revenue. Microsoft (MSFT) also posted impressive results with
      Azure cloud growth of 29%. Google parent Alphabet (GOOGL) saw advertising revenue
      rebound, while Amazon (AMZN) continues to dominate e-commerce and cloud computing
      through AWS. Tesla (TSLA) delivered 435,000 vehicles in Q3, slightly below expectations.

      The technology sector shows resilience despite economic headwinds. NVIDIA (NVDA)
      continues to benefit from AI boom with data center revenue surging 171% year-over-year.
      Meta Platforms (META) invested heavily in the metaverse while maintaining strong
      advertising margins.
    `,
  },
  {
    id: new Types.ObjectId().toString(),
    title: 'Cryptocurrency Market Update',
    content: `
      Bitcoin (BTC) surged past $45,000 following ETF approval speculation. Ethereum (ETH)
      continues to show strength after the successful Merge to proof-of-stake. Solana (SOL)
      recovered from FTX collapse concerns, while Binance Coin (BNB) faces regulatory scrutiny.

      Institutional adoption accelerates with MicroStrategy adding more Bitcoin to its
      treasury. PayPal expanded crypto services to more regions. The DeFi sector shows
      mixed performance with Uniswap and Aave leading protocol revenues.
    `,
  },
];

async function testEntityExtraction() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectToDatabase();
    console.log('✅ Connected successfully\n');

    // Ensure indexes are created
    console.log('📋 Creating MongoDB indexes...');
    try {
      await Entity.collection.createIndex(
        { name: 'text', ticker: 'text', description: 'text' },
        { name: 'entity_text_index' }
      );
      console.log('✅ Text index created successfully\n');
    } catch (err: any) {
      if (err.code === 11000 || err.codeName === 'IndexOptionsConflict') {
        console.log('ℹ️  Text index already exists\n');
      } else {
        throw err;
      }
    }

    // Clean up test data from previous runs
    console.log('🧹 Cleaning up previous test data...');
    await Entity.deleteMany({ name: /^TEST_/ });
    // Since reportId is an ObjectId, we'll clean up all test mentions differently
    const testEntities = await Entity.find({
      $or: [
        { name: /Apple|Microsoft|Google|Amazon|Tesla|NVIDIA|Meta|Bitcoin|Ethereum/i }
      ]
    });
    if (testEntities.length > 0) {
      await EntityMention.deleteMany({
        entityId: { $in: testEntities.map(e => e._id) }
      });
    }
    console.log('✅ Cleanup complete\n');

    // Test entity extraction for each sample report
    for (const report of sampleReports) {
      console.log(`\n📄 Processing Report: "${report.title}"`);
      console.log('=' .repeat(60));

      // Extract entities
      console.log('\n🔍 Extracting entities...');
      const result = await entityExtractionService.extractFromReport(
        report.id,
        report.content,
        report.title,
        'test-user-123'
      );

      console.log(`✅ Extracted ${result.entities.length} entities`);
      console.log(`✅ Created ${result.mentions.length} mentions`);

      if (result.errors.length > 0) {
        console.log(`⚠️  Errors: ${result.errors.join(', ')}`);
      }

      // Display extracted entities
      console.log('\n📊 Entities found:');
      for (const entity of result.entities) {
        console.log(`  - ${entity.name} (${entity.type})${entity.ticker ? ` [${entity.ticker}]` : ''}`);
        console.log(`    Mentions: ${entity.mentionCount}, Sentiment: ${entity.sentimentScore?.toFixed(2) || 'N/A'}`);
      }
    }

    // Test aggregation for a specific entity
    console.log('\n\n📈 Testing Entity Aggregation...');
    console.log('=' .repeat(60));

    const apple = await Entity.findOne({ ticker: 'AAPL' });
    if (apple) {
      console.log(`\n🍎 Aggregating data for ${apple.name}...`);

      const aggregatedData = await entityAggregationService.aggregateEntityData(
        apple._id.toString()
      );

      if (aggregatedData) {
        console.log('\n📋 Aggregation Results:');
        console.log(`  Summary: ${aggregatedData.summary.substring(0, 200)}...`);
        console.log(`  Mentions: ${aggregatedData.mentions.length}`);
        console.log(`  Insights: ${aggregatedData.insights.length}`);
        console.log(`  Related Entities: ${aggregatedData.relatedEntities.length}`);

        if (aggregatedData.trends.length > 0) {
          console.log('\n  Trends:');
          for (const trend of aggregatedData.trends) {
            console.log(`    - ${trend.type}: Current=${trend.current}, Change=${trend.change}`);
          }
        }

        // Generate insights
        console.log('\n💡 Generating insights...');
        const insights = await entityAggregationService.generateInsights(
          apple._id.toString(),
          true // Force generation
        );
        console.log(`  Generated ${insights.length} insights`);

        for (const insight of insights) {
          console.log(`    - [${insight.type}] ${insight.title}`);
        }
      }
    }

    // Test search functionality
    console.log('\n\n🔎 Testing Entity Search...');
    console.log('=' .repeat(60));

    const searchResults = await Entity.searchEntities('Apple', 5);
    console.log(`\nSearch results for "Apple": ${searchResults.length} entities found`);
    for (const entity of searchResults) {
      console.log(`  - ${entity.name} (${entity.type})`);
    }

    // Get top entities
    console.log('\n\n🏆 Top Entities by Mention Count:');
    console.log('=' .repeat(60));

    const topEntities = await Entity.getTopEntities(undefined, 10);
    for (const entity of topEntities) {
      console.log(`  ${entity.name.padEnd(20)} - ${entity.mentionCount} mentions`);
    }

    // Summary statistics
    console.log('\n\n📊 Summary Statistics:');
    console.log('=' .repeat(60));

    const totalEntities = await Entity.countDocuments();
    const totalMentions = await EntityMention.countDocuments();
    const totalInsights = await EntityInsight.countDocuments();

    console.log(`  Total Entities: ${totalEntities}`);
    console.log(`  Total Mentions: ${totalMentions}`);
    console.log(`  Total Insights: ${totalInsights}`);

    const byType = await Entity.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log('\n  Entities by Type:');
    for (const type of byType) {
      console.log(`    ${type._id}: ${type.count}`);
    }

    console.log('\n\n✅ Entity extraction system test completed successfully!');

  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }

  process.exit(0);
}

// Run the test
testEntityExtraction();