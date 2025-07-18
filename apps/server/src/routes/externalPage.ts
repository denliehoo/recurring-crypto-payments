import { Router } from 'express';

import { verifyToken } from '../middleware/verifyToken';
import {
  cancelSubscription,
  changePaymentMethod,
  getSubscriptionPageDetails,
  initiateSubscription,
  getSubscriptionPageLink,
  renewSubscription,
  updateVendorClientPaymentMethod,
} from '../controllers/external-page';
const router = Router();

router.post('/manage-subscription', getSubscriptionPageLink);
router.post('/initiate-subscription', verifyToken, initiateSubscription);
router.get(
  '/get-subscription-page-details',
  verifyToken,
  getSubscriptionPageDetails,
);

router.put('/change-payment-method', verifyToken, changePaymentMethod);
router.post('/cancel-subscription', verifyToken, cancelSubscription);
router.post('/renew-subscription', verifyToken, renewSubscription);

router.put(
  '/update-billing-info',
  verifyToken,
  updateVendorClientPaymentMethod,
);

export default router;
