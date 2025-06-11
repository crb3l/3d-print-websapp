import supabase from '../../utils/supabase';
import { Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const router = Router();

const resendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 resend requests per windowMs
  message: 'Too many resend attempts, please try again after an hour.',
  keyGenerator: (req: Request) => req.body.email, // Rate limit based on email
});

router.post('/api/resend-confirmation', resendLimiter, async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, error: 'Email is required' });
    return;
  }
  

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      console.error('Supabase resend error:', error);
      res.status(500).json({ success: false, error: error.message });
      return;
    }

    res.status(200).json({ success: true, message: 'Confirmation email resent' });
    return;
  } catch (err: any) {
    console.error('Unexpected resend error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
    return;
  }
});

export default router;