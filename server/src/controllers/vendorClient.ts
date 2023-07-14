import { Request, Response } from "express";
import VendorClient, { IVendorClient } from "../models/vendorClient";

// Create a VendorClient
export const createVendorClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, wallet, email, vendor } = req.body;
    const newVendorClient: IVendorClient = new VendorClient({
      name,
      wallet,
      email,
      vendor, // id of the vendor 
    });
    const createdVendorClient: IVendorClient = await newVendorClient.save();
    res.status(201).json(createdVendorClient);
  } catch (error) {
    res.status(500).json({ error: "Failed to create VendorClient" });
  }
};

// Get a VendorClient by ID
export const getVendorClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.body
    const vendorClient: IVendorClient | null = await VendorClient.findById(id).populate("vendor");
    if (vendorClient) {
      res.json(vendorClient);
    } else {
      res.status(404).json({ error: "VendorClient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve VendorClient" });
  }
};

// Update a VendorClient
export const updateVendorClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, wallet, email, vendor, id } = req.body;
    const updatedVendorClient: IVendorClient | null = await VendorClient.findByIdAndUpdate(
      id,
      { name, wallet, email, vendor },
      { new: true }
    );
    if (updatedVendorClient) {
      res.json(updatedVendorClient);
    } else {
      res.status(404).json({ error: "VendorClient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update VendorClient" });
  }
};

// Delete a VendorClient
export const deleteVendorClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.body
    await VendorClient.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete VendorClient" });
  }
};
