#!/bin/bash

echo "Setting up environment variables for AI Agent Email Service"
echo "=========================================================="
echo ""

# Check if .env file already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
fi

echo "Creating .env file..."
echo ""

# Prompt user for email credentials
echo "📧 Email Configuration Setup"
echo "============================"
read -p "Enter your Gmail address: " EMAIL_USER
read -s -p "Enter your Gmail App Password: " EMAIL_PASSWORD
echo ""

# Prompt user for Gemini API key
echo ""
echo "🤖 Gemini API Configuration"
echo "==========================="
read -s -p "Enter your Gemini API Key: " GEMINI_API_KEY
echo ""

# Create .env file with user input
cat > .env << EOF
# Email Configuration (IMAP)
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
EMAIL_USER=${EMAIL_USER}
EMAIL_PASSWORD=${EMAIL_PASSWORD}

# SMTP Configuration for sending emails
MAIL_HOST=smtp.gmail.com
SMTP_USERNAME=${EMAIL_USER}
SMTP_PASSWORD=${EMAIL_PASSWORD}

# Gemini API Configuration
GEMINI_API_KEY=${GEMINI_API_KEY}

# Application Configuration
NODE_ENV=development
PORT=3000

# Note: Using the same Gmail account for both IMAP and SMTP
# The app password works for both IMAP and SMTP
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Your .env file has been created with your credentials"
echo "2. For Gmail users:"
echo "   - Enable 2-factor authentication"
echo "   - Generate an App Password at https://myaccount.google.com/apppasswords"
echo "   - Use the App Password in EMAIL_PASSWORD"
echo "3. Run 'npm run start:dev' to start the application"
echo ""
echo "🔧 Test endpoints available:"
echo "   - GET  /test-mail-service - Test mail service injection"
echo "   - POST /process-emails - Manually trigger email processing"
echo "   - POST /test-email - Test email sending functionality"
echo "   - POST /auth - User registration with email confirmation"
echo ""
echo "📧 Email System:"
echo "   - Simple text-based email replies (no HTML templates needed)"
echo "   - AI-generated responses sent directly to email senders"
echo "   - Perfect for backend email automation"
echo ""
echo "🔒 Security Note:"
echo "   - Your .env file is automatically ignored by git"
echo "   - Never commit sensitive credentials to version control" 