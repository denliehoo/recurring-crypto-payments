import type { FC } from 'react';
import { lazy, Suspense } from 'react';

import { ECheckoutModal, useCheckoutModal } from '@checkout/store';
import CustomModal from '@components/modal';

import LoadingOverlay from '@components/loading-overlay';

const AddAllowanceContent = lazy(
  () =>
    import(
      /* webpackChunkName: "modal-add-allowance" */ './add-allowance-content'
    ),
);
const CancelPlanContent = lazy(
  () =>
    import(/* webpackChunkName: "modal-cancel-plan" */ './cancel-plan-content'),
);
const ConfigurePlanContent = lazy(
  () =>
    import(
      /* webpackChunkName: "modal-configure-plan" */ './configure-plan-content'
    ),
);
const UpdateBillingInfoContent = lazy(
  () =>
    import(
      /* webpackChunkName: "modal-update-billing" */ './update-billing-info-content'
    ),
);

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
        return null;
    }
  };

  if (!modal) {
    return null;
  }

  return (
    <CustomModal open={!!modal} onClose={() => setModal(undefined)}>
      <Suspense fallback={<LoadingOverlay isLoading />}>
        {getModalContent()}
      </Suspense>
    </CustomModal>
  );
};

export default Modals;
