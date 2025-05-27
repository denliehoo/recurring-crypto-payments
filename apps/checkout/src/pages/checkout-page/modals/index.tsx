import { FC, useState } from 'react';
import AddAllowanceModal from './AddAllowanceModal';
import CancelPlanModal from './CancelPlanModal';
import ConfigurePlanModal from './ConfigurePlanModal';
import UpdateBillingInfoModal from './UpdateBillingInfoModal';
import { VendorClientSubscriptionDetails } from 'core';

interface IModalsProps {
  details: VendorClientSubscriptionDetails;
  refreshData: boolean;
  setRefreshData: (value: boolean) => void;
  authToken: string;
  configurePlanModal: boolean;
  setConfigurePlanModal: (value: boolean) => void;
  cancelPlanModal: boolean;
  setCancelPlanModal: (value: boolean) => void;
  updateBillingInfoModal: boolean;
  setUpdateBillingInfoModal: (value: boolean) => void;
  addAllowanceModal: boolean;
  setAddAllowanceModal: (value: boolean) => void;
}

const Modals: FC<IModalsProps> = ({
  details,
  refreshData,
  setRefreshData,
  authToken,
  configurePlanModal,
  setConfigurePlanModal,
  cancelPlanModal,
  setCancelPlanModal,
  updateBillingInfoModal,
  setUpdateBillingInfoModal,
  addAllowanceModal,
  setAddAllowanceModal,
}) => {
  return (
    <>
      {configurePlanModal && (
        <ConfigurePlanModal
          configurePlanModal={configurePlanModal}
          closeConfigurePlanModal={() => setConfigurePlanModal(false)}
          tokenAddress={details!.tokenAddress}
          token={details!.token}
          amount={details!.amount}
          vendorContract={details!.vendorContract}
          authToken={authToken}
          status={details!.status}
          currentWallet={details?.paymentMethod?.wallet}
          refreshData={() => setRefreshData(!refreshData)}
          nextDate={details?.nextDate}
        />
      )}
      {addAllowanceModal && (
        <AddAllowanceModal
          modalIsOpen={addAllowanceModal}
          closeModal={() => setAddAllowanceModal(false)}
          tokenAddress={details!.tokenAddress}
          token={details!.token}
          amount={details!.amount}
          vendorContract={details!.vendorContract}
          authToken={authToken}
          currentWallet={details?.paymentMethod?.wallet}
          refreshData={() => setRefreshData(!refreshData)}
        />
      )}
      {cancelPlanModal && (
        <CancelPlanModal
          cancelPlanModal={cancelPlanModal}
          closeCancelPlanModal={() => setCancelPlanModal(false)}
          refreshData={() => setRefreshData(!refreshData)}
          authToken={authToken}
        />
      )}
      {updateBillingInfoModal && (
        <UpdateBillingInfoModal
          modalIsOpen={updateBillingInfoModal}
          closeModal={() => setUpdateBillingInfoModal(false)}
          billingInfo={details?.billingInfo}
          authToken={authToken}
          refreshData={() => setRefreshData(!refreshData)}
        />
      )}
    </>
  );
};

export default Modals;
