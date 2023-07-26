import { Request, Response } from "express";
import Vendor, { IVendor } from "../models/vendor";
import { v4 as uuidv4 } from "uuid";
import {
  comparePasswords,
  hashPassword,
  validatePasswordStrength,
} from "../utility/credentials";
import { findVendorByEmail, findVendorById } from "../utility/findFromDb";
import { CustomRequest } from "../types/requests";
const jwt = require("jsonwebtoken");

export const createVendor = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = "sk-" + uuidv4() + uuidv4() + uuidv4();

    if (!email || !password)
      return res.status(400).json({ error: "Cannot be empty" });

    const isValidPassword = validatePasswordStrength(password);
    if (!isValidPassword)
      return res.status(400).json({
        error:
          "Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character",
      });

    const hashedPassword = await hashPassword(password);

    // Create the vendor in the database
    const vendor: IVendor = await Vendor.create({
      name,
      email,
      apiKey,
      password: hashedPassword,
    });

    res.status(201).json(vendor);
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Failed to create vendor" });
  }
};

export const getVendors = async (req: Request, res: Response) => {
  try {
    // Retrieve all vendors from the database
    const vendors: IVendor[] = await Vendor.find();

    res.json(vendors);
  } catch (error) {
    console.error("Error retrieving vendors:", error);
    res.status(500).json({ error: "Failed to retrieve vendors" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });

  const isCorrectPassword = await comparePasswords(password, vendor.password); // true or false
  if (!isCorrectPassword)
    return res.status(400).json({ error: "Incorrect Password" });

  const token = generateJWT(email);
  return res.send({ token: token });
};

export const getVendorByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });
  return res.send(vendor);
};
export const getVendorById = async (req: Request, res: Response) => {
  const { id } = req.body;
  const vendor = await findVendorById(id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });
  return res.send(vendor);
};

export const updateVendor = async (req: Request, res: Response) => {
  const { id } = req.body;
  //
  try {
    const { webhookUrl, tokenAddress, amount, vendorContract, plan, id } =
      req.body;
    let vendor = await findVendorById(id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    if (!webhookUrl || !tokenAddress || !amount || !vendorContract || !plan)
      return res.status(400).json({ error: "Cannot be empty" });

    vendor.webhookUrl = webhookUrl;
    vendor.tokenAddress = tokenAddress;
    vendor.amount = amount;
    vendor.vendorContract = vendorContract;
    vendor.plan = plan;

    vendor = await vendor.save();

    return res.send(vendor);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update vendor" });
  }
};

export const getVendorByToken = async (req: CustomRequest, res: Response) => {
  const { email } = req.decoded;
  const vendor = await findVendorByEmail(email);
  if (!vendor) return res.status(404).json({ error: "Vendor Not Found" });
  return res.send(vendor);
};

const generateJWT = (email: string) => {
  // Set the expiration time for the JWT token (e.g., 1 hour from now)
  // if want to change the time, change the 3600 (which is 60s * 60 min = 3600s = 1 hr)
  // const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour (in seconds)

  const token = jwt.sign(
    { email: email, exp: expirationTime },
    process.env.JWT_KEY
  );
  return token;
};
