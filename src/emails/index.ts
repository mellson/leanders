import { buildSendMail } from 'mailing-core';
import nodemailer from 'nodemailer';

console.log('api: ' + process.env.SENDGRID_API_KEY);

const transport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'no_reply@leanders.dk',
});

export default sendMail;
