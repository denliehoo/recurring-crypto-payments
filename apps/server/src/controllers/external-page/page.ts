import type { Response } from 'express';
import type { CustomRequest } from '../../types/requests';
import { findVendorById, findVendorClientById } from '../../utility/findFromDb';
import { isAllowanceAndBalanceSufficient } from '../../utility/interactWithBlockchain';

import type {
  PaymentMethod,
  VendorClientSubscriptionDetails,
} from '@core/types/VendorClientSubscriptionDetails';

export const getSubscriptionPageDetails = async (
  req: CustomRequest,
  res: Response,
) => {
  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  const c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(401).json({ error: 'Vendor or client id not found' });

  let paymentMethod: PaymentMethod | null;
  if (c?.paymentMethod?.wallet) {
    const userAddress = c.paymentMethod.wallet;
    const [sufficientAllowance, sufficientBalance] =
      await isAllowanceAndBalanceSufficient(
        userAddress,
        v.tokenAddress || '',
        v.vendorContract || '',
        v.amount || 0,
      );
    if (
      c.paymentMethod.sufficientAllowance !== sufficientAllowance ||
      c.paymentMethod.sufficientBalance !== sufficientBalance
    ) {
      paymentMethod = {
        ...c.paymentMethod,
        sufficientAllowance: sufficientAllowance,
        sufficientBalance: sufficientBalance,
      };
      c.paymentMethod = paymentMethod;

      try {
        await c.save();
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: 'an error occured in updating the client' });
      }
    } else {
      paymentMethod = c.paymentMethod;
    }
  } else {
    paymentMethod = null;
  }

  const data: VendorClientSubscriptionDetails = {
    vendor: v.name || '',
    plan: v.plan || '',
    amount: v.amount || 0,
    token: 'USDT', // TODO: Get token name properly
    status: c.status,
    nextDate: c.nextDate || null,
    tokenAddress: v.tokenAddress || '',
    vendorContract: v.vendorContract || '',
    paymentMethod: paymentMethod,
    billingInfo: c.billingInfo || null,
    invoices: c.invoices || [],
    webhookUrl: v.webhookUrl || '',
    returnUrl: v.returnUrl || '',
  };
  return res.send(data);
};
