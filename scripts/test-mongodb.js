// Test MongoDB connection and models
require('dotenv').config({ path: '.env.local' });

async function testMongoDB() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//<credentials>@'));

    const { connectToDatabase } = require('../lib/db/mongodb');
    const connection = await connectToDatabase();

    if (!connection) {
      console.log('⚠️  MongoDB connection returned null - using PostgreSQL fallback');
      return;
    }

    console.log('✅ Connected to MongoDB successfully!');

    // Test User model
    const User = require('../lib/db/models/User').default;
    const userCount = await User.countDocuments();
    console.log(`📊 Users in database: ${userCount}`);

    // Test Thread model
    const Thread = require('../lib/db/models/Thread').default;
    const threadCount = await Thread.countDocuments();
    console.log(`📊 Threads in database: ${threadCount}`);

    // Test Report model
    const Report = require('../lib/db/models/Report').default;
    const reportCount = await Report.countDocuments();
    console.log(`📊 Reports in database: ${reportCount}`);

    console.log('\n✅ All MongoDB models are working correctly!');

    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testMongoDB();