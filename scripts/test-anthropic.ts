#!/usr/bin/env tsx

// Load environment variables FIRST
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Test Anthropic API key
console.log('Testing Anthropic API...');
console.log('API Key starts with:', process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...');

// Import Anthropic after env vars are loaded
import Anthropic from '@anthropic-ai/sdk';

async function testAnthropic() {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    console.log('Sending test request to Claude...');

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Say "Hello, I am working!" in exactly 5 words.'
      }]
    });

    console.log('\n✅ Success! Claude responded:');
    console.log(response.content[0].type === 'text' ? response.content[0].text : 'No text response');

  } catch (error: any) {
    console.error('\n❌ Error testing Anthropic:');
    console.error('Error type:', error.constructor.name);
    console.error('Message:', error.message);

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    if (error.message?.includes('401')) {
      console.error('\n⚠️  This looks like an authentication error. Check your API key.');
    }
  }
}

testAnthropic();