import { type FC, useState } from 'react';

import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import React from 'react';
import { connectWallet } from '@core/utils/wallet';
import RecurringPayments from '../../../truffle_abis/RecurringPayments.json';
import IntegrationFormFields from './integration-form-fields';
import { addVendorDetails } from '../../../slices/vendorDetailsSlice';
import CustomButton from '@components/button';
import { validateForm } from '@core/utils/form';
import { useAppDispatch } from '@dashboard/store';
import type { IVendorDetails } from './edit-configurations-modal';
import {
  apiUpdateConfigurations,
  type IUpdateConfigurations,
} from '@dashboard/api/vendor/update-configurations';

interface ConfigureIntegrationsProps {
  vendorId: string;
  refreshData: () => void;
}

const ConfigureIntegrations: FC<ConfigureIntegrationsProps> = ({
  vendorId,
  refreshData,
}) => {
  const [vendorDetails, setVendorDetails] = useState<
    IVendorDetails | undefined
  >(undefined);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  // TODO: Typing for contracts
  const [contract, setContract] = useState<any>(null);
  const [addressError, setAddressError] = useState(false);
  const dispatch = useAppDispatch();

  const fieldsTypes = {
    monthlySubscriptionPrice: 'number',
    businessName: 'text',
    webhookUrl: 'text',
    returnUrl: 'text',
    planName: 'text',
  };

  const steps = ['Connect Wallet', 'Fill Details', 'Create Contract'];
  const stepsText = [
    'To start, please connect your wallet on the Sepolia Chain.',
    'Please fill in the relevant details below',
    `Please confirm by signing the smart contract. Subsequently, you may withdraw payments from the smart contract. Please ensure to keep your wallet safely because only your connected wallet address ${walletAddress} may withdraw profits`,
  ];
  const stepsButtonText = ['Connect', 'Next', 'Create'];

  // TODO: Ensure user is on correct chain
  const handleNext = async () => {
    // connect wallet
    if (activeStep === 0) {
      setButtonLoading(true);
      const w3 = await connectWallet();
      if (!w3) {
        setButtonLoading(false);
        return;
      }
      const accounts = await w3.eth.getAccounts();
      setWalletAddress(accounts[0]);

      const abi: any = RecurringPayments.abi;
      const master: any = new w3.eth.Contract(
        abi,
        '0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7',
      );
      setContract(master);
      setButtonLoading(false);
    }
    // confirm fill details
    if (activeStep === 1) {
      if (
        !validateForm(vendorDetails, fieldsTypes, setValidationErrors) ||
        vendorDetails?.tokenAddress
      ) {
        if (vendorDetails?.tokenAddress) {
          setAddressError(true);
        }
        return;
      }
    }

    // create contract
    if (activeStep === 2) {
      setButtonLoading(true);
      if (!vendorDetails) {
        return;
      }
      try {
        // create the contract
        const createContract = await contract.methods
          .createVendorContract(vendorDetails?.tokenAddress)
          .send({ from: walletAddress })
          .on('transactionHash', (hash: any) => {
            console.log(hash);
          });

        const vendorContractCreated =
          createContract.events.VendorContractCreated.returnValues
            .contractAddress;
        // update the vendor entity
        const bodyData: IUpdateConfigurations = {
          name: vendorDetails.businessName || '',
          webhookUrl: vendorDetails.webhookUrl || '',
          returnUrl: vendorDetails.returnUrl || '',
          tokenAddress: vendorDetails.tokenAddress || '',
          amount: Math.ceil(
            Number.parseFloat(String(vendorDetails?.monthlySubscriptionPrice)) *
              10 ** 6,
          ),
          plan: vendorDetails.planName || '',
          vendorContract: vendorContractCreated,
          id: vendorId,
        };
        await apiUpdateConfigurations(bodyData);

        dispatch(
          addVendorDetails({
            vendorContract: vendorContractCreated,
            tokenAddress: vendorDetails.tokenAddress,
            id: vendorId,
          }),
        );
        setButtonLoading(false);
      } catch {
        setButtonLoading(false);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          '& > :first-of-type': {
            marginRight: 'auto',
          },
        }}
      >
        <span>Configure Integrations</span>
        {walletAddress && (
          <span>{`${walletAddress.substring(0, 4)}...${walletAddress.substring(
            walletAddress.length - 4,
          )}`}</span>
        )}
      </Typography>

      {/* Steps */}
      <Box sx={{ width: '100%', mt: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
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
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              You have successfully created your smart contract.
            </Typography>
            <Button variant="contained" fullWidth onClick={refreshData}>
              Proceed
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {stepsText[activeStep]}
            </Typography>
            {/* form fields for fill details step */}
            {activeStep === 1 && (
              <IntegrationFormFields
                vendorDetails={vendorDetails}
                setVendorDetails={setVendorDetails}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                fieldsTypes={fieldsTypes}
                addressError={addressError}
                setAddressError={setAddressError}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <CustomButton
                loading={buttonLoading}
                onClick={handleNext}
                variant="contained"
                fullWidth
                text={stepsButtonText[activeStep]}
              />
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ConfigureIntegrations;
