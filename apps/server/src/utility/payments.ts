import models from '../models';
import type { ICompletedPayment } from '../models/completedPayment';
import type { IScheduledPayment } from '../models/scheduledPayment';

const { ScheduledPayment, CompletedPayment } = models;
export const findScheduledPayment = async (
  vendorId: string,
  vendorClientId: string,
): Promise<IScheduledPayment | null> => {
  try {
    // Find the scheduled payment with matching vendorId and vendorClientId
    const scheduledPayment = await ScheduledPayment.findOne({
      vendorId,
      vendorClientId,
    });

    // Return the scheduled payment or null if not found
    return scheduledPayment;
  } catch (error) {
    console.error('Error finding scheduled payment:', error);

    // Return null if there was an error
    return null;
  }
};

export const addScheduledPayment = async (
  scheduledPayment: IScheduledPayment,
): Promise<boolean> => {
  try {
    await scheduledPayment.save();

    return true;
  } catch (error) {
    console.error('Error adding scheduled payment:', error);

    return false;
  }
};

export const deleteScheduledPayment = async (
  scheduledPayment: IScheduledPayment,
): Promise<boolean> => {
  try {
    await scheduledPayment.deleteOne();

    return true;
  } catch (error) {
    console.error('Error deleting scheduled payment:', error);

    return false;
  }
};

// generally only used for changing payment method, hence just change userAddress
export const updateScheduledPayment = async (
  scheduledPayment: IScheduledPayment,
  userAddress: string,
): Promise<boolean> => {
  try {
    // Update the userAddress field
    scheduledPayment.userAddress = userAddress;

    await scheduledPayment.save();

    return true;
  } catch (error) {
    console.error('Error updating scheduled payment:', error);

    return false;
  }
};

export const addCompletedPayment = async (
  completedPayment: ICompletedPayment,
): Promise<boolean> => {
  try {
    await completedPayment.save();

    return true;
  } catch (error) {
    console.error('Error adding completed payment:', error);

    return false;
  }
};
