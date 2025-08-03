import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        // Extract name from email address dynamically
        const extractNameFromEmail = (email: string): string => {
          const username = email.split('@')[0];
          const cleanUsername = username.replace(/\d+/g, ''); // Remove numbers
          
          const nameParts = cleanUsername
            .split(/[._-]/)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .filter(part => part.length > 0);
          
          return nameParts.join(' ') || 'AI Email Assistant';
        };

        const smtpUsername = config.get('SMTP_USERNAME');
        const senderName = extractNameFromEmail(smtpUsername);

        return {
          transport: {
            host: config.get('MAIL_HOST'),
            secure: false,
            auth: {
              user: smtpUsername,
              pass: config.get('SMTP_PASSWORD'),
            },
          },
          defaults: {
            from: `"${senderName}" <${smtpUsername}>`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
