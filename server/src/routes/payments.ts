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
import { verifyToken } from "../middleware/verifyToken";
const router = Router();

router.post("/manage-subscription", manageSubscription);
router.post("/initiate-subscription", verifyToken, initiateSubscription);
router.get(
  "/get-subscription-page-details",
  verifyToken,
  getSubscriptionPageDetails
);
router.post("/cron-reduce-balances", cronReduceBalances);
router.put("/cancel", cancelSubscription);
router.get("/scheduled-payments", getScheduledPayments);
router.get("/completed-payments", getCompletedPayments);

export default router;
