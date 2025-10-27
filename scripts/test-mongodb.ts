// Test MongoDB connection and models
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { connectToDatabase } from '../lib/db/mongodb';
import User from '../lib/db/models/User';
import Thread from '../lib/db/models/Thread';
import Report from '../lib/db/models/Report';

async function testMongoDB() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//<credentials>@'));

    const connection = await connectToDatabase();

    if (!connection) {
      console.log('⚠️  MongoDB connection returned null - using PostgreSQL fallback');
      return;
    }

    console.log('✅ Connected to MongoDB successfully!');

    // Test User model
    const userCount = await User.countDocuments();
    console.log(`📊 Users in database: ${userCount}`);

    // Test Thread model
    const threadCount = await Thread.countDocuments();
    console.log(`📊 Threads in database: ${threadCount}`);

    // Test Report model
    const reportCount = await Report.countDocuments();
    console.log(`📊 Reports in database: ${reportCount}`);

    console.log('\n✅ All MongoDB models are working correctly!');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ MongoDB test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testMongoDB();