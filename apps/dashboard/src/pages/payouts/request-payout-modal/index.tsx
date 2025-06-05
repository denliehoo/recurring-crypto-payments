import { Typography } from '@mui/material';
import { FC } from 'react';
import CustomModal from '@components/modal';
import { useRequestPayoutModal } from './hooks';
import { Vendor } from '@core/types';
import RequestPayoutModalStepper from './stepper';
import RequestPayoutModalStepperContent from './step-context';

interface IRequestPayoutModal {
  requestPayoutModal: boolean;
  closeRequestPayoutModal: () => void;
  vendor: Vendor;
  owner: string;
  refreshData: () => void;
}

const RequestPayoutModal: FC<IRequestPayoutModal> = ({
  requestPayoutModal,
  closeRequestPayoutModal,
  vendor,
  owner,
  refreshData,
}) => {
  const {
    address,
    steps,
    activeStep,
    stepsText,
    stepsButtonText,
    handleNext,
    buttonDisabled,
    buttonLoading,
  } = useRequestPayoutModal(vendor, owner);

  return (
    <CustomModal open={requestPayoutModal} onClose={closeRequestPayoutModal}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          '& > :first-of-type': {
            marginRight: 'auto',
          },
        }}
      >
        <span>Start plan</span>
        <span>{`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}</span>
      </Typography>
      <RequestPayoutModalStepper activeStep={activeStep} steps={steps} />
      <RequestPayoutModalStepperContent
        activeStep={activeStep}
        steps={steps}
        closeRequestPayoutModal={closeRequestPayoutModal}
        refreshData={refreshData}
        stepsText={stepsText}
        stepsButtonText={stepsButtonText}
        handleNext={handleNext}
        buttonLoading={buttonLoading}
        buttonDisabled={buttonDisabled}
      />
    </CustomModal>
  );
};

export default RequestPayoutModal;
