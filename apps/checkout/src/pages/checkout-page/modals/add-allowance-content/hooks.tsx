import { useSubcriptionDetail } from '@checkout/store';
import { connectWallet } from '@core/utils';
import { useState } from 'react';
import { FakeUSDT as USDTABI } from '@core/abi/FakeUSDT';
import type Web3 from 'web3';

export const useAddAllowanceContent = () => {
  const details = useSubcriptionDetail((state) => state.details);

  const {
    tokenAddress,
    amount = 0,
    vendorContract,
    paymentMethod,
  } = details || {};

  const { wallet: currentWallet = '' } = paymentMethod || {};

  const steps = ['Connect Wallet', 'Add Allowance'];
  const minAmountText = amount / 10 ** 6;
  const [stepsText, setStepsText] = useState([
    `Your current payment wallet is ${currentWallet}. To add allowance, please connect to the same wallet address`,

    `Please click on the button to add allowance. It is recommended to set an allowance of at least ${minAmountText} USDT to proceed. It is advised to give an allowance of at least ${
      minAmountText * 12
    } to ensure a smooth subscription`,
  ]);
  const [stepsButtonText, setStepsButtonText] = useState([
    'Connect Wallet',
    'Add Allowance',
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [newAllowance, setNewAllowance] = useState(0);

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

      if (accounts[0].toLowerCase() !== currentWallet.toLowerCase()) {
        const temp = [...stepsText];
        temp[0] = `You are connected to the wallet address: ${accounts[0]}. To add allowance, 
        please connect to ${currentWallet} instead`;
        setStepsText(temp);
        setButtonLoading(false);
        return;
      }

      const abi: any = USDTABI.abi;
      const usdt: any = new w3.eth.Contract(abi, tokenAddress);
      setContract(usdt);

      const tempStepsText = [...stepsText];

      setButtonLoading(false);
      setStepsText(tempStepsText);
    }
    // Add allowance
    if (activeStep === 1) {
      setButtonLoading(true);
      try {
        const approveToken = await contract.methods
          .approve(vendorContract, '1000000000000000')
          .send({ from: address })
          .on('transactionHash', (hash: any) => {
            console.log(hash);
          });

        const newAllowance = approveToken.events.Approval.returnValues.value;
        setNewAllowance(Number.parseInt(newAllowance) / 10 ** 6);
      } catch (err) {
        console.log(err);
        setButtonLoading(false);
        return;
      }

      setButtonLoading(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return {
    handleNext,
    address,
    activeStep,
    steps,
    newAllowance,
    stepsText,
    stepsButtonText,
    buttonLoading,
  };
};
