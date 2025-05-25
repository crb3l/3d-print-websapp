
import { Router, Request, Response } from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import multer from 'multer';
import CustomerOrderEmail from 'src/components/emails/order';
import AdminOrderEmail from 'src/components/emails/adminOrder';

dotenv.config();

const router = Router();

// Use memory storage (you can switch to disk if needed)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

router.post('/submit-order', upload.single('modelFile'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const modelFile = req.file;
    const { userEmail, userName, userAddress, material, quality, color, infill, quantity, message, volume, totalPrice, sendEmail } = req.body;

    if (!userEmail || !userName) {
      res.status(400).json({ success: false, error: 'User email and name are required' });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const adminEmail = process.env.ADMIN_EMAIL as string || 'orders@info.treidee.ro';

    const orderDetails = {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    
      userName,
      userEmail,
      userAddress,
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
        if (modelFile) {
          // const fileBuffer = fs.readFileSync(modelFile.path);
          const fileBuffer = modelFile.buffer;

          const attachmentContent = [{
            filename: modelFile.originalname,
            content: fileBuffer,
          }];

          console.log(`Prepared attachment: ${modelFile.originalname} (${fileBuffer.length} bytes)`);

          const adminEmailResponse =await resend.emails.send({
          from: process.env.EMAIL_FROM || 'info@info.treidee.ro',
          to: adminEmail,
          subject: `New 3D Print Order: ${orderDetails.orderNumber}`,
          react: AdminOrderEmail(orderDetails),
          // attachments: modelFile ? [{ filename: modelFile.originalname, path: modelFile.path }] : [],
          attachments: attachmentContent
        });

          console.log('Admin email response:', adminEmailResponse); //CAUSE IT DONT WORKI
          console.log(`Prepared attachment: ${modelFile.originalname} (${fileBuffer.length} bytes)`);
        }
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
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

export default router;
