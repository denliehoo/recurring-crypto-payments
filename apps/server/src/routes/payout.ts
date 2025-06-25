import { Router } from 'express';

import { verifyToken } from '../middleware/verifyToken';
import { createPayout, getPayoutsDetails } from '@src/controllers/payout';
const router = Router();

router.post('/', verifyToken, createPayout);
router.get('/', verifyToken, getPayoutsDetails);

export default router;
