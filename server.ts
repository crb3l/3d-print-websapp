import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import OrderEmail from './src/components/emails/order';
import dotenv from 'dotenv';

// Load environment variables
// dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Email endpoint
app.post('/api/send-email', async (req: Request, res: Response) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY2 as string)
    
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'iotheodor@gmail.com',
      subject: 'New Contact Form Message',
      react: OrderEmail()
    });
    res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});