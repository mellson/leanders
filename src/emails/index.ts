import { buildSendMail } from 'mailing-core';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const sendTestEmail = (email: string) => {
  transport.sendMail(
    {
      from: 'svar_ikke@leanders.dk', // verified sender email
      to: email, // recipient email
      subject: 'Test message subject', // Subject line
      text: 'Hello world!', // plain text body
      html: '<b>Hello world!</b>', // html body
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );
};

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'svar_ikke@leanders.dk',
});

export default sendMail;
