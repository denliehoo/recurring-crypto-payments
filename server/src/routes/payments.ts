import { Router } from "express";
import {
  cancelSubscription,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  cronReduceBalances,
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

export default router;
