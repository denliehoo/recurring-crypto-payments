import { FC, useState } from 'react';
import Button from '@mui/material/Button';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Avatar,
  AvatarGroup,
  Divider,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';

import { TagRounded, CheckCircle, Cancel } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
// import {
//   activeSampleData,
//   cancelledSampleData,
//   inactiveSampleData,
// } from '@core/mock-data/CheckoutPageSampleDatas';

import ETHLogo from '../../assets/images/ETHLogo.png';
import USDTLogo from '../../assets/images/USDTLogo.png';

import { VendorClientSubscriptionDetails } from '@core/types';
import TextWithTooltip from '@components/text-tooltip';
import { capitalizeFirstLetter, formatDate } from '@core/utils/text';
import SideBar from './side-bar';
import Modals from './modals';
import Content from './content';

interface ICheckoutPageProps {
  details: VendorClientSubscriptionDetails;
  refreshData: boolean;
  setRefreshData: (value: boolean) => void;
  authToken: string;
}

const CheckoutPage: FC<ICheckoutPageProps> = ({
  details,
  refreshData,
  setRefreshData,
  authToken,
}) => {
  const isSmOrUp = useMediaQuery('(min-width:600px)');

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

  const [configurePlanModal, setConfigurePlanModal] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);
  const [updateBillingInfoModal, setUpdateBillingInfoModal] = useState(false);
  const [addAllowanceModal, setAddAllowanceModal] = useState(false);

  return (
    <>
      <SideBar details={details} />

      <Grid sm={4} md={4} />
      <Content
        details={details}
        setConfigurePlanModal={setConfigurePlanModal}
        setCancelPlanModal={setCancelPlanModal}
        setAddAllowanceModal={setAddAllowanceModal}
        setUpdateBillingInfoModal={setUpdateBillingInfoModal}
      />
      <Modals
        details={details}
        setRefreshData={setRefreshData}
        refreshData={refreshData}
        authToken={authToken}
        configurePlanModal={configurePlanModal}
        setConfigurePlanModal={setConfigurePlanModal}
        cancelPlanModal={cancelPlanModal}
        setCancelPlanModal={setCancelPlanModal}
        updateBillingInfoModal={updateBillingInfoModal}
        setUpdateBillingInfoModal={setUpdateBillingInfoModal}
        addAllowanceModal={addAllowanceModal}
        setAddAllowanceModal={setAddAllowanceModal}
      />
    </>
  );
};

export default CheckoutPage;
