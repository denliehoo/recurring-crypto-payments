import { Router } from "express";
import {
  cancelSubscription,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  cronReduceBalances,
  getScheduledPayments,
  getCompletedPayments,
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
router.post("/cron-reduce-balances", cronReduceBalances);
router.put("/cancel", cancelSubscription);
router.get("/scheduled-payments", getScheduledPayments);
router.get("/completed-payments", getCompletedPayments);

export default router;
