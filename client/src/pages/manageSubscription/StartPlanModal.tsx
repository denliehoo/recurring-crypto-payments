// import classes from "./StartPlanModal.module.css";

import {
  Box,
  Button,
  Grid,
  Modal,
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
    amount,
    vendorContract,
    authToken,
  } = props;
  // get this from props or something; for now leave it as true; if is start plan means they havent added payment method
  // if its false, means that they want to change payment method
  const isStartPlan = true;

  const apiUrl = process.env.REACT_APP_API_URL;
  const steps = [
    "Connect Wallet",
    "Check Balance",
    "Check Allowance",
    `Confirm ${isStartPlan ? "Subscription" : "Change"}`,
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
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [inputError, setInputError] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setInputError("");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setInputError("");
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
    setInputError("");
  };

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

      const abi: any = USDTABI.abi;
      const usdt: any = new w3.eth.Contract(abi, tokenAddress);
      setContract(usdt);
      let userBalance = await usdt.methods.balanceOf(accounts[0]).call();
      userBalance = parseInt(userBalance);
      let userAllowance = await usdt.methods
        .allowance(accounts[0], vendorContract)
        .call();
      userAllowance = parseInt(userAllowance);

      const balanceIsSufficient = userBalance > amount;
      const allowanceIsSufficient = userAllowance > amount;
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
        tempStepsText[1] = `You have a sufficient balance of ${
          userBalance / 10 ** 6
        } USDT and may proceed`;
      }
      if (!allowanceIsSufficient) {
        tempStepsText[2] = `Please ensure you have given an allowance of at least ${minAmountText} USDT to proceed. It is advised to give an allowance of at least ${
          minAmountText * 12
        } to proceed to ensure a smooth subscription`;
      } else {
        const tempButtonText = [...stepsButtonText];
        tempButtonText[2] = "Next";
        setStepsButtonText(tempButtonText);
      }
      if (isStartPlan) {
        tempStepsText[3] = `Please confirm your subscription and billing information. We will be deducting ${minAmountText} USDT monthly starting from now if you confirm your subscription.`;
      } else {
        tempStepsText[3] = `Please confirm your change. Subsequently, we will be deducting ${minAmountText} USDT monthly starting from this address.`;
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
            });

          let newAllowance = approveToken.events.Approval.returnValues.value;
          const receipt = await web3.eth.getTransactionReceipt(
            approveToken.transactionHash
          );

          if (parseInt(newAllowance) > amount) {
            allowanceIsSufficient = true;
            setUserToken({
              ...userToken,
              allowanceSufficient: true,
              allowance: parseInt(newAllowance),
            });
          } else {
            // insufficient allowance was given
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
      if (isStartPlan) {
        // means they want to add payment method and begin subscription
        if (!nameInput || !emailInput || !addressInput) {
          setInputError("Please ensure fields are not empty");
          return;
        }

        // call api to begin subscription
        // call api to add billing method
        console.log(nameInput, emailInput, addressInput);

        setButtonLoading(true);
        try {
          const headers = {
            Authorization: authToken,
          };
          const body = {
            billingInfo: {
              name: nameInput,
              email: emailInput,
              address: addressInput,
            },
            paymentMethod: {
              token: "USDT",
              tokenAddress: tokenAddress,
              wallet: address,
              sufficientAllowance: true,
              sufficientBalance: true,
            },
            userAddress: address,
          };
          const res = await axios.post(
            `${apiUrl}/payments/initiate-subscription`,
            body,
            {
              headers,
            }
          );
          console.log(res);
        } catch (err) {
          console.log(err);
          // if api call fail, dont proceed
          return;
        }
        setButtonLoading(false);
      } else {
        // means they want to change payment method
        // change the payment method accordingly on server
        // on next billing, bill this address instead
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
            {activeStep === 3 && isStartPlan && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={nameInput}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={emailInput}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={addressInput}
                    onChange={handleAddressChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {inputError && <span>{inputError}</span>}
                </Grid>
              </Grid>
            )}
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
