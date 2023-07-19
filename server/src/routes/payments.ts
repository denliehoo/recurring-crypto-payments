import { Router } from "express";
import {
  cancelSubscription,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  paymentReceived,
} from "../controllers/payments";
const router = Router();

router.post("/manage-subscription", manageSubscription);
router.put("/initiate-payments", initiateSubscription);
router.get("/get-subscription-page-details", getSubscriptionPageDetails);
router.put("/received", paymentReceived);
router.put("/cancel", cancelSubscription);

export default router;
