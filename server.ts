// import express, { Request, Response } from 'express';
// import { Resend } from 'resend';
// import CustomerOrderEmail from './src/components/emails/order';
// import dotenv from 'dotenv';
// import cors from 'cors';

// // Load environment variables
// // dotenv.config({ path: '.env.local' });

// const app = express();
// const port = process.env.PORT || 3001;

// // Middleware to parse JSON
// app.use(express.json());
// app.use(cors());

// // Email endpoint
// app.post('/api/send-email', async (req: Request, res: Response) => {
//   try {
//      // You can extract recipient email from request body
//     const { recipientEmail } = req.body;

//     const resend = new Resend(process.env.RESEND_API_KEY2 as string)
    
//     const response = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: 'iotheodor@gmail.com',
//       subject: 'New Contact Form Message',
//       react: CustomerOrderEmail()
//     });
//     res.status(200).json({ success: true, data: response });
//   } catch (error: any) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import CustomerOrderEmail from './src/components/emails/order';
import AdminOrderEmail from './src/components/emails/adminOrder';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3001;

// Configure file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Middleware
app.use(express.json());
app.use(cors());

// Define interface for request with file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Process 3D print orders
app.post('/api/submit-order', upload.single('modelFile'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const modelFile = req.file;
    const { userEmail, userName, material, quality, color, infill, quantity, message, volume, totalPrice, sendEmail } = req.body;

    if (!userEmail || !userName) {
      res.status(400).json({ success: false, error: 'User email and name are required' });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

    const orderDetails = {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      userName,
      userEmail,
      material,
      quality,
      color,
      infill: `${infill}%`,
      quantity,
      volume: `${parseFloat(volume).toFixed(2)} cm³`,
      totalPrice: `${parseFloat(totalPrice).toFixed(2)} RON`,
      message: message || 'No additional message',
      fileName: modelFile ? modelFile.originalname : 'No file attached',
    };

    if (sendEmail === 'true') {
      try {
        await resend.emails.send({
          from: 'orders@your-domain.com',
          to: adminEmail,
          subject: `New 3D Print Order: ${orderDetails.orderNumber}`,
          react: AdminOrderEmail(orderDetails),
          attachments: modelFile ? [{ filename: modelFile.originalname, path: modelFile.path }] : [],
        });

        await resend.emails.send({
          from: 'orders@your-domain.com',
          to: userEmail,
          subject: `Your 3D Print Order Confirmation: ${orderDetails.orderNumber}`,
          react: CustomerOrderEmail(orderDetails),
        });

        res.status(200).json({ success: true, message: 'Emails sent successfully', orderNumber: orderDetails.orderNumber });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        res.status(500).json({ success: false, error: 'Failed to send emails' });
      }
    } else {
      res.status(200).json({ success: true, message: 'Order processed without email', orderNumber: orderDetails.orderNumber });
    }
  } catch (error: any) {
    console.error('Order processing error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
