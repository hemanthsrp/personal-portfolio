// API route to handle contact form submissions and send emails

// Next.js API types
import type { NextApiRequest, NextApiResponse } from 'next';
// Email sending utility
import nodemailer from 'nodemailer';

// Environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

if (!EMAIL_USER) {
  // Throw error if EMAIL_USER is missing
  throw new Error('Missing environment variable: EMAIL_USER');
}
if (!EMAIL_PASS) {
  // Throw error if EMAIL_PASS is missing
  throw new Error('Missing environment variable: EMAIL_PASS');
}
if (!EMAIL_TO) {
  // Throw error if EMAIL_TO is missing
  throw new Error('Missing environment variable: EMAIL_TO');
}

// Create transporter
// Configure nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Parse request body
  const { email, message } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: email,
      to: EMAIL_TO,
      subject: `Message from ${email}`,
      text: message,
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    // Handle errors
    console.error('Email failed:', err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
}

// End of API route