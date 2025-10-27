#!/usr/bin/env tsx

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { connectToDatabase } from '../lib/db/mongodb';
import Entity from '../lib/db/models/Entity';
import EntityMention from '../lib/db/models/EntityMention';

async function checkEntities() {
  try {
    await connectToDatabase();

    // Check total entities
    const entityCount = await Entity.countDocuments();
    console.log(`\n📊 Total entities in database: ${entityCount}`);

    // Get sample entities
    const entities = await Entity.find().limit(5);
    if (entities.length > 0) {
      console.log('\n🏢 Sample entities:');
      entities.forEach(entity => {
        console.log(`  - ${entity.name} (${entity.type}) - ${entity.mentionCount} mentions`);
      });
    }

    // Check entity mentions
    const mentionCount = await EntityMention.countDocuments();
    console.log(`\n💬 Total entity mentions: ${mentionCount}`);

    // Check mentions with reportId
    const reportMentions = await EntityMention.countDocuments({ reportId: { $exists: true, $ne: null } });
    console.log(`📝 Mentions linked to reports: ${reportMentions}`);

    // Get sample mentions
    const mentions = await EntityMention.find({ reportId: { $exists: true, $ne: null } })
      .populate('entityId')
      .limit(5);

    if (mentions.length > 0) {
      console.log('\n📌 Sample report mentions:');
      mentions.forEach(mention => {
        const entity = mention.entityId as any;
        console.log(`  - ${entity?.name || 'Unknown'} in report ${mention.reportId}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error checking entities:', error);
    process.exit(1);
  }
}

checkEntities();