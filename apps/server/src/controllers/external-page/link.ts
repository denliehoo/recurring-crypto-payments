import type { Request, Response } from 'express';
import { findVendorById, findVendorClientById } from '../../utility/findFromDb';

import { generateJWT } from '../../utility/generateJWT';

// import sendWebHook from "../utility/sendWebhook";

export const getSubscriptionPageLink = async (req: Request, res: Response) => {
  // for testing
  // const vendor = await Vendor.find();
  // const vendorClient = await VendorClient.find();
  // const data = {
  //   vendor: vendor[0]._id.toString(),
  //   vendorClient: vendorClient[0]._id.toString(),
  // };

  // for prod
  const auth = req.headers.authorization;

  const { vendor, vendorClient } = req.body;
  if (!vendor || !vendorClient)
    return res
      .status(401)
      .json({ error: 'Please ensure to provide vendor and vendorClient' });

  const v = await findVendorById(vendor);
  const c = await findVendorClientById(vendorClient);
  if (!v || !c)
    return res
      .status(404)
      .json({ error: 'Error, vendor or vendorClient not found' });

  if (auth !== v.apiKey)
    return res.status(401).json({ error: 'Incorrect API Key' });

  const data = { vendor: vendor, vendorClient: vendorClient };
  // ----

  const token = generateJWT(data, 86400);
  const encodedToken = token.replace(/\./g, '~');
  const baseUrl = process.env.FRONT_END_CHECKOUT_URL; // change this to actual frontend in future
  return res.send({
    url: `${baseUrl}?authToken=${encodedToken}`,
  });
};
