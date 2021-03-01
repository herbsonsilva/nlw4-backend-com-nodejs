import nodemailer from 'nodemailer';
import { Transporter } from "nodemailer";

class SendMailService {

  private client: Transporter;

  constructor() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount().then((account) => {
      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    });
  };

  async execute(to: string, subject: string, body: string) {
    // Message object
    const message = await this.client.sendMail({
      from: "NPS <noreply@nps.com>",
      to,
      subject,
      html: body
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  };

};

export default new SendMailService();