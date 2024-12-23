import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World from Inova Backend!';
  }

  async sendWelcomeEmail(to: string, username: string) {
    try {
      await this.mailerService.sendMail({
        to, // Destinatário
        subject: 'Welcome to Our Platform!', // Assunto
        context: {
          // Variáveis para o template
          username,
        },
        html: '<h1>Teste com email</h1> Eae bora trabalhar?',
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  }
}
