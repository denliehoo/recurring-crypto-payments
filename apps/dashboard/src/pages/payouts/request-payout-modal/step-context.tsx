import CustomButton from '@components/button';
import { Typography, Box, Button } from '@mui/material';
import type { FC } from 'react';

interface IRequestPayoutModalStepperContent {
  activeStep: number;
  steps: string[];
  closeRequestPayoutModal: () => void;
  refreshData: () => void;
  stepsText: string[];
  stepsButtonText: string[];
  handleNext: () => void;
  buttonLoading: boolean;
  buttonDisabled: boolean;
}

export const RequestPayoutModalStepperContent: FC<
  IRequestPayoutModalStepperContent
> = ({
  activeStep,
  steps,
  closeRequestPayoutModal,
  refreshData,
  stepsText,
  stepsButtonText,
  handleNext,
  buttonLoading,
  buttonDisabled,
}) => {
  if (activeStep === steps.length) {
    return (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          Your payout has been processed
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            onClick={() => {
              closeRequestPayoutModal();
              refreshData();
            }}
          >
            Close
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>{stepsText[activeStep]}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <CustomButton
          text={stepsButtonText[activeStep]}
          onClick={handleNext}
          loading={buttonLoading}
          disabled={buttonDisabled}
        />
      </Box>
    </>
  );
};

export default RequestPayoutModalStepperContent;
