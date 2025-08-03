import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailProcessorService } from './services/mailProcessor-service';
import { GeminiModule } from './services/Gemini/gemini-module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './mail/email.module';

@Module({
 imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ScheduleModule.forRoot(),
    GeminiModule,
    AuthModule, //  👈 imported auth module
    EmailModule, //  👈 imported email module
  ],
  controllers: [AppController],
  providers: [AppService, MailProcessorService],
})
export class AppModule {}