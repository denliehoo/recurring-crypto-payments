// import classes from "./StartPlanModal.module.css";

import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connectWallet } from "../../utils/connectWallet";
import CustomButton from "../../components/UI/CustomButton";
import USDTABI from "../../truffle_abis/FakeUSDT.json";
// import USDTABI from "../../../../shared/truffle_abis/FakeUSDT.json";

const StartPlanModal = (props: any) => {
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
  const {
    startPlanModal,
    closeStartPlanModal,
    tokenAddress,
    token,
    amount,
    vendorContract,
  } = props;
  const steps = [
    "Connect Wallet",
    "Check Balance",
    "Check Allowance",
    "Confirm Subscription",
  ];
  const minAmountText = amount / 10 ** 6;
  // as we go through the steps, check for the necessary
  // e.g. after connecting wallet, check if balance and allowance enough
  // if enough change text to "You have sufficient xxx" or something for that step
  // as leave it as that and proceed
  const [stepsText, setStepsText] = useState([
    "To start, please connect your wallet",
    "You have a sufficient balance of XXX USDT and may proceed",
    "You have sufficient allowance and may proceed",
    "Please confirm your subscription. Subsequently, we will be deducting XXX USDT monthly",
  ]);
  const [stepsButtonText, setStepsButtonText] = useState([
    "Connect Wallet",
    "Next",
    "Approve Allowance", // or NEXT
    "Confirm",
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [address, setAddress] = useState("");
  const [userToken, setUserToken] = useState({
    balance: 0,
    allowance: 0,
    balanceSufficient: false,
    allowanceSufficient: false,
  });
  const handleNext = async () => {
    // connect wallet
    if (activeStep === 0) {
      setButtonLoading(true);
      const w3 = await connectWallet();
      console.log(w3);
      setWeb3(w3);
      if (!w3) {
        setButtonLoading(false);
        return;
      }
      const accounts = await w3.eth.getAccounts();
      setAddress(accounts[0]);

      const abi: any = USDTABI.abi;
      const usdt: any = new w3.eth.Contract(abi, tokenAddress);
      console.log(usdt);
      setContract(usdt);
      const name = await usdt.methods.name().call();
      console.log(name);
      let userBalance = await usdt.methods.balanceOf(accounts[0]).call();
      userBalance = parseInt(userBalance);
      let userAllowance = await usdt.methods
        .allowance(accounts[0], vendorContract)
        .call();
      userAllowance = parseInt(userAllowance);

      const balanceIsSufficient = userBalance > amount;
      const allowanceIsSufficient = userAllowance > amount;
      console.log(balanceIsSufficient, allowanceIsSufficient);
      setUserToken({
        balance: userBalance,
        allowance: userAllowance,
        balanceSufficient: balanceIsSufficient,
        allowanceSufficient: allowanceIsSufficient,
      });
      const tempStepsText = [...stepsText];

      if (!balanceIsSufficient) {
        setButtonDisabled(true);
        tempStepsText[1] = `Please ensure you have at least ${minAmountText} USDT to proceed`;
      } else {
        console.log("here");
        tempStepsText[1] = `You have a sufficient balance of ${
          userBalance / 10 ** 6
        } USDT and may proceed`;
        console.log(tempStepsText);
      }
      if (!allowanceIsSufficient) {
        tempStepsText[2] = `Please ensure you have given an allowance of at least ${minAmountText} USDT to proceed. It is advised to give an allowance of at least ${
          minAmountText * 12
        } to proceed to ensure a smooth subscription`;
      }
      setButtonLoading(false);
      setStepsText(tempStepsText);
    }
    // checkbalance
    if (activeStep === 1) {
    }
    // check allowance
    if (activeStep === 2) {
      if (userToken.allowanceSufficient) {
        // just go to next step
      } else {
        setButtonLoading(true);
        let allowanceIsSufficient;
        try {
          const approveToken = await contract.methods
            .approve(vendorContract, "1000000000000000")
            .send({ from: address })
            .on("transactionHash", (hash: any) => {
              console.log(hash);
              // showPendingNotification('token approval')
            });
          console.log(approveToken);

          let newAllowance = approveToken.events.Approval.returnValues.value;
          const receipt = await web3.eth.getTransactionReceipt(
            approveToken.transactionHash
          );
          console.log(receipt);

          if (parseInt(newAllowance) > amount) {
            console.log("gave enough allowance");
            allowanceIsSufficient = true;
            // update user stuff here
            setUserToken({
              ...userToken,
              allowanceSufficient: true,
              allowance: parseInt(newAllowance),
            });
          } else {
            console.log("didnt give enough allowance");
            allowanceIsSufficient = false;
            setUserToken({
              ...userToken,
              allowanceSufficient: false,
              allowance: parseInt(newAllowance),
            });
          }
        } catch (err) {
          console.log(err);
          allowanceIsSufficient = false;
        }

        if (allowanceIsSufficient) {
          setUserToken({ ...userToken, allowanceSufficient: true });
          let temp = [...stepsText];
          temp[2] = "You have sufficient allowance and may proceed";
          setStepsText(temp);
          temp = [...stepsButtonText];
          temp[2] = "Next";
          setStepsButtonText(temp);
        }
        setButtonLoading(false);
        return;
      }
    }
    //confirm subscription
    if (activeStep === 3) {
      // get this from api or something
      const isSubscribed = false;
      if (isSubscribed) {
        // means they want to change payment method
        // change the payment method accordingly on server
        // on next billing, bill this address instead
      } else {
        // means they want to add payment method and begin subscription
        // call the function to deduct token
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Modal open={startPlanModal} onClose={closeStartPlanModal}>
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
              You have successfully subscribed!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={closeStartPlanModal}>Close</Button>
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

export default StartPlanModal;
