import nodemailer from "nodemailer";

// Replace with your actual Gmail credentials
const gmailCredentials = {
  user: process.env.MAILER_EMAIL,
  pass: process.env.MAILER_APP_PASSWORD,
};

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
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

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
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
