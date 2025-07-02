import type { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';

import { DOMAIN_TOKEN_MAPPING, ESubdomain } from '@src/constants/cookies';
import Vendor, { type IVendor } from '@src/models/vendor';
import type { CustomRequest } from '@src/types/requests';
import {
  validatePasswordStrength,
  hashPassword,
  comparePasswords,
} from '@src/utility/credentials';
import { findVendorByEmail, findVendorById } from '@src/utility/findFromDb';
import { generateJWT } from '@src/utility/generateJWT';
import { sendVerificationEmailHelper } from '@src/utility/sendEmail';
import {
  IApiPostLogin,
  IApiPostRegister,
  IApiResendVerification,
} from '@core/types/auth';

export const register = async (
  req: Request<never, never, IApiPostRegister>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    const apiKey = `sk-${uuidv4()}${uuidv4()}${uuidv4()}`;

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
  const { vendorId } = req.decoded;
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

export const resendEmailVerification = async (
  req: Request<never, never, IApiResendVerification>,
  res: Response,
) => {
  const { email } = req.body;
  const v = await findVendorByEmail(email);
  if (!v) return res.status(404).json({ error: 'Vendor not found' });
  if (v.isVerified)
    return res.status(400).json({ error: 'Vendor is already verified' });

  const isSent = await sendVerificationEmailHelper(email, v._id.toString());
  if (!isSent) return res.status(500).json({ error: 'Unable to send email' });
  return res.status(204).end();
};

export const login = async (
  req: Request<never, never, IApiPostLogin>,
  res: Response,
) => {
  const { email, password } = req.body;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

  const isCorrectPassword = await comparePasswords(
    password,
    vendor.password || '',
  );
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
