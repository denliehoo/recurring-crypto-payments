import { Router } from 'express';
const router = Router();
import {
  register,
  login,
  resendEmailVerification,
  verifyEmail,
} from '../controllers/auth';
import { verifyToken } from '../middleware/verifyToken';

router.post('/verify-email', verifyToken, verifyEmail);
router.post('/resend-verification', resendEmailVerification);

router.post('/register', register);
router.post('/login', login);

export default router;
