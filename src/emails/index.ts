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

const sendMail = buildSendMail({
  transport,
  defaultFrom: 'svar_ikke@leanders.dk',
});

export default sendMail;
