import {
  ECheckoutModal,
  useCheckoutModal,
  useSubcriptionDetail,
} from '@checkout/store';
import { Typography, Divider, Box, Button } from '@mui/material';
import type { FC } from 'react';

const BillingInfo: FC = () => {
  const details = useSubcriptionDetail((state) => state.details);
  const setModal = useCheckoutModal((state) => state.setModal);
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        Billing Information
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        {details?.status !== 'inactive' ? (
          <Box>
            <Box>Name: {details?.billingInfo?.name}</Box>
            <Box>Billing Address: {details?.billingInfo?.address}</Box>
            <Button
              variant="contained"
              onClick={() => setModal(ECheckoutModal.UPDATE_BILLING)}
            >
              Update
            </Button>
          </Box>
        ) : (
          <Box>You have no billing details</Box>
        )}
      </Box>
    </>
  );
};

export default BillingInfo;
