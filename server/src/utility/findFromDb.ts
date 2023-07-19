import models from "../models";
const { Vendor, VendorClient } = models;

const findVendorByEmail = async (email: string) => {
  try {
    const vendor = await Vendor.find({ email: email });
    return vendor[0];
  } catch {
    return null;
  }
};

const findVendorById = async (id: string) => {
  try {
    const vendor = await Vendor.findById(id);
    return vendor;
  } catch {
    return null;
  }
};

const findVendorClientById = async (id: string) => {
  try {
    const vendorClient = await VendorClient.findById(id);
    return vendorClient;
  } catch {
    return null;
  }
};

export { findVendorByEmail, findVendorById , findVendorClientById};
