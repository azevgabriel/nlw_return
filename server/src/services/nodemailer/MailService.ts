import { IMailService, SendMailDTO } from '../IMailService';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '59089836cced47',
    pass: 'd704945d6d25e8',
  },
});

export class MailService implements IMailService {
  async sendMail({ type, comment }: SendMailDTO) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gabriel Azevedo <azevgabriel@gmail.com>',
      subject: 'Novo feedback',
      html: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
