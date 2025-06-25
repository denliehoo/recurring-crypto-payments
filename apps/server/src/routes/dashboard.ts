import { Router } from 'express';
const router = Router();

import { verifyToken } from '../middleware/verifyToken';
import { getDashboard } from '@src/controllers/dashboard';

router.get('/', verifyToken, getDashboard);

export default router;
