// import classes from "./AddAllowanceModal.module.css";

import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { connectWallet } from "../../utils/connectWallet";
import CustomButton from "../../components/UI/CustomButton";
import USDTABI from "../../truffle_abis/FakeUSDT.json";
import axios from "axios";
import CustomModal from "../../components/UI/CustomModal";

const AddAllowanceModal = (props: any) => {
  const {
    modalIsOpen,
    closeModal,
    tokenAddress,
    amount,
    vendorContract,
    authToken,
    currentWallet,
    refreshData,
  } = props;

  const apiUrl = process.env.REACT_APP_API_URL;
  const steps = ["Connect Wallet", "Add Allowance"];
  const minAmountText = amount / 10 ** 6;
  // as we go through the steps, check for the necessary
  // e.g. after connecting wallet, check if balance and allowance enough
  // if enough change text to "You have sufficient xxx" or something for that step
  // as leave it as that and proceed
  const [stepsText, setStepsText] = useState([
    `Your current payment wallet is ${currentWallet}. To add allowance, please connect to the same wallet address`,

    `Please click on the button to add allowance. It is recommended to set an allowance of at least ${minAmountText} USDT to proceed. It is advised to give an allowance of at least ${
      minAmountText * 12
    } to ensure a smooth subscription`,
  ]);
  const [stepsButtonText, setStepsButtonText] = useState([
    "Connect Wallet",
    "Add Allowance",
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [address, setAddress] = useState("");
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
          .approve(vendorContract, "1000000000000000")
          .send({ from: address })
          .on("transactionHash", (hash: any) => {
            console.log(hash);
          });

        let newAllowance = approveToken.events.Approval.returnValues.value;
        setNewAllowance(parseInt(newAllowance) / 10 ** 6);
      } catch (err) {
        console.log(err);
        setButtonLoading(false);
        return;
      }

      setButtonLoading(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <CustomModal open={modalIsOpen} onClose={closeModal}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "& > :first-of-type": {
            marginRight: "auto",
          },
        }}
      >
        <span>Add Allowance</span>
        <span>{`${address.substring(0, 4)}...${address.substring(
          address.length - 4
        )}`}</span>
      </Typography>
      {/* Steps for start plan */}
      <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
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

      {/* Stepper info text */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`You have successfully changed set the allowance to ${newAllowance} USDT`}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={() => {
                refreshData();
                closeModal();
              }}
            >
              Close
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{stepsText[activeStep]}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <CustomButton
              text={stepsButtonText[activeStep]}
              onClick={handleNext}
              loading={buttonLoading}
            />
          </Box>
        </React.Fragment>
      )}
    </CustomModal>
  );
};

export default AddAllowanceModal;
