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
import React, { useEffect, useRef, useState } from "react";
import { connectWallet } from "../../../utils/connectWallet";
import CustomButton from "../../../components/UI/CustomButton";
import RecurringPaymentsVendor from "../../../truffle_abis/RecurringPaymentsVendor.json";
import axios from "axios";
import { apiCallAuth } from "../../../utils/apiRequest";
import CustomModal from "../../../components/UI/CustomModal";

const RequestPayoutModal = (props: any) => {
  const {
    requestPayoutModal,
    closeRequestPayoutModal,
    vendor,
    owner,
    refreshData,
  } = props;
  // get this from props or something; for now leave it as true; if is start plan means they havent added payment method
  // if its false, means that they want to change payment method

  const steps = ["Connect Wallet", "Check Address", "Request Payout"];

  const [stepsText, setStepsText] = useState([
    `To start, please connect your wallet with the wallet address ${owner}`,
    "You have connected to the correct wallet address",
    "Please Confirm Payout",
  ]);
  const stepsButtonText = ["Connect Wallet", "Continue", "Confirm"];
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [address, setAddress] = useState("");
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
          .on("transactionHash", (hash: any) => {
            console.log(hash);
          });

        const bodyData = {
          amount: parseInt(withdraw.events.VendorWithdraw.returnValues.amount), // parseInt first
          tokenAddress: vendor.tokenAddress,
          userAddress: address,
          token: "USDT", // hard code to USDT for now
          hash: withdraw.transactionHash,
        };
        const res = await apiCallAuth(
          "post",
          `/payments/create-payout/${vendor._id.toString()}`,
          bodyData
        );
        console.log(res);
        setButtonLoading(false);
      } catch (err) {
        console.log(err);
        setButtonLoading(false);
      }
    }

    activeStepRef.current = activeStep + 1;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleAccountsChanged = async (accounts: string[]) => {
    console.log(activeStepRef.current);

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
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    // Clean up the event listener when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <CustomModal open={requestPayoutModal} onClose={closeRequestPayoutModal}>
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
            {/* refresh the data in Payout page too */}
            <Button
              onClick={() => {
                closeRequestPayoutModal();
                refreshData();
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
              disabled={buttonDisabled}
            />
          </Box>
        </React.Fragment>
      )}
    </CustomModal>
  );
};

export default RequestPayoutModal;
