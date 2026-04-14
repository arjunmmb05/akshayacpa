import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Configure SMTP transporter
  // These variables must be set in Vercel Project Settings -> Environment Variables
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.SMTP_USER, // e.g., akshayakn984@gmail.com
      pass: process.env.SMTP_PASS, // Your Gmail App Password
    },
  });

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Gmail requires sender to be the auth user or verified alias
      to: 'akshayakn984@gmail.com', // Where you want to receive inquiries
      replyTo: email,
      subject: `New Inquiry from ${name} (Akshaya Website)`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0056b3;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
