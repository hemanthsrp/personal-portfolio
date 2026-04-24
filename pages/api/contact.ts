// API route to handle contact form submissions and send emails

// Next.js API types
import type { NextApiRequest, NextApiResponse } from 'next';
// Email sending utility
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_TO = process.env.EMAIL_TO;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.error('Contact form is missing required environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  // Parse request body
  const { email, message } = req.body;

  if (typeof email !== 'string' || typeof message !== 'string' || !email.trim() || !message.trim()) {
    return res.status(400).json({ message: 'Please provide a valid email and message.' });
  }

  // Configure transporter only after env vars are validated.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: EMAIL_USER,
      replyTo: email,
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