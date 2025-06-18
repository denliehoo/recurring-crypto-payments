import { Grid, Paper, Box, useMediaQuery } from '@mui/material';
import type { FC } from 'react';

import CurrentPlan from './current-plan';
import PaymentMethod from './payment-method';
import BillingInfo from './billing-info';
import InvoiceHistory from './invoice-history';

const Content: FC = () => {
  const isSmOrUp = useMediaQuery('(min-width:600px)');

  return (
    <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          marginTop: isSmOrUp ? '30px' : '150px',
        }}
      >
        <CurrentPlan />
        <PaymentMethod />
        <BillingInfo />
        <InvoiceHistory />
      </Box>
    </Grid>
  );
};

export default Content;
