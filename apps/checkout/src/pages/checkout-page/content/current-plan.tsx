import { Typography, Divider, Box, Button } from '@mui/material';
import { capitalizeFirstLetter, formatDate, VendorClientSubscriptionDetails } from 'core';

import { FC } from 'react';

interface ICurrentPlan {
  details: VendorClientSubscriptionDetails;
  setConfigurePlanModal: (value: boolean) => void;
  setCancelPlanModal: (value: boolean) => void;
}

const CurrentPlan: FC<ICurrentPlan> = ({ details, setConfigurePlanModal, setCancelPlanModal }) => {
  const textBasedOnStatus = (
    active: string,
    inactive: string,
    cancelled: string,
    ended: string
  ) => {
    const status = details!.status;
    if (status === 'active') return active;
    if (status === 'inactive') return inactive;
    if (status === 'cancelled') return cancelled;
    return ended;
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Current Plan
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            backgroundColor: details!.status === 'active' ? '#d7f7c2' : '#e3e8ed',
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: '5px',
          }}
        >
          {capitalizeFirstLetter(details!.status)}
        </Box>
        <Box>{details!.plan}</Box>
        <Box>
          {details!.amount / 10 ** 6} {details!.token} per month
        </Box>
        <Box>
          {textBasedOnStatus(
            `Your plan will auto renew on ${formatDate(details!.nextDate!)}`,
            '',
            `Your plan has been cancelled and will stop on ${formatDate(details!.nextDate!)}
                  `,
            `Your plan has been ended since ${formatDate(details!.nextDate!)}
                  `
          )}
        </Box>
        <Button
          variant="contained"
          onClick={() =>
            // if active, cancel plan modal, if inactive/cancelled, configure plan
            details!.status === 'active' ? setCancelPlanModal(true) : setConfigurePlanModal(true)
          }
        >
          {textBasedOnStatus('Cancel ', 'Start ', 'Renew ', 'Renew ')}
          Plan
        </Button>
      </Box>
    </>
  );
};

export default CurrentPlan;
