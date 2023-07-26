// import classes from "./ConfigureIntegrations.module.css";
import { apiCallAuth } from "../../utils/apiRequest";
import { useState } from "react";
import { validateForm } from "../../utils/validateForm";
import CustomFormFields from "../../components/UI/CustomFormFields";
import { Box, Button, Typography } from "@mui/material";

const ConfigureIntegrations = (props: any) => {
  const [addTaskDetails, setAddTaskDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const fieldsTypes = {
    name: "text",
    webhookUrl: "text",
    tokenAddress: "text",
    amount: "number",
    plan: "text",
  };

  const { projectId, resetState, getTasks } = props;

  const handleSubmit = () => {
    if (!validateForm(addTaskDetails, fieldsTypes, setValidationErrors)) return;

    setIsLoading(true);
    const addTask = async () => {
      try {
        const res = await apiCallAuth("post", "/tasks", {
          ...addTaskDetails,
          project: projectId,
        });
        console.log(res);

        setIsLoading(false);
        setAddTaskDetails(false);
        resetState();

        await getTasks();
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    // addTask();
  };
  return (
    <Box>
      <Typography variant="h5"> Please configure your integrations</Typography>
      <div>
        1. Connect Wallet - 2. Fill form which includes: Name, webhookUrl, token
        address, amount, plan - 3. Click on the Configure button - 4. this will
        open a metamask popup to ask user to create contract 5. upon confirm of
        creation (and confirm has been mined), send api the update vendor with
        the details in 2 AND address of vendorContract created AND other
        relevant details
      </div>
      <CustomFormFields
        detailsToSubmit={addTaskDetails}
        setDetailsToSubmit={setAddTaskDetails}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ConfigureIntegrations;
