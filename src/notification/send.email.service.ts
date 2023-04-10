import { Injectable } from '@nestjs/common';
import { SendMailOptions, createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SendEmailService {
  constructor() {}

  static sendEmail() {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'policialvieira@gmail.com',
        pass: process.env.PASS,
      },
    });

    const mailOptions: SendMailOptions = {
      from: 'policialvieira@gmail.com',
      to: 'theodorovieira01@gmail.com',
      subject: 'Test Email',
      text: 'Hello, this is a test email sent using Node.js and nodemailer!',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
