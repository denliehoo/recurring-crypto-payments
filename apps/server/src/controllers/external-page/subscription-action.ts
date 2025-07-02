import type { Response } from 'express';
import type { CustomRequest } from '../../types/requests';
import models from '../../models';
import { findVendorById, findVendorClientById } from '../../utility/findFromDb';
import moment from 'moment';
import type { ICompletedPayment } from '../../models/completedPayment';
import type { IScheduledPayment } from '../../models/scheduledPayment';
import {
  isAllowanceAndBalanceSufficient,
  sendReduceUserBalanceTransactionasync,
} from '../../utility/interactWithBlockchain';
import {
  addCompletedPayment,
  addScheduledPayment,
  deleteScheduledPayment,
  findScheduledPayment,
} from '../../utility/payments';

import { sendWebHook } from '../../utility/sendWebhook';
import {
  addPendingEndSubscription,
  deletePendingEndSubscription,
  findPendingEndSubscription,
} from '../../utility/pendingEndSubscription';
import type { IPendingEndSubscription } from '../../models/pendingEndSubscription';
import type { InitiateSubscription } from '@core/types/checkout';

const { ScheduledPayment, CompletedPayment, PendingEndSubscription } = models;

export const initiateSubscription = async (
  req: CustomRequest,
  res: Response,
) => {
  const { billingInfo, paymentMethod, userAddress } =
    req.body as InitiateSubscription;

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const vendorClientId = decoded.vendorClient;

  const vendor = await findVendorById(vendorId);
  let vendorClient = await findVendorClientById(vendorClientId);

  if (!vendorClient || !vendor) {
    return res.status(401).json({ error: 'Vendor or client id not found' });
  }

  const {
    amount = 0,
    vendorContract = '',
    tokenAddress = '',
    apiKey,
    webhookUrl = '',
  } = vendor;

  // 1. reduces user balance
  const transactionHash = await sendReduceUserBalanceTransactionasync(
    userAddress,
    amount.toString(),
  );

  if (!transactionHash)
    return res.status(400).json({ error: 'Deduction failed' });

  // 2. update vendorClient
  const nextDate = moment().add(1, 'months').toDate();
  const currentDate = new Date();
  try {
    vendorClient.billingInfo = billingInfo;
    vendorClient.paymentMethod = paymentMethod;
    vendorClient.nextDate = nextDate;
    vendorClient.status = 'active';
    vendorClient.invoices = [
      {
        date: currentDate,
        amount,
        token: 'USDT',
        status: 'paid',
        hash: `https://sepolia.etherscan.io/tx/${transactionHash}`,
        invoice: 'https://www.google.com/', // eventually put the actual invoice link
      },
    ];

    vendorClient = await vendorClient.save();
  } catch {
    return res.status(500).json({ error: 'Failed to update VendorClient' });
  }

  const paymentDetails = {
    vendorContract,
    userAddress,
    amount,
    tokenAddress,
    paymentDate: currentDate,
    vendorId,
    vendorClientId,
  };

  // 3. Add above to CompletedPayments
  const newCompletedPayment: ICompletedPayment = new CompletedPayment({
    ...paymentDetails,
    status: 'paid',
    hash: transactionHash,
  });
  const isCompletedPaymentAdded =
    await addCompletedPayment(newCompletedPayment);
  if (!isCompletedPaymentAdded)
    return res.status(500).json({ error: 'Failed to add completed payment' });
  // 4. schedule next payment
  const newScheduledPayment: IScheduledPayment = new ScheduledPayment({
    ...paymentDetails,
    paymentDate: nextDate,
  });
  const isScheduledPaymentAdded =
    await addScheduledPayment(newScheduledPayment);
  if (!isScheduledPaymentAdded)
    return res.status(500).json({ error: 'Failed to update VendorClient' });

  // 5. send a webhook to vendor that subscription should begin and payment received

  const _subscriptionBegunWebHook = await sendWebHook(
    apiKey,
    webhookUrl,
    'SUBSCRIPTION_BEGUN',
    {
      vendorId: vendor._id,
      vendorClientId,
      begun: currentDate,
      nextDate,
    },
  );

  const _successfulPaymentWebhook = await sendWebHook(
    apiKey,
    webhookUrl,
    'SUCCESSFUL_PAYMENT',
    { ...paymentDetails, hash: transactionHash },
  );

  // if (!subscriptionBegunWebHook || !successfulPaymentWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });

  // return at end
  return res.send(vendorClient);
};

export const cancelSubscription = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  const c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(404).json({ error: 'Vendor or client id not found' });

  const sp = await findScheduledPayment(vendorId, clientId);
  if (!sp)
    return res.status(404).json({ error: 'Unable to find scheduled payment' });

  const isScheduledPaymentDeleted = await deleteScheduledPayment(sp);

  if (!isScheduledPaymentDeleted)
    return res
      .status(500)
      .json({ error: 'An error occured in deleting the scheduled payment' });

  const newCompletedPayment: ICompletedPayment = new CompletedPayment({
    vendorContract: sp.vendorContract,
    userAddress: sp.userAddress,
    amount: sp.amount,
    tokenAddress: sp.tokenAddress,
    vendorId: sp.vendorClientId,
    vendorClientId: sp.vendorClientId,
    paymentDate: new Date(),
    status: 'cancelled',
    remarks: 'Cancelled Plan',
  });
  const isCompletedPaymentAdded =
    await addCompletedPayment(newCompletedPayment);

  if (!isCompletedPaymentAdded)
    return res
      .status(500)
      .json({ error: 'An error occured in adding the completed payment' });

  c.status = 'cancelled';

  try {
    await c.save();
  } catch {
    return res
      .status(500)
      .json({ error: 'An error occured in updating the vendor client entity' });
  }

  const newPendingEndSubscription: IPendingEndSubscription =
    new PendingEndSubscription({
      endDate: c.nextDate,
      vendorId: v._id.toString(),
      vendorClientId: c._id.toString(),
    });
  const addedPendingEndSubscription = await addPendingEndSubscription(
    newPendingEndSubscription,
  );

  if (!addedPendingEndSubscription)
    return res.status(500).json({
      error: 'An error occured in added the pending end subscription',
    });

  // send a webhook to inform vendor that user cancelled...
  const _cancelSubscriptionWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl || '',
    'SUBSCRIPTION_CANCELLED',
    {
      vendorId: v._id,
      vendorClientId: c._id,
      endDate: c.nextDate || new Date(),
    },
  );

  // if (!cancelSubscriptionWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });

  return res.status(204).end();
};

