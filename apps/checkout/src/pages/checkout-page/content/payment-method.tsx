import TextWithTooltip from '@components/text-tooltip';
import { CheckCircle, Cancel } from '@mui/icons-material';
import {
  Typography,
  Divider,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AvatarGroup,
  Avatar,
  Button,
} from '@mui/material';
import { VendorClientSubscriptionDetails } from 'core';
import ETHLogo from '../../../assets/images/ETHLogo.png';
import USDTLogo from '../../../assets/images/USDTLogo.png';
import { FC } from 'react';

interface IPaymentMethod {
  details: VendorClientSubscriptionDetails | null;
  setConfigurePlanModal: (value: boolean) => void;
  setAddAllowanceModal: (value: boolean) => void;
}

const PaymentMethod: FC<IPaymentMethod> = ({
  details,
  setAddAllowanceModal,
  setConfigurePlanModal,
}) => {
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        Payment method
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        {details?.paymentMethod?.wallet ? (
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Allowance</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup>
                    <Avatar src={USDTLogo} />
                    <Avatar src={ETHLogo} />
                  </AvatarGroup>
                  <span style={{ marginLeft: '10px' }}>
                    {details!.paymentMethod!.token} (ERC20)
                  </span>
                </TableCell>
                <TableCell>
                  <TextWithTooltip text={details!.paymentMethod!.wallet} shortened={true} />
                </TableCell>
                <TableCell>
                  {details!.paymentMethod!.sufficientAllowance ? <CheckCircle /> : <Cancel />}
                </TableCell>
                <TableCell>
                  {details!.paymentMethod!.sufficientBalance ? <CheckCircle /> : <Cancel />}
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        ) : (
          <Box>You have no payment methods</Box>
        )}
        {details!.status !== 'inactive' && (
          <Box>
            <Button variant="contained" onClick={() => setConfigurePlanModal(true)}>
              Change Method
            </Button>

            <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setAddAllowanceModal(true)}>
              Change Allowance
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PaymentMethod;
