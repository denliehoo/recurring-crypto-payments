import { FC } from 'react';
import AddAllowanceContent from './add-allowance-content';
import CancelPlanContent from './cancel-plan-content';
import ConfigurePlanContent from './configure-plan-content';
import UpdateBillingInfoContent from './update-billing-info-content';
import { ECheckoutModal, useCheckoutModal } from '@checkout/store';
import CustomModal from '@components/modal';

const Modals: FC = () => {
  const modal = useCheckoutModal((state) => state.modal);
  const setModal = useCheckoutModal((state) => state.setModal);

  const getModalContent = () => {
    switch (modal) {
      case ECheckoutModal.ADD_ALLOWANCE:
        return <AddAllowanceContent />;
      case ECheckoutModal.CANCEL_PLAN:
        return <CancelPlanContent />;
      case ECheckoutModal.CONFIGURE_PLAN:
        return <ConfigurePlanContent />;
      case ECheckoutModal.UPDATE_BILLING:
        return <UpdateBillingInfoContent />;
      default:
        return;
    }
  };

  if (!modal) {
    return;
  }
  return (
    <CustomModal open={!!modal} onClose={() => setModal(undefined)}>
      {getModalContent()}
    </CustomModal>
  );
};

export default Modals;
