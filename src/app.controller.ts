import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailProcessorService } from './services/mailProcessor-service';
import { EmailService } from './mail/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailProcessorService: MailProcessorService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return { 
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'AI Agent Email Replier',
      version: '1.0.0'
    };
  }

  @Get('test-mail-service')
  testMailService() {
    return { 
      message: 'MailProcessorService is properly injected',
      serviceName: this.mailProcessorService.constructor.name 
    };
  }

  @Post('process-emails')
  async processEmails() {
    await this.mailProcessorService.triggerEmailProcessing();
    return { message: 'Email processing triggered successfully' };
  }

  @Get('email-processing-status')
  getEmailProcessingStatus() {
    return { 
      message: 'Email processing status',
      isProcessing: (this.mailProcessorService as any).isProcessing || false
    };
  }

  @Post('reset-email-processing')
  resetEmailProcessing() {
    // Reset the processing lock
    (this.mailProcessorService as any).isProcessing = false;
    return { message: 'Email processing state reset successfully' };
  }

  @Post('clear-processed-cache')
  clearProcessedCache() {
    // Clear the processed emails cache
    (this.mailProcessorService as any).processedEmails.clear();
    return { message: 'Processed emails cache cleared successfully' };
  }

  @Post('test-email')
  async testEmail() {
    try {
      await this.emailService.sendEmailReply(
        'test@example.com',
        'Test Email',
        '<h1>Hello!</h1><p>This is a test email from your AI Agent application.</p>'
      );
      return { message: 'Test email sent successfully' };
    } catch (error) {
      return { 
        message: 'Failed to send test email', 
        error: error.message 
      };
    }
  }
}
