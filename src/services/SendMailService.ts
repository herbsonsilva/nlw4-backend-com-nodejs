import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

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

  async execute(from: string, to: string, subject: string, variables: object, path: string) {

    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    // Message object
    const message = await this.client.sendMail({
      from,
      to,
      subject,
      html
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  };

};

export default new SendMailService();