import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  cancelSubscription,
  changePaymentMethod,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  renewSubscription,
  updateVendorClientPaymentMethod,
} from "../controllers/externalPage";
const router = Router();

router.post("/manage-subscription", manageSubscription);
router.post("/initiate-subscription", verifyToken, initiateSubscription);
router.get(
  "/get-subscription-page-details",
  verifyToken,
  getSubscriptionPageDetails
);

router.post("/change-payment-method", verifyToken, changePaymentMethod);
router.post("/cancel-subscription", verifyToken, cancelSubscription);
router.post("/renew-subscription", verifyToken, renewSubscription);

router.put(
  "/update-vendor-client-billing-info",
  verifyToken,
  updateVendorClientPaymentMethod
);

export default router;
