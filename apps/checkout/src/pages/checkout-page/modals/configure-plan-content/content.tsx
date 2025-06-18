import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import CustomButton from '@components/button';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import type { FC } from 'react';
import { useConfigurePlanContent } from './hooks';

const ConfigurePlanModalContent: FC = () => {
  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);
  const setModal = useCheckoutModal((state) => state.setModal);

  const {
    steps,
    handleNext,
    activeStep,
    stepsText,
    nameInput,
    handleNameChange,
    emailInput,
    handleEmailChange,
    addressInput,
    handleAddressChange,
    inputError,
    buttonLoading,
    buttonDisabled,
    stepsButtonText,
    status,
  } = useConfigurePlanContent();

  if (activeStep === steps.length) {
    return (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          {status !== 'active'
            ? 'You have successfully subscribed!'
            : 'You have successfully changed your payment wallet!'}
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
      </>
    );
  }

  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>{stepsText[activeStep]}</Typography>
      {activeStep === 3 && status === 'inactive' && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              fullWidth
              value={nameInput}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              value={emailInput}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Address"
              variant="outlined"
              fullWidth
              value={addressInput}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            {inputError && <span>{inputError}</span>}
          </Grid>
        </Grid>
      )}
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

export default ConfigurePlanModalContent;
