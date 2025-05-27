import { Typography, Divider, Box, Button } from '@mui/material';
import { VendorClientSubscriptionDetails } from 'core';
import { FC } from 'react';

interface IBillingInfo {
  details: VendorClientSubscriptionDetails | null;
  setUpdateBillingInfoModal: (value: boolean) => void;
}

const BillingInfo: FC<IBillingInfo> = ({ details, setUpdateBillingInfoModal }) => {
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        Billing Information
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        {details!.status !== 'inactive' ? (
          <Box>
            <Box>Name: {details!.billingInfo!.name}</Box>
            <Box>Billing Address: {details!.billingInfo!.address}</Box>
            <Button variant="contained" onClick={() => setUpdateBillingInfoModal(true)}>
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
