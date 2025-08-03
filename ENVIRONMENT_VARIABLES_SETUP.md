# Environment Variables Setup Guide

## Overview

This document outlines the changes made to move hardcoded credentials to environment variables for better security and deployment flexibility.

## Changes Made

### 1. Email Reader Service (`src/services/email-reader-service.ts`)

**Before:**
```typescript
const client = new ImapFlow({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: {
    user: 'abhirajput6727@gmail.com',
    pass: 'ujugdkfdegrsrphk' 
  }
});
```

**After:**
```typescript
// Load environment variables
configDotenv();

const client = new ImapFlow({
  host: process.env.EMAIL_HOST || 'imap.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '993'),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'abhirajput6727@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'ujugdkfdegrsrphk' 
  }
});
```

### 2. Gemini Service (`src/services/Gemini/gemini-service.ts`)

**Before:**
```typescript
private genAI = new GoogleGenerativeAI('AIzaSyA_q2oX48qWpDZW1c8XJNLqIbdXyH30WT0')
```

**After:**
```typescript
// Load environment variables
configDotenv();

private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyA_q2oX48qWpDZW1c8XJNLqIbdXyH30WT0')
```

### 3. Updated Setup Scripts

- **`setup-env.sh`**: Updated to include all environment variables
- **`create-env.sh`**: New script for creating `.env` file with placeholders
- **`env.example`**: Example environment variables file

### 4. Updated Documentation

- **`README.md`**: Added comprehensive environment variables section
- **`.gitignore`**: Already includes `.env` files (no changes needed)

## Environment Variables

### Required Variables

```env
# Email Configuration (IMAP)
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# SMTP Configuration for sending emails
MAIL_HOST=smtp.gmail.com
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Gemini API Configuration
GEMINI_API_KEY=your-gemini-api-key

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Setup Instructions

### Option 1: Quick Setup (Recommended)
```bash
./create-env.sh
```
Then edit the `.env` file with your actual credentials.

### Option 2: Manual Setup
1. Create a `.env` file in the root directory
2. Copy the environment variables from `env.example`
3. Replace placeholder values with your actual credentials

### Option 3: Use Current Setup
```bash
./setup-env.sh
```
This will create a `.env` file with the current hardcoded values.

## Security Benefits

1. **No Hardcoded Credentials**: All sensitive data is now in environment variables
2. **Git Safety**: `.env` files are in `.gitignore` and won't be committed
3. **Deployment Flexibility**: Different environments can use different credentials
4. **Team Collaboration**: Each developer can use their own credentials

## Migration Notes

- The code includes fallback values for backward compatibility
- Existing functionality will continue to work with the current hardcoded values
- Environment variables take precedence over hardcoded fallbacks
- The `ConfigModule` in `app.module.ts` automatically loads `.env` files

## Next Steps for Production

1. Remove fallback hardcoded values from the code
2. Set up proper environment variable management in your deployment platform
3. Use different credentials for development, staging, and production
4. Consider using a secrets management service for production deployments 