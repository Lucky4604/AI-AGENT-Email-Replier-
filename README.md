<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

**AI Agent Email Replier** - An intelligent email automation system built with NestJS that automatically reads, processes, and responds to emails using Google's Gemini AI.

### 🚀 Features

- **🤖 AI-Powered Email Responses**: Uses Google Gemini AI to generate intelligent, contextual email replies
- **📧 Automatic Email Processing**: Continuously monitors inbox for unread emails
- **🔄 Real-time Processing**: Processes emails every minute with automatic response generation
- **🔐 Secure Authentication**: User registration with email confirmation
- **📱 RESTful API**: Complete API endpoints for email management and processing
- **🐳 Docker Support**: Easy deployment with Docker and Docker Compose
- **🔒 Environment-based Configuration**: Secure credential management

### 🛠️ Tech Stack

- **Backend**: NestJS (Node.js framework)
- **AI**: Google Gemini API
- **Email**: IMAP (reading) + SMTP (sending)
- **Containerization**: Docker & Docker Compose
- **Language**: TypeScript

### 📋 API Endpoints

- `GET /test-mail-service` - Test mail service injection
- `POST /process-emails` - Manually trigger email processing
- `POST /test-email` - Test email sending functionality
- `POST /auth` - User registration with email confirmation

### 🎯 Use Cases

- **Customer Support Automation**: Automatically respond to common customer inquiries
- **Email Management**: Process and organize incoming emails
- **Business Communication**: Generate professional email responses
- **Personal Assistant**: Automate personal email responses

## Project setup

### Option 1: Local Development Setup

```bash
$ npm install
```

### Option 2: Docker Setup (Recommended)

This project includes Docker support for easy deployment and consistent environments.

#### Prerequisites

1. **Install Docker**: 
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Windows/Mac
   - [Docker Engine](https://docs.docker.com/engine/install/) for Linux

2. **Install Docker Compose** (usually included with Docker Desktop):
   ```bash
   # Verify Docker installation
   docker --version
   docker-compose --version
   ```

#### Quick Start with Docker

1. **Clone and Setup**:
   ```bash
   git clone <your-repo-url>
   cd ai-agent
   ```

2. **Configure Environment**:
   ```bash
   # Create .env file with your credentials
   ./setup-env.sh
   ```

3. **Build and Run**:
   ```bash
   # Build and start the application
   docker-compose up --build
   
   # Or run in detached mode
   docker-compose up -d --build
   ```

4. **Access the Application**:
   - Open your browser to `http://localhost:3000`
   - API endpoints available at `http://localhost:3000/api`

#### Docker Commands

```bash
# Start the application
docker-compose up

# Start in background
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build

# Clean up containers and images
docker-compose down --rmi all --volumes --remove-orphans
```

#### Docker Development Workflow

For development with hot-reload:

```bash
# Start with volume mounting for live code changes
docker-compose up --build

# The application will automatically restart when you make code changes
# thanks to the volume mount and NestJS watch mode
```

#### Production Docker Deployment

For production deployment:

1. **Update Dockerfile** (if needed):
   ```dockerfile
   # Change the CMD to production mode
   CMD ["npm", "run", "start:prod"]
   ```

2. **Build and Deploy**:
   ```bash
   # Build production image
   docker build -t ai-agent:latest .
   
   # Run production container
   docker run -d -p 3000:3000 --env-file .env ai-agent:latest
   ```

#### Docker Environment Variables

The Docker setup automatically loads environment variables from your `.env` file. Make sure your `.env` file contains:

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

#### Troubleshooting Docker

**Common Issues:**

1. **Port already in use**:
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Change port in docker-compose.yml
   ports:
     - "3001:3000"  # Use port 3001 instead
   ```

2. **Permission issues**:
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Container not starting**:
   ```bash
   # Check container logs
   docker-compose logs ai-agent
   
   # Check if .env file exists
   ls -la .env
   ```

4. **Environment variables not loading**:
   ```bash
   # Verify .env file format
   cat .env
   
   # Check if variables are loaded
   docker-compose exec ai-agent env | grep EMAIL
   ```

## Email Configuration

This application includes email functionality for both reading (IMAP) and sending (SMTP) emails. To configure the email services:

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

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

**Quick Setup**: Run `./setup-env.sh` to automatically create a `.env` file with the current configuration.

### 2. Gmail Setup

If using Gmail:
1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in your `EMAIL_PASSWORD` and `SMTP_PASSWORD`

### 3. Gemini API Setup

For AI-powered email responses:
1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add your API key to the `GEMINI_API_KEY` environment variable

### 4. Email Features

- **Automatic Email Processing**: The application automatically checks for unread emails every minute
- **AI-Powered Replies**: Uses Gemini AI to generate professional email responses
- **Simple Text Emails**: Direct text-based replies (no complex HTML templates)
- **Auth System**: Includes user registration with email confirmation

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Quick Start

### 🚀 Get Started in 3 Steps

1. **Clone and Setup**:
   ```bash
   git clone <your-repo-url>
   cd ai-agent
   ```

2. **Configure Environment**:
   ```bash
   # Interactive setup (recommended)
   ./setup-env.sh
   
   # Or manually create .env file
   cp env.example .env
   # Edit .env with your credentials
   ```

3. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**:
   - Open `http://localhost:3000`
   - Test endpoints: `http://localhost:3000/test-mail-service`

### 📋 Prerequisites

- Docker and Docker Compose installed
- Gmail account with App Password
- Google Gemini API key

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
