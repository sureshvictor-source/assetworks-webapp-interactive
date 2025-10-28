#!/usr/bin/env tsx

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { connectToDatabase } from '../lib/db/mongodb';
import Thread from '../lib/db/models/Thread';
import Message from '../lib/db/models/Message';
import PlaygroundReport from '../lib/db/models/PlaygroundReport';
import EntityMention from '../lib/db/models/EntityMention';
import Entity from '../lib/db/models/Entity';

async function checkThreadEntities() {
  try {
    await connectToDatabase();

    const threadId = '68ff6a64cbf6ece5647e143f';
    console.log(`\n🔍 Checking thread: ${threadId}`);

    // Get thread
    const thread = await Thread.findById(threadId);
    if (!thread) {
      console.log('❌ Thread not found');
      process.exit(1);
    }

    console.log(`\n📌 Thread Info:`);
    console.log(`  - Name: ${thread.name}`);
    console.log(`  - User ID: ${thread.userId}`);
    console.log(`  - Current Report ID: ${thread.currentReportId || 'None'}`);

    // Get messages (without population to avoid error)
    const messages = await Message.find({ threadId })
      .sort({ createdAt: 1 });

    console.log(`\n💬 Messages: ${messages.length} total`);

    // Find messages with reportId
    const messagesWithReports = messages.filter(m => m.reportId);
    console.log(`📝 Messages with reports: ${messagesWithReports.length}`);

    for (const message of messagesWithReports) {
      const reportId = message.reportId;
      const report = await PlaygroundReport.findById(reportId);
      console.log(`\n📊 Report ${report._id}:`);
      console.log(`  - Created: ${report.createdAt}`);
      console.log(`  - Has HTML: ${!!report.htmlContent}`);

      // Check for entity mentions
      const mentions = await EntityMention.find({
        reportId: report._id
      }).populate('entityId');

      console.log(`  - Entity mentions: ${mentions.length}`);

      if (mentions.length > 0) {
        console.log(`  - Entities found:`);
        const uniqueEntities = new Map();
        mentions.forEach(m => {
          const entity = m.entityId as any;
          if (entity && !uniqueEntities.has(entity._id.toString())) {
            uniqueEntities.set(entity._id.toString(), entity.name);
          }
        });
        uniqueEntities.forEach((name) => {
          console.log(`    • ${name}`);
        });
      }
    }

    // If current report exists, check it specifically
    if (thread.currentReportId) {
      console.log(`\n🎯 Current Report Analysis:`);
      const currentReport = await PlaygroundReport.findById(thread.currentReportId);

      if (currentReport) {
        const mentions = await EntityMention.find({
          reportId: currentReport._id
        }).populate('entityId');

        console.log(`  - Entity mentions in current report: ${mentions.length}`);

        if (mentions.length === 0) {
          console.log(`  ⚠️ No entities found for current report`);
          console.log(`  - This report may have been generated before entity extraction was implemented`);
          console.log(`  - Generate a new report to see entity chips`);
        }
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error checking thread entities:', error);
    process.exit(1);
  }
}

checkThreadEntities();