
// import { Resend } from 'resend';
// import express from 'express';

// const router = express.Router();
// const resend = new Resend('re_UVCP6LAy_GVz63LxsutyetRENmATsyr5g');

// // POST /api/send-email
// router.post('/send-email', async (req, res) => {
//   const { name, email, message } = req.body;
//   console.log('Email endpoint hit!');
//   console.log('Request body:', req.body);

//   if (!name || !email || !message) {
//     res.status(400).json({ error: 'Missing required fields.' });
//     return;
//   }

//   try {
//     await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'],
//       subject: `New Contact Form Message from `,
//       html: `
//         <h3>New message from }</h3>
//         <p><strong>Email:</strong> </p>
//         <p><strong>Message:</strong><br/></p>
//       `,
//     });



//     res.status(200).json({ success: true });
//     console.log("ba pula");
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send email.' });

//   }

// });

// export default router;
// import { Request, Response } from 'express';
// import { Resend } from 'resend';
// import OrderEmail from '../components/emails/order';

// export const sendEmailGet = async (req: Request, res: Response) => {
//   try {
//     const resend = new Resend(process.env.RESEND_API_KEY as string);

//     const response = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: 'iotheodor@gmail.com',
//       subject: 'New Contact Form Message',
//       react: OrderEmail()
//     });

//     res.status(200).json({ success: true, data: response });
//   } catch (error: any) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };