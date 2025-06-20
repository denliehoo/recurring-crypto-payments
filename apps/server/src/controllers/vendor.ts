import type { Request, Response } from 'express';
import Vendor, { type IVendor } from '../models/vendor';
import { v4 as uuidv4 } from 'uuid';
import {
  comparePasswords,
  hashPassword,
  validatePasswordStrength,
} from '../utility/credentials';
import { findVendorByEmail, findVendorById } from '../utility/findFromDb';
import type { CustomRequest } from '../types/requests';
import { sendEmail } from '../utility/sendEmail';
import { generateJWT } from '../utility/generateJWT';
import type { UpdateVendor } from '@core/types';
import { DOMAIN_TOKEN_MAPPING, ESubdomain } from '@src/constants/cookies';

// aka register
export const createVendor = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = 'sk-' + uuidv4() + uuidv4() + uuidv4();

    if (!email || !password)
      return res.status(400).json({ error: 'Cannot be empty' });

    const isExistingEmail = await findVendorByEmail(email);
    if (isExistingEmail)
      return res.status(401).json({ error: 'Vendor already exists' });

    const isValidPassword = validatePasswordStrength(password);
    if (!isValidPassword)
      return res.status(400).json({
        error:
          'Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character',
      });

    const hashedPassword = await hashPassword(password);

    // Create the vendor in the database
    const vendor: IVendor = await Vendor.create({
      name,
      email,
      apiKey,
      password: hashedPassword,
    });

    await sendVerificationEmailHelper(email, vendor._id.toString());

    return res.status(201).json(vendor);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Failed to create vendor' });
  }
};

// TODO: Remove the verifytoken middleware and accept it as a param instead
export const verifyEmail = async (req: CustomRequest, res: Response) => {
  const { email, vendorId } = req.decoded;
  let v = await findVendorById(vendorId);
  if (!v) return res.status(404).json({ error: 'Vendor not found' });

  if (v.isVerified)
    return res.status(400).json({ error: 'Vendor is already verified' });

  v.isVerified = true;
  try {
    v = await v.save();
  } catch {
    return res
      .status(500)
      .json({ error: 'Server error occured while saving vendor' });
  }
  return res.send(v);
};

export const resendEmailVerification = async (req: Request, res: Response) => {
  const { email } = req.body;
  const v = await findVendorByEmail(email);
  if (!v) return res.status(404).json({ error: 'Vendor not found' });
  if (v.isVerified)
    return res.status(400).json({ error: 'Vendor is already verified' });

  const isSent = await sendVerificationEmailHelper(email, v._id.toString());
  if (!isSent) return res.status(500).json({ error: 'Unable to send email' });
  return res.status(204).end();
};

export const getVendors = async (req: Request, res: Response) => {
  try {
    // Retrieve all vendors from the database
    const vendors: IVendor[] = await Vendor.find();

    res.json(vendors);
  } catch (error) {
    console.error('Error retrieving vendors:', error);
    res.status(500).json({ error: 'Failed to retrieve vendors' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  const isCorrectPassword = await comparePasswords(password, vendor.password!); // true or false
  if (!isCorrectPassword)
    return res.status(400).json({ error: 'Incorrect Password' });

  if (!vendor.isVerified)
    return res.status(401).json({ error: 'Email Unverified' });

  const token = generateJWT(
    { email: email, vendorId: vendor._id.toString() },
    86400,
  );

  // Set the token as an HttpOnly cookie
  res.cookie(DOMAIN_TOKEN_MAPPING[ESubdomain.DASHBOARD], token, {
    httpOnly: true,
    secure: process.env.ENV === 'PROD', // only over HTTPS in production
    sameSite: 'lax', // TODO: Change to strict eventually
    maxAge: 86400 * 1000, // in milliseconds
  });

  return res.status(200).json({ message: 'Login successful' });
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
  req: Request<{}, {}, UpdateVendor>,
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
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update vendor' });
  }
};

export const getVendorByToken = async (req: CustomRequest, res: Response) => {
  const { email } = req.decoded;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: 'Vendor Not Found' });
  return res.send(vendor);
};

// helpers
const sendVerificationEmailHelper = async (email: string, vendorId: string) => {
  const token = generateJWT({
    email: email,
    vendorId: vendorId,
  });
  const encodedToken = token.replace(/\./g, '~');
  const verificationUrl = `${process.env.FRONT_END_URL}/verify-email?token=${encodedToken}`;
  const isEmailSent = await sendEmail({
    to: email,
    subject: '[RecurCrypt] Please Verify Your Email',
    text: 'Verify Email',
    html: `<p>Hey there! <br /> Welcome to RecurCrypt! Before you get started, please verify your email by clicking on the this link: ${verificationUrl} </p>`,
  });

  return isEmailSent;
};
