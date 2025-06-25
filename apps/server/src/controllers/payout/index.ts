import models from '@src/models';
import { IPayout } from '@src/models/payout';
import { CustomRequest } from '@src/types/requests';
import { findVendorByEmail } from '@src/utility/findFromDb';
import Web3 from 'web3';
import type { Response } from 'express';
import RecurringPaymentsVendor from '../../contractABIs/RecurringPayments.json';

const { Payout } = models;

export const getPayoutsDetails = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const { email } = decoded;
  try {
    const vendor = await findVendorByEmail(email);
    if (!vendor) return res.status(404).json({ error: "Vendor doesn't exist" });

    const payouts: IPayout[] = await Payout.find({
      vendorId: vendor._id.toString(),
    });

    const web3 = new Web3(process.env.WEB3_PROVIDER || '');
    const contract = new web3.eth.Contract(
      // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
      RecurringPaymentsVendor.abi as any,
      vendor.vendorContract,
    );

    const owner: string = await contract.methods.owner().call();
    const balance = await contract.methods.balance().call();

    return res.send({
      payouts: payouts,
      vendor: vendor,
      pendingBalance: balance,
      owner: owner,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get payouts.', error });
  }
};

export const createPayout = async (req: CustomRequest, res: Response) => {
  const decoded = req.decoded;
  const { vendorId } = decoded;
  const { amount, tokenAddress, userAddress, token, hash } = req.body;

  try {
    const newPayout: IPayout = new Payout({
      payoutDate: new Date(),
      amount,
      tokenAddress,
      userAddress,
      token,
      hash,
      vendorId,
    });
    await newPayout.save();
    return res.send(newPayout);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create payout.', error });
  }
};
