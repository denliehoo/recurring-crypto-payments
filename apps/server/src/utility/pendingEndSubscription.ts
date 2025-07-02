import models from '../models';
import type { IPendingEndSubscription } from '../models/pendingEndSubscription';

const { PendingEndSubscription } = models;

export const findPendingEndSubscription = async (
  vendorId: string,
  vendorClientId: string,
): Promise<IPendingEndSubscription | null> => {
  try {
    // Find the pending end subscription with matching vendorId and vendorClientId
    const pendingEndSubscription = await PendingEndSubscription.findOne({
      vendorId,
      vendorClientId,
    });

    // Return the pending end subscription or null if not found
    return pendingEndSubscription;
  } catch (error) {
    console.error('Error finding pending end subscription:', error);

    // Return null if there was an error
    return null;
  }
};

export const addPendingEndSubscription = async (
  pendingEndSubscription: IPendingEndSubscription,
): Promise<boolean> => {
  try {
    await pendingEndSubscription.save();

    return true;
  } catch (error) {
    console.error('Error adding pending end subscription:', error);

    return false;
  }
};

export const deletePendingEndSubscription = async (
  pendingEndSubscription: IPendingEndSubscription,
): Promise<boolean> => {
  try {
    await pendingEndSubscription.deleteOne();

    return true;
  } catch (error) {
    console.error('Error deleting pending end subscription:', error);

    return false;
  }
};
