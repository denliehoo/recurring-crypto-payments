import type { Response } from 'express';
import type { CustomRequest } from '../../types/requests';
import models from '../../models';
import { findVendorById, findVendorClientById } from '../../utility/findFromDb';
import {
  findScheduledPayment,
  updateScheduledPayment,
} from '../../utility/payments';

const { VendorClient } = models;

export const updateVendorClientPaymentMethod = async (
  req: CustomRequest,
  res: Response,
) => {
  try {
    const clientId = req.decoded.vendorClient;

    const billingInfo = req.body;

    let vendorClient = await VendorClient.findById(clientId);
    if (!vendorClient)
      return res.status(404).json({ error: 'Vendor Client not found' });
    if (!billingInfo.name || !billingInfo.address || !billingInfo.email)
      return res.status(400).json({ error: 'Cannot be empty' });

    vendorClient.billingInfo = billingInfo;

    vendorClient = await vendorClient.save();

    return res.send(vendorClient);
  } catch {
    return res.status(500).json({ error: 'Failed to update VendorClient' });
  }
};

export const changePaymentMethod = async (
  req: CustomRequest,
  res: Response,
) => {
  const { newAddress } = req.body;
  if (!newAddress)
    return res
      .status(401)
      .json({ error: 'User Address field cannot be empty' });

  const decoded = req.decoded;
  const vendorId = decoded.vendor;
  const clientId = decoded.vendorClient;
  const v = await findVendorById(vendorId);
  let c = await findVendorClientById(clientId);

  if (!v || !c)
    return res.status(404).json({ error: 'Vendor or client id not found' });
  if (!c?.paymentMethod?.wallet)
    return res
      .status(401)
      .json({ error: 'The user does not have a current payment method' });
  const sp = await findScheduledPayment(vendorId, clientId);
  if (!sp)
    return res.status(404).json({ error: 'Unable to find scheduled payment' });

  const isScheduledPaymentUpdated = await updateScheduledPayment(
    sp,
    newAddress,
  );
  if (!isScheduledPaymentUpdated)
    return res
      .status(500)
      .json({ error: 'An error occured in updating the scheduled payment' });

  c.paymentMethod.wallet = newAddress;
  try {
    c = await c.save();
  } catch {
    return res
      .status(500)
      .json({ error: 'An error occured in updating the vendor client' });
  }
  return res.send(c);
};
