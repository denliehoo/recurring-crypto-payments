import { connectWallet, handleApiError } from '@core/utils';
import { useState, useRef, useEffect } from 'react';
import RecurringPaymentsVendor from '../../../truffle_abis/RecurringPaymentsVendor.json';
import { Vendor } from '@core/types';
import { apiRequestPayout } from '@dashboard/api/payouts/request-payout';
import Web3 from 'web3';

export const useRequestPayoutModal = (vendor: Vendor, owner: string) => {
  const steps = ['Connect Wallet', 'Check Address', 'Request Payout'];

  const [stepsText, setStepsText] = useState([
    `To start, please connect your wallet with the wallet address ${owner}`,
    'You have connected to the correct wallet address',
    'Please Confirm Payout',
  ]);
  const stepsButtonText = ['Connect Wallet', 'Continue', 'Confirm'];
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [address, setAddress] = useState('');
  const activeStepRef = useRef(activeStep); // Create a mutable reference to activeStep

  const handleNext = async () => {
    // connect wallet
    if (activeStep === 0) {
      setButtonLoading(true);
      const w3 = await connectWallet();
      setWeb3(w3);
      if (!w3) {
        setButtonLoading(false);
        return;
      }
      const accounts = await w3.eth.getAccounts();
      setAddress(accounts[0]);

      const abi: any = RecurringPaymentsVendor.abi;
      const instance: any = new w3.eth.Contract(abi, vendor.vendorContract);
      setContract(instance);
      //   let userBalance = await usdt.methods.balanceOf(accounts[0]).call();
      //   userBalance = parseInt(userBalance);
      //   let userAllowance = await usdt.methods
      //     .allowance(accounts[0], vendor.vendorContract)
      //     .call();
      //   userAllowance = parseInt(userAllowance);

      setButtonLoading(false);
      if (owner !== accounts[0]) {
        const temp = [...stepsText];
        temp[1] = `You are connected to the wrong wallet address (${accounts[0]}). Please connect with ${owner} instead.`;
        setStepsText(temp);
        setButtonDisabled(true);
      }
    }
    // check the address
    if (activeStep === 1) {
      // just continue
    }
    // confirm payout
    if (activeStep === 2) {
      // confirm ...
      setButtonLoading(true);
      try {
        const withdraw = await contract.methods
          .withdraw()
          .send({ from: address })
          .on('transactionHash', (hash: any) => {
            console.log(hash);
          });

        const bodyData = {
          amount: parseInt(withdraw.events.VendorWithdraw.returnValues.amount), // parseInt first
          tokenAddress: vendor.tokenAddress || '',
          userAddress: address,
          token: 'USDT', // hard code to USDT for now
          hash: withdraw.transactionHash,
        };
        await apiRequestPayout(vendor._id.toString(), bodyData);

        setButtonLoading(false);
      } catch (err) {
        handleApiError(err);
        setButtonLoading(false);
      }
    }

    activeStepRef.current = activeStep + 1;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleAccountsChanged = async (accounts: string[]) => {
    if (activeStepRef.current === 0) return;
    setAddress(accounts[0]);
    if (accounts[0].toLowerCase() === owner.toLowerCase()) {
      setButtonDisabled(false);
      const temp = [...stepsText];
      temp[1] = `You have connected to the correct wallet address (${accounts[0]}).`;
      setStepsText(temp);
    } else {
      setButtonDisabled(true);
      const temp = [...stepsText];
      temp[1] = `You are connected to the wrong wallet address (${accounts[0]}). Please connect with ${owner} instead.`;
      setStepsText(temp);
    }
  };

  useEffect(() => {
    // Add event listener for account changes when the component mounts
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    address,
    steps,
    activeStep,
    stepsText,
    stepsButtonText,
    handleNext,
    buttonDisabled,
    buttonLoading,
  };
};
