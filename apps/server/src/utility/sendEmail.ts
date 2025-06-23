import nodemailer from 'nodemailer';
import { generateJWT } from './generateJWT';

// Replace with your actual Gmail credentials
const gmailCredentials = {
  user: process.env.MAILER_EMAIL,
  pass: process.env.MAILER_APP_PASSWORD,
};

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailCredentials.user,
    pass: gmailCredentials.pass,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: gmailCredentials.user,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
/*
e.g.:

const emailOptions: EmailOptions = {
  to: "recipient@example.com",
  subject: "Hello from Nodemailer",
  text: "This is a test email sent through Nodemailer using Gmail.",
  // html: "<p>This is a <b>test</b> email sent through Nodemailer using Gmail.</p>",
};

sendEmail(emailOptions);
*/

export const sendVerificationEmailHelper = async (
  email: string,
  vendorId: string,
) => {
  const token = generateJWT({
    email: email,
    vendorId: vendorId,
  });
  const encodedToken = token.replace(/\./g, '~');
  const verificationUrl = `${process.env.FRONT_END_URL}/verify-email?token=${encodedToken}`;
  const isEmailSent = await sendEmail({
    to: email,
    subject: '[RecurCrypt] Please Verify Your Email',
    text: 'Verify Email',
    html: `<p>Hey there! <br /> Welcome to RecurCrypt! Before you get started, please verify your email by clicking on the this link: ${verificationUrl} </p>`,
  });

  return isEmailSent;
};
