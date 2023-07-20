import { Request, Response } from "express";
import VendorClient, { IVendorClient } from "../models/vendorClient";
import { findVendorById } from "../utility/findFromDb";

// Create a VendorClient
export const createVendorClient = async (req: Request, res: Response) => {
  try {
    const { vendor } = req.body;
    const vendorExists = await findVendorById(vendor);
    if (!vendorExists)
      return res.status(404).json({ error: "Vendor not found" });

    const newVendorClient: IVendorClient = new VendorClient({
      vendor, // id of the vendor
    });
    const createdVendorClient: IVendorClient = await newVendorClient.save();
    return res.send(createdVendorClient);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create VendorClient" });
  }
};

// Get a VendorClient by ID
export const getVendorClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const vendorClient = await VendorClient.findById(id);
    if (vendorClient) {
      return res.send(vendorClient);
    } else {
      return res.status(404).json({ error: "VendorClient not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve VendorClient" });
  }
};

export const getVendorClientsByVendor = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const vendorClients = await VendorClient.find({ vendor: id });
    return res.send(vendorClients);
  } catch {
    return res
      .status(500)
      .json({ error: "Failed to fetch clients for the vendor" });
  }
};

export const getAllVendorClients = async (req: Request, res: Response) => {
  try {
    const vendorClients = await VendorClient.find().populate("vendor");
    return res.json(vendorClients);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch vendorClients" });
  }
};

// Update a VendorClient
export const updateVendorClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const {  billingInfo, paymentMethod, nextDate, status } = req.body;
    let vendorClient = await VendorClient.findById(id);
    if (!vendorClient)
      return res.status(404).json({ error: "Vendor Client not found" });
    // if (!name || !wallet || !email)
    //   return res.status(400).json({ error: "Cannot be empty" });

    vendorClient.billingInfo = billingInfo;
    vendorClient.paymentMethod = paymentMethod;
    vendorClient.nextDate = nextDate;
    vendorClient.status = status;

    vendorClient = await vendorClient.save();

    return res.send(vendorClient);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update VendorClient" });
  }
};

// Delete a VendorClient
export const deleteVendorClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await VendorClient.findByIdAndDelete(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete VendorClient" });
  }
};
