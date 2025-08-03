import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export interface User {
  email: string;
  name: string;
}

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    // Simple text email - no HTML needed
    const textContent = `
Hey ${user.name},

Thanks for signing up for AI Email Assistant. We're very excited to have you on board.

To get started using AI Email Assistant, please confirm your account at:
${confirmation_url}

Best regards,
AI Email Assistant Team
    `;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to AI Email Assistant! Confirm your Email',
      text: textContent,
    });
  }

  async sendEmailReply(to: string, subject: string, body: string) {
    // For AI-generated replies, just send the text directly
    await this.mailerService.sendMail({
      to: to,
      subject: `Re: ${subject}`,
      text: body, // Plain text reply
    });
  }
} 