# 🚀 Deployment Guide - AI Agent Email Replier

## 🌐 Cloud Deployment Options

### Option 1: Render (Recommended - Free)

#### Step 1: Prepare Your Repository
1. **Push to GitHub**: Ensure your code is pushed to GitHub
2. **Environment Variables**: Note down your credentials:
   - Gmail address and app password
   - Gemini API key

#### Step 2: Deploy on Render
1. **Sign up**: Go to [render.com](https://render.com) and create an account
2. **Connect GitHub**: Connect your GitHub account
3. **New Web Service**: Click "New Web Service"
4. **Select Repository**: Choose your AI Agent repository
5. **Configure Service**:
   - **Name**: `ai-agent-email-replier`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free

#### Step 3: Set Environment Variables
In Render dashboard, go to your service → Environment → Add Environment Variables:

```env
NODE_ENV=production
PORT=3000
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
MAIL_HOST=smtp.gmail.com
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
GEMINI_API_KEY=your-gemini-api-key
```

#### Step 4: Deploy
Click "Create Web Service" and wait for deployment (5-10 minutes).

### Option 2: Railway

1. **Sign up**: [railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy**: Railway will auto-detect and deploy
4. **Environment Variables**: Add the same variables as above

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create App**: `heroku create your-app-name`
4. **Set Variables**: 
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set GEMINI_API_KEY=your-gemini-api-key
   ```
5. **Deploy**: `git push heroku main`

## 📡 API Endpoints

Once deployed, your API will be available at: `https://your-app-name.onrender.com`

### 🔍 Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "AI Agent Email Replier",
  "version": "1.0.0"
}
```

### 📧 Email Service Test
```http
GET /test-mail-service
```
**Response:**
```json
{
  "message": "MailProcessorService is properly injected",
  "serviceName": "MailProcessorService"
}
```

### 🔄 Manual Email Processing
```http
POST /process-emails
```
**Response:**
```json
{
  "message": "Email processing triggered successfully"
}
```

### 📊 Processing Status
```http
GET /email-processing-status
```
**Response:**
```json
{
  "message": "Email processing status",
  "isProcessing": false
}
```

### 🔄 Reset Processing State
```http
POST /reset-email-processing
```
**Response:**
```json
{
  "message": "Email processing state reset successfully"
}
```

### 🧹 Clear Cache
```http
POST /clear-processed-cache
```
**Response:**
```json
{
  "message": "Processed emails cache cleared successfully"
}
```

### ✉️ Test Email Sending
```http
POST /test-email
```
**Response:**
```json
{
  "message": "Test email sent successfully"
}
```

## 🧪 Testing with Postman

### 1. Import Collection
Create a new collection in Postman and add these requests:

### 2. Base URL
Set your base URL: `https://your-app-name.onrender.com`

### 3. Test Requests

#### Health Check
- **Method**: GET
- **URL**: `/health`
- **Expected**: 200 OK with service status

#### Test Mail Service
- **Method**: GET
- **URL**: `/test-mail-service`
- **Expected**: 200 OK with service injection confirmation

#### Process Emails
- **Method**: POST
- **URL**: `/process-emails`
- **Expected**: 200 OK with processing confirmation

#### Send Test Email
- **Method**: POST
- **URL**: `/test-email`
- **Expected**: 200 OK with email sent confirmation

## 🔗 Frontend Integration

### JavaScript/React Example
```javascript
const API_BASE_URL = 'https://your-app-name.onrender.com';

// Health check
const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  const data = await response.json();
  console.log('Service Status:', data);
};

// Process emails
const processEmails = async () => {
  const response = await fetch(`${API_BASE_URL}/process-emails`, {
    method: 'POST'
  });
  const data = await response.json();
  console.log('Processing Result:', data);
};

// Get processing status
const getStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/email-processing-status`);
  const data = await response.json();
  console.log('Processing Status:', data);
};
```

### cURL Examples
```bash
# Health check
curl https://your-app-name.onrender.com/health

# Process emails
curl -X POST https://your-app-name.onrender.com/process-emails

# Test email service
curl https://your-app-name.onrender.com/test-mail-service

# Send test email
curl -X POST https://your-app-name.onrender.com/test-email
```

## 🔧 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

2. **Environment Variables**:
   - Verify all required variables are set
   - Check for typos in variable names

3. **Email Connection**:
   - Ensure Gmail app password is correct
   - Check if 2FA is enabled on Gmail

4. **API Not Responding**:
   - Check health endpoint first
   - Verify service is running in dashboard

### Monitoring
- **Logs**: Check application logs in your cloud platform
- **Health**: Monitor `/health` endpoint
- **Status**: Use `/email-processing-status` to check processing state

## 🚀 Next Steps

1. **Deploy**: Choose your preferred platform and deploy
2. **Test**: Use Postman to test all endpoints
3. **Monitor**: Check logs and health status
4. **Integrate**: Connect your frontend application
5. **Scale**: Upgrade plan if needed for production use 