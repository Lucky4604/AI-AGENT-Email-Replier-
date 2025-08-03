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

# Create .env file with template
cat > .env << EOF
# Email Configuration (IMAP)
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
EMAIL_USER=abhirajput6727@gmail.com
EMAIL_PASSWORD=ujugdkfdegrsrphk

# SMTP Configuration for sending emails
MAIL_HOST=smtp.gmail.com
SMTP_USERNAME=abhirajput6727@gmail.com
SMTP_PASSWORD=ujugdkfdegrsrphk

# Gemini API Configuration
GEMINI_API_KEY=AIzaSyA_q2oX48qWpDZW1c8XJNLqIbdXyH30WT0

# Application Configuration
NODE_ENV=development
PORT=3000

# Note: Using the same Gmail account for both IMAP and SMTP
# The app password 'ujugdkfdegrsrphk' works for both IMAP and SMTP
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit the .env file with your actual email credentials"
echo "2. For Gmail users:"
echo "   - Enable 2-factor authentication"
echo "   - Generate an App Password at https://myaccount.google.com/apppasswords"
echo "   - Use the App Password in SMTP_PASSWORD"
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