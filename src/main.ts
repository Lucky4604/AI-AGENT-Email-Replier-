import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';

// Load environment variables at the very beginning
configDotenv();

async function bootstrap() {
  console.log('Starting NestJS application...');
  const app = await NestFactory.create(AppModule);
  
  console.log('Application created, starting server...');
  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log('📧 Email processing service is active and will run every 10 minutes');
  console.log('🔧 Manual trigger available at: POST /process-emails');
}

bootstrap();
