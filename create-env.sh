#!/bin/bash

echo "🔧 Setting up environment variables for AI Agent Email Service"
echo "=============================================================="
echo ""

# Check if .env file already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
fi

echo "Creating .env file with placeholders..."
echo ""

# Create .env file with template
cat > .env << EOF
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
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit the .env file with your actual credentials:"
echo "   - Replace 'your-email@gmail.com' with your Gmail address"
echo "   - Replace 'your-app-password' with your Gmail App Password"
echo "   - Replace 'your-gemini-api-key' with your Gemini API key"
echo ""
echo "2. For Gmail users:"
echo "   - Enable 2-factor authentication"
echo "   - Generate an App Password at https://myaccount.google.com/apppasswords"
echo "   - Use the App Password in EMAIL_PASSWORD and SMTP_PASSWORD"
echo ""
echo "3. For Gemini API:"
echo "   - Get your API key from https://makersuite.google.com/app/apikey"
echo "   - Add it to GEMINI_API_KEY"
echo ""
echo "4. Run 'npm run start:dev' to start the application"
echo ""
echo "🔒 Security Note: The .env file is already in .gitignore and won't be committed to version control" 