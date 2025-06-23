import type { Request, Response } from 'express';
import Vendor, { type IVendor } from '../models/vendor';
import { findVendorByEmail, findVendorById } from '../utility/findFromDb';
import type { CustomRequest } from '../types/requests';
import type { UpdateVendor } from '@core/types';

export const getVendors = async (_req: Request, res: Response) => {
  try {
    // Retrieve all vendors from the database
    const vendors: IVendor[] = await Vendor.find();

    res.json(vendors);
  } catch (error) {
    console.error('Error retrieving vendors:', error);
    res.status(500).json({ error: 'Failed to retrieve vendors' });
  }
};

export const getVendorByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  return res.send(vendor);
};
export const getVendorById = async (req: Request, res: Response) => {
  const { id } = req.body;
  const vendor = await findVendorById(id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  return res.send(vendor);
};

export const updateVendor = async (
  req: Request<never, never, UpdateVendor>,
  res: Response,
) => {
  try {
    const {
      name,
      webhookUrl,
      returnUrl,
      tokenAddress,
      amount,
      vendorContract,
      plan,
      id,
    } = req.body;
    let vendor = await findVendorById(id);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    if (
      !webhookUrl ||
      !tokenAddress ||
      !amount ||
      !vendorContract ||
      !plan ||
      !name ||
      !returnUrl
    )
      return res.status(400).json({ error: 'Cannot be empty' });

    vendor.name = name;
    vendor.webhookUrl = webhookUrl;
    vendor.tokenAddress = tokenAddress;
    vendor.amount = amount;
    vendor.vendorContract = vendorContract;
    vendor.plan = plan;
    vendor.returnUrl = returnUrl;

    vendor = await vendor.save();

    return res.send(vendor);
  } catch {
    return res.status(500).json({ error: 'Failed to update vendor' });
  }
};

export const getVendorByToken = async (req: CustomRequest, res: Response) => {
  const { email } = req.decoded;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: 'Vendor Not Found' });
  return res.send(vendor);
};
