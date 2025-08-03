#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testEmailProcessing() {
  try {
    console.log('🔍 Checking email processing status...');
    
    // Check current processing status
    const statusResponse = await axios.get(`${BASE_URL}/email-processing-status`);
    console.log('📊 Processing Status:', statusResponse.data);
    
    // Trigger manual email processing
    console.log('\n🚀 Triggering manual email processing...');
    const processResponse = await axios.post(`${BASE_URL}/process-emails`);
    console.log('✅ Processing Result:', processResponse.data);
    
    // Wait a moment and check status again
    console.log('\n⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const finalStatusResponse = await axios.get(`${BASE_URL}/email-processing-status`);
    console.log('📊 Final Processing Status:', finalStatusResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function resetProcessing() {
  try {
    console.log('🔄 Resetting email processing state...');
    const response = await axios.post(`${BASE_URL}/reset-email-processing`);
    console.log('✅ Reset Result:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function clearProcessedCache() {
  try {
    console.log('🧹 Clearing processed emails cache...');
    const response = await axios.post(`${BASE_URL}/clear-processed-cache`);
    console.log('✅ Cache Clear Result:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'test':
    testEmailProcessing();
    break;
  case 'reset':
    resetProcessing();
    break;
  case 'clear-cache':
    clearProcessedCache();
    break;
  case 'status':
    axios.get(`${BASE_URL}/email-processing-status`)
      .then(response => console.log('📊 Status:', response.data))
      .catch(error => console.error('❌ Error:', error.response?.data || error.message));
    break;
  default:
    console.log(`
Usage: node test-email-processing.js [command]

Commands:
  test        - Test email processing
  reset       - Reset processing state
  clear-cache - Clear processed emails cache
  status      - Check processing status

Example:
  node test-email-processing.js test
    `);
} 