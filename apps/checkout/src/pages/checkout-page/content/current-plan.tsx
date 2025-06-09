import { ECheckoutModal, useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import { Typography, Divider, Box, Button } from '@mui/material';
import { capitalizeFirstLetter, formatDate } from '@core/utils';

import { FC } from 'react';

const CurrentPlan: FC = () => {
  const details = useSubcriptionDetail((state) => state.details);
  const setModal = useCheckoutModal((state) => state.setModal);
  const { status = 'inactive', nextDate, amount = 0, plan, token } = details || {};

  const textBasedOnStatus = (
    active: string,
    inactive: string,
    cancelled: string,
    ended: string
  ) => {
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
            backgroundColor: status === 'active' ? '#d7f7c2' : '#e3e8ed',
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: '5px',
          }}
        >
          {capitalizeFirstLetter(status)}
        </Box>
        <Box>{plan}</Box>
        <Box>
          {amount / 10 ** 6} {token} per month
        </Box>
        <Box>
          {textBasedOnStatus(
            `Your plan will auto renew on ${formatDate(nextDate)}`,
            '',
            `Your plan has been cancelled and will stop on ${formatDate(nextDate)}
                  `,
            `Your plan has been ended since ${formatDate(nextDate)}
                  `
          )}
        </Box>
        <Button
          variant="contained"
          onClick={() =>
            // if active, cancel plan modal, if inactive/cancelled, configure plan
            setModal(
              details!.status === 'active'
                ? ECheckoutModal.CANCEL_PLAN
                : ECheckoutModal.CONFIGURE_PLAN
            )
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
