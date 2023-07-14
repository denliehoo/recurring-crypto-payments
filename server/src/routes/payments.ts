import { Router } from "express";
import {
  cancelSubscription,
  initiateSubscription,
  manageSubscription,
  paymentReceived,
} from "../controllers/payments";
const router = Router();

router.put("/manage-subscription", manageSubscription);
router.put("/initiate-payments", initiateSubscription);
router.put("/received", paymentReceived);
router.put("/cancel", cancelSubscription);

export default router;
