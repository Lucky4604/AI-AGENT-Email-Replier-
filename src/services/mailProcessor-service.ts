import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GeminiService } from './Gemini/gemini-service';
import { fetchUnreadEmails, markEmailAsRead } from './email-reader-service';
import { EmailService } from '../mail/email.service';

@Injectable()
export class MailProcessorService implements OnModuleInit {
  private readonly logger = new Logger(MailProcessorService.name);
  private isProcessing = false; // Add processing lock
  private processedEmails = new Set<string>(); // Track recently processed emails

  constructor(
    private readonly geminiService: GeminiService,
    private readonly emailService: EmailService,
  ) {
    this.logger.log('MailProcessorService constructor called');
  }

  onModuleInit() {
    this.logger.log('MailProcessorService module initialized');
    this.logger.log('Cron job scheduled to run every 5 minutes');
    
    // Clean up processed emails cache every hour
    setInterval(() => {
      this.processedEmails.clear();
      this.logger.log('🧹 Cleaned up processed emails cache');
    }, 60 * 60 * 1000); // 1 hour
  }

  @Cron('*/5 * * * *') // Run every 5 minutes instead of every minute
  async handleUnreadEmails() {
    this.logger.log('Starting scheduled email processing...');
    await this.processEmails();
  }

  // Manual trigger method for testing
  async triggerEmailProcessing() {
    this.logger.log('Manual email processing triggered');
    await this.processEmails();
  }

  private async processEmails() {
    // Prevent multiple simultaneous processing
    if (this.isProcessing) {
      this.logger.log('Email processing already in progress, skipping...');
      return;
    }

    this.isProcessing = true;
    
    try {
      this.logger.log('Fetching unread emails...');
      const unreadEmails = await fetchUnreadEmails();
      
      this.logger.log(`Found ${unreadEmails.length} unread emails`);

      if (unreadEmails.length === 0) {
        this.logger.log('No unread emails to process');
        return;
      }

      for (const email of unreadEmails) {
        const emailKey = `${email.uid}-${email.messageId}`;
        
        // Check if we've recently processed this email
        if (this.processedEmails.has(emailKey)) {
          this.logger.log(`⏭️ Skipping recently processed email: ${email.subject} (UID: ${email.uid})`);
          continue;
        }
        
        this.logger.log(`Processing email: ${email.subject} (UID: ${email.uid})`);
        
        try {
          // Step 1: Generate AI reply
          const reply = await this.geminiService.generateResponse(email.subject, email.body);
          this.logger.log(`Generated reply for "${email.subject}":`);
          this.logger.log(reply);
          
          // Step 2: Extract email address from the "from" field
          const emailMatch = email.from.match(/<(.+?)>/) || email.from.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
          const senderEmail = emailMatch ? emailMatch[1] : email.from;
          
          // Step 3: Send the reply via email
          await this.emailService.sendEmailReply(senderEmail, email.subject, reply);
          this.logger.log(`Reply sent successfully to ${senderEmail}`);
          
          // Step 4: Only mark as read AFTER successful reply sending
          if (email.uid) {
            await markEmailAsRead(email.uid);
            this.logger.log(`✅ Email ${email.uid} marked as read after successful reply`);
            
            // Add to processed cache to prevent reprocessing
            this.processedEmails.add(emailKey);
            this.logger.log(`📝 Added email ${email.uid} to processed cache`);
          }
        } catch (error) {
          this.logger.error(`❌ Error processing email "${email.subject}" (UID: ${email.uid}): ${error.message}`);
          
          // DO NOT mark as read if there was an error - let it be processed again
          this.logger.log(`⚠️ Email ${email.uid} will remain unread for retry due to error`);
        }
      }
      
      this.logger.log('Email processing completed');
    } catch (error) {
      this.logger.error(`Error in email processing: ${error.message}`);
    } finally {
      this.isProcessing = false; // Always release the lock
    }
  }
}
