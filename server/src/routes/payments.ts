import { Router } from "express";
import {
  cancelSubscription,
  getSubscriptionPageDetails,
  initiateSubscription,
  manageSubscription,
  cronReduceBalances,
  getScheduledPayments,
  getCompletedPayments,
  createPayout,
  getPayoutsDetails,
  getAllPayments,
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
router.get("/get-all-payments", verifyToken, getAllPayments)

router.post("/create-payout/:vendorId", 
verifyToken, createPayout);
router.get("/get-payouts-details",
 verifyToken, 
 getPayoutsDetails);

export default router;
