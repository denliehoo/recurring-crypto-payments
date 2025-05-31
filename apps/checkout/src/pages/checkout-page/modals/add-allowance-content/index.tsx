import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { FC } from 'react';
import CustomButton from '@components/button';
import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import { useAddAllowanceContent } from './hooks';

const AddAllowanceContent: FC = () => {
  const setModal = useCheckoutModal((state) => state.setModal);
  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);

  const {
    handleNext,
    address,
    activeStep,
    steps,
    newAllowance,
    stepsText,
    stepsButtonText,
    buttonLoading,
  } = useAddAllowanceContent();
  return (
    <>
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
        <span>Add Allowance</span>
        {address && (
          <span>{`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}</span>
        )}
      </Typography>
      {/* Steps for start plan */}
      <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* Stepper info text */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`You have successfully changed set the allowance to ${newAllowance} USDT`}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              onClick={() => {
                setRefreshData();
                setModal(undefined);
              }}
            >
              Close
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{stepsText[activeStep]}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <CustomButton
              text={stepsButtonText[activeStep]}
              onClick={handleNext}
              loading={buttonLoading}
            />
          </Box>
        </React.Fragment>
      )}
    </>
  );
};

export default AddAllowanceContent;
