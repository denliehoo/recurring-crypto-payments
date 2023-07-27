// import classes from "./ConfigureIntegrations.module.css";
import { apiCallAuth } from "../../utils/apiRequest";
import { useState } from "react";
import { validateForm } from "../../utils/validateForm";
import CustomFormFields from "../../components/UI/CustomFormFields";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React from "react";
import CustomButton from "../../components/UI/CustomButton";
import { connectWallet } from "../../utils/connectWallet";
import RecurringPayments from "../../truffle_abis/RecurringPayments.json";

/*
       1. Connect Wallet - 2. Fill form which includes: Name, webhookUrl, token
        address, amount, plan - 3. Click on the Configure button - 4. this will
        open a metamask popup to ask user to create contract 5. upon confirm of
        creation (and confirm has been mined), send api the update vendor with
        the details in 2 AND address of vendorContract created AND other
        relevant details
*/

const ConfigureIntegrations = (props: any) => {
  const [vendorDetails, setVendorDetails] = useState<any>({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [addressError, setAddressError] = useState(false);
  const fieldsTypes = {
    monthlySubscriptionPrice: "number",
    businessName: "text",
    webhookUrl: "text",
    planName: "text",
  };

  const steps = ["Connect Wallet", "Fill Details", "Create Contract"];
  const stepsText = [
    "To start, please connect your wallet on the Goerli Chain.",
    "Please fill in the relevant details below",
    `Please confirm by signing the smart contract. Subsequently, you may withdraw payments from the smart contract. Please ensure to keep your wallet safely because only your connected wallet address ${walletAddress} may withdraw profits`,
  ];
  const stepsButtonText = ["Connect", "Next", "Create"];
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
        "0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7"
      );
      setContract(master);
      console.log(master);
      setButtonLoading(false);
    }
    // confirm fill details
    if (activeStep === 1) {
      if (
        !validateForm(vendorDetails, fieldsTypes, setValidationErrors) ||
        !vendorDetails.tokenAddress
      ) {
        if (!vendorDetails.tokenAddress) {
          setAddressError(true);
        }
        return;
      }
    }

    // create contract
    if (activeStep === 2) {
      setButtonLoading(true);
      try {
        // create the contract
        const createContract = await contract.methods
          .createVendorContract(vendorDetails.tokenAddress)
          .send({ from: walletAddress })
          .on("transactionHash", (hash: any) => {
            console.log(hash);
          });

        const vendorContractCreated = await createContract.events
          .VendorContractCreated.returnValues.contractAddress;
        // update the vendor entity
        const bodyData = {
          name: vendorDetails.businessName,
          webhookUrl: vendorDetails.webhookUrl,
          tokenAddress: vendorDetails.tokenAddress,
          amount: Math.ceil(
            parseFloat(vendorDetails.monthlySubscriptionPrice) * 10 ** 6
          ),
          plan: vendorDetails.planName,
          vendorContract: vendorContractCreated, // replace later
          id: props.vendorId,
        };
        const res = await apiCallAuth("put", "/vendors", bodyData);
        console.log(res);
        setButtonLoading(false);
      } catch {
        setButtonLoading(false);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { projectId, resetState, getTasks } = props;

  const handleSubmit = () => {
    if (!validateForm(vendorDetails, fieldsTypes, setValidationErrors)) return;

    setButtonLoading(true);
    const addTask = async () => {
      try {
        const res = await apiCallAuth("post", "/tasks", {
          ...vendorDetails,
          project: projectId,
        });
        console.log(res);

        setButtonLoading(false);
        setVendorDetails(false);
        resetState();

        await getTasks();
      } catch (err) {
        setButtonLoading(false);
        console.log(err);
      }
    };
    // addTask();
  };
  return (
    <Box>
      <Typography
        id="modal-modal-title"
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "& > :first-of-type": {
            marginRight: "auto",
          },
        }}
      >
        <span>Configure Integrations</span>
        <span>{`${walletAddress.substring(0, 4)}...${walletAddress.substring(
          walletAddress.length - 4
        )}`}</span>
      </Typography>

      {/* Steps */}

      <Box sx={{ width: "100%", mt: 2 }}>
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
            <Button variant="contained" fullWidth onClick={props.refreshData}>
              Proceed
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {stepsText[activeStep]}
            </Typography>
            {/* form fields for fill details step */}
            {activeStep == 1 && (
              <React.Fragment>
                {/* token addres field */}
                <FormControl fullWidth sx={{ mb: 2 }} error={addressError}>
                  <InputLabel>Token Address</InputLabel>
                  <Select
                    value={vendorDetails.tokenAddress || ""}
                    label="Token Address"
                    onChange={(e) => {
                      setVendorDetails({
                        ...vendorDetails,
                        tokenAddress: e.target.value,
                      });
                      setAddressError(false);
                    }}
                  >
                    <MenuItem
                      value={"0xC2CA4DFa527902c440d71F162403A3BB93045a24"}
                    >
                      USDT (Goerli)
                    </MenuItem>
                    {/* <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                  {addressError && (
                    <FormHelperText>
                      Token Address field cannot be empty
                    </FormHelperText>
                  )}
                </FormControl>
                {/* other fields */}
                <CustomFormFields
                  detailsToSubmit={vendorDetails}
                  setDetailsToSubmit={setVendorDetails}
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                  fieldsTypes={fieldsTypes}
                />
              </React.Fragment>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
      {/*  */}
    </Box>
  );
};

export default ConfigureIntegrations;
