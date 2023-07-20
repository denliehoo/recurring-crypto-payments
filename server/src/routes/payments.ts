import { Router } from "express";
import {
  cancelSubscription,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  paymentReceived,
} from "../controllers/payments";
import { verifySubscriptionToken } from "../middleware/verifySubscriptionToken";
const router = Router();

router.post("/manage-subscription", manageSubscription);
router.post(
  "/initiate-subscription",
  verifySubscriptionToken,
  initiateSubscription
);
router.get(
  "/get-subscription-page-details",
  verifySubscriptionToken,
  getSubscriptionPageDetails
);
router.put("/received", paymentReceived);
router.put("/cancel", cancelSubscription);

export default router;
