import { buildSendMail } from 'mailing-core';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  secure: false,
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendTestEmail = async (email: string) => {
  console.log({
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  });

  const res = await transport.sendMail({
    from: 'svar_ikke@leanders.dk', // verified sender email
    to: email, // recipient email
    subject: 'Test message subject', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world!</b>', // html body
  });

  console.log(res);
};

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'svar_ikke@leanders.dk',
});

export default sendMail;
