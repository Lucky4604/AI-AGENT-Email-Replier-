#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testEmailLogic() {
  console.log('🧪 Testing Email Processing Logic\n');
  
  try {
    // Step 1: Check current processing status
    console.log('1️⃣ Checking processing status...');
    const statusResponse = await axios.get(`${BASE_URL}/email-processing-status`);
    console.log('   Status:', statusResponse.data);
    
    // Step 2: Trigger email processing
    console.log('\n2️⃣ Triggering email processing...');
    const processResponse = await axios.post(`${BASE_URL}/process-emails`);
    console.log('   Result:', processResponse.data);
    
    // Step 3: Wait and check status again
    console.log('\n3️⃣ Waiting 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const finalStatusResponse = await axios.get(`${BASE_URL}/email-processing-status`);
    console.log('   Final Status:', finalStatusResponse.data);
    
    console.log('\n✅ Test completed!');
    console.log('\n📋 Expected Behavior:');
    console.log('   - Email should be fetched as unread');
    console.log('   - AI reply should be generated');
    console.log('   - Reply should be sent via email');
    console.log('   - Original email should be marked as read');
    console.log('   - Processing status should return to false');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

async function checkLogs() {
  console.log('📋 Email Processing Logs to Check:\n');
  console.log('1. Look for: "🔍 Fetching unread emails with seen: false filter..."');
  console.log('2. Look for: "📧 Found message UID: X, flags: []" (should be empty flags for unread)');
  console.log('3. Look for: "Generated reply for..."');
  console.log('4. Look for: "Reply sent successfully to..."');
  console.log('5. Look for: "✅ Email X marked as read after successful reply"');
  console.log('6. Look for: "🔗 Connecting to mark email X as read..."');
  console.log('7. Look for: "✅ Successfully marked email X as read"');
  console.log('\n❌ If you see errors:');
  console.log('   - "❌ Error processing email..." - Email will remain unread for retry');
  console.log('   - "⚠️ Email X will remain unread for retry due to error"');
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'test':
    testEmailLogic();
    break;
  case 'logs':
    checkLogs();
    break;
  default:
    console.log(`
Usage: node test-email-logic.js [command]

Commands:
  test    - Test the email processing logic
  logs    - Show what logs to check for debugging

Example:
  node test-email-logic.js test
    `);
} 