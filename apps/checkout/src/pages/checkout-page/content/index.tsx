import TextWithTooltip from '@components/text-tooltip';
import { CheckCircle, Cancel, TagRounded } from '@mui/icons-material';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AvatarGroup,
  Avatar,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { capitalizeFirstLetter, formatDate, VendorClientSubscriptionDetails } from 'core';
import { FC } from 'react';

import CurrentPlan from './current-plan';
import PaymentMethod from './payment-method';
import BillingInfo from './billing-info';
import InvoiceHistory from './invoice-history';

interface IContentProps {
  details: VendorClientSubscriptionDetails;
  setConfigurePlanModal: (value: boolean) => void;
  setCancelPlanModal: (value: boolean) => void;
  setUpdateBillingInfoModal: (value: boolean) => void;
  setAddAllowanceModal: (value: boolean) => void;
}

const Content: FC<IContentProps> = ({
  details,

  setConfigurePlanModal,
  setCancelPlanModal,
  setAddAllowanceModal,
  setUpdateBillingInfoModal,
}) => {
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
        <CurrentPlan
          details={details}
          setConfigurePlanModal={setConfigurePlanModal}
          setCancelPlanModal={setCancelPlanModal}
        />

        <PaymentMethod
          details={details}
          setAddAllowanceModal={setAddAllowanceModal}
          setConfigurePlanModal={setConfigurePlanModal}
        />

        <BillingInfo details={details} setUpdateBillingInfoModal={setUpdateBillingInfoModal} />

        <InvoiceHistory details={details} />
      </Box>
    </Grid>
  );
};

export default Content;