export const renewSubscription = async (req: CustomRequest, res: Response) => {
  const { wallet } = req.body;
  if (!wallet)
    return res.status(401).json({ error: 'Wallet field cannot be empty' });

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  let transactionHash: string | null = null;

  if (!v || !c) {
    return res.status(404).json({ error: 'Vendor or client id not found' });
  }

  const paymentDetails = {
    vendorContract: v.vendorContract,
    userAddress: wallet,
    amount: v.amount,
    tokenAddress: v.tokenAddress,
    vendorId: vendorId,
    vendorClientId: clientId,
  };
  const currentDate = new Date();

  let schedluledPaymentDate: Date;

  if (c.nextDate && c.nextDate > currentDate) {
    // means still have time in subscription
    schedluledPaymentDate = c.nextDate;
    const pendingEndSubscriptionToDelete = await findPendingEndSubscription(
      v._id.toString(),
      c._id.toString(),
    );
    if (!pendingEndSubscriptionToDelete)
      return res
        .status(404)
        .json({ error: 'Pending End Subscription not found' });
    const isDeleted = await deletePendingEndSubscription(
      pendingEndSubscriptionToDelete,
    );
    if (!isDeleted)
      return res
        .status(500)
        .json({ error: 'Unable to delete Pending End Subscription' });
  } else {
    // means subscription has expired
    const [sufficientAllowance, sufficientBalance] =
      await isAllowanceAndBalanceSufficient(
        wallet,
        v.tokenAddress || '',
        v.vendorContract || '',
        v.amount || 0,
      );

    if (!sufficientAllowance || !sufficientBalance) {
      return res.status(401).json({
        error: 'Unable to proceed because of insufficient allowance or balance',
      });
    }

    transactionHash = await sendReduceUserBalanceTransactionasync(
      wallet,
      (v.amount || 0).toString(),
    );

    if (!transactionHash) {
      return res.status(400).json({ error: 'Deduction failed' });
    }

    schedluledPaymentDate = moment().add(1, 'months').toDate();

    c.nextDate = schedluledPaymentDate;
    c.invoices.push({
      date: currentDate,
      amount: v.amount || 0,
      token: 'USDT',
      status: 'paid',
      hash: `https://sepolia.etherscan.io/tx/${transactionHash}`,
      invoice: 'https://www.google.com/', // eventually put the actual invoice link
    });

    const newCompletedPayment: ICompletedPayment = new CompletedPayment({
      ...paymentDetails,
      status: 'paid',
      hash: transactionHash,
    });
    const isCompletedPaymentAdded =
      await addCompletedPayment(newCompletedPayment);
    if (!isCompletedPaymentAdded)
      return res.status(500).json({ error: 'Failed to add completed payment' });
  }

  // add the new scheduled payment
  const newScheduledPayment: IScheduledPayment = new ScheduledPayment({
    ...paymentDetails,
    paymentDate: schedluledPaymentDate,
  });
  const isNewScheduledPaymentAdded =
    await addScheduledPayment(newScheduledPayment);
  if (!isNewScheduledPaymentAdded)
    return res
      .status(500)
      .json({ error: 'An error occured while adding the scheduled payment' });

  // update vendor client
  c.status = 'active';
  if (c.paymentMethod) {
    c.paymentMethod.wallet = wallet;
  }
  try {
    c = await c.save();
  } catch {
    return res
      .status(500)
      .json({ error: 'An error occured while updating vendor client' });
  }
  // send webhook that user renew plan....
  const _subscriptionRenewalWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl || '',
    'SUBSCRIPTION_RENEWED',
    {
      vendorId: v._id,
      vendorClientId: c._id,
      nextDate: c.nextDate || new Date(),
    },
  );

  const _successfulPaymentWebhook = await sendWebHook(
    v.apiKey,
    v.webhookUrl || '',
    'SUCCESSFUL_PAYMENT',
    {
      vendorContract: paymentDetails.vendorContract || '',
      userAddress: paymentDetails.userAddress || '',
      amount: paymentDetails.amount || 0,
      tokenAddress: paymentDetails.tokenAddress || '',
      vendorId: paymentDetails.vendorId?.toString() || '',
      vendorClientId: paymentDetails.vendorClientId?.toString() || '',
      paymentDate: currentDate,
      hash: transactionHash || '',
    },
  );

  // TODO: Maybe add logs instead of throwing error since not all would set the webhook url
  // if (!subscriptionRenewalWebhook || !successfulPaymentWebhook)
  //   return res.status(401).json({ error: "Failed to send webhook" });
  return res.send(c);
};
