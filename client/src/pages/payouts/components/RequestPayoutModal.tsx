// import classes from "./RequestPayoutModal.module.css";

import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { connectWallet } from "../../../utils/connectWallet";
import CustomButton from "../../../components/UI/CustomButton";
import RecurringPaymentsVendor from "../../../truffle_abis/RecurringPaymentsVendor.json";
import axios from "axios";

const RequestPayoutModal = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { requestPayoutModal, closeRequestPayoutModal, vendor, owner } = props;
  // get this from props or something; for now leave it as true; if is start plan means they havent added payment method
  // if its false, means that they want to change payment method

  const steps = ["Connect Wallet", "Request Payout"];

  const stepsText = [
    `To start, please connect your wallet with the wallet address ${owner}`,
    "Please Confirm Payout",
  ];
  const stepsButtonText = ["Connect Wallet", "Confirm"];
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [address, setAddress] = useState("");

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
    }
    // perform withdrawal
    if (activeStep === 1) {
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Modal open={requestPayoutModal} onClose={closeRequestPayoutModal}>
      <Box sx={style}>
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
          <span>Start plan</span>
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
              Your payout has been processed
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={closeRequestPayoutModal}>Close</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {stepsText[activeStep]}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <CustomButton
                text={stepsButtonText[activeStep]}
                onClick={handleNext}
                loading={buttonLoading}
                disabled={buttonDisabled}
              />
            </Box>
          </React.Fragment>
        )}
        {/*  */}
      </Box>
    </Modal>
  );
};

export default RequestPayoutModal;
