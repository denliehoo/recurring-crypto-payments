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
  changePaymentMethod,
  renewSubscription,
  getDashboard,
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
router.post("/change-payment-method", verifyToken, changePaymentMethod);
router.post("/cancel-subscription", verifyToken, cancelSubscription);
router.post("/renew-subscription", verifyToken, renewSubscription);

router.post("/cron-reduce-balances", cronReduceBalances);
router.get("/get-all-payments", verifyToken, getAllPayments);

router.get("/get-dashboard", verifyToken, getDashboard);

router.post("/create-payout/:vendorId", verifyToken, createPayout);
router.get("/get-payouts-details", verifyToken, getPayoutsDetails);

// for testing
router.get("/scheduled-payments", getScheduledPayments);
router.get("/completed-payments", getCompletedPayments);

export default router;
