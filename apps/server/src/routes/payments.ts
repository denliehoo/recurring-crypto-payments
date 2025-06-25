import { Router } from 'express';
import {
  cronApi,
  getScheduledPayments,
  getCompletedPayments,
  createPayout,
  getPayoutsDetails,
  getAllPayments,
  getPendingEndSubscriptions,
} from '../controllers/payments';
import { verifyToken } from '../middleware/verifyToken';
const router = Router();

router.post('/cron-api', cronApi);
router.get('/get-all-payments', verifyToken, getAllPayments);

router.post('/create-payout/:vendorId', verifyToken, createPayout);
router.get('/get-payouts-details', verifyToken, getPayoutsDetails);

// for testing
router.get('/scheduled-payments', getScheduledPayments);
router.get('/completed-payments', getCompletedPayments);
router.get('/pending-end-subscriptions', getPendingEndSubscriptions);

export default router;
