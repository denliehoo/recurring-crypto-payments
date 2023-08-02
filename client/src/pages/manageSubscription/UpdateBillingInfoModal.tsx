import { useState } from "react";
import CustomButton from "../../components/UI/CustomButton";
import CustomFormFields from "../../components/UI/CustomFormFields";
import CustomModal from "../../components/UI/CustomModal";
import { Box, Typography } from "@mui/material";
import { validateForm } from "../../utils/validateForm";
import axios from "axios";

const UpdateBillingInfoModal = (props: any) => {
  const { modalIsOpen, closeModal, billingInfo, authToken, refreshData } =
    props;
  const [detailsToSubmit, setDetailsToSubmit] = useState<any>(billingInfo);
  const [validationErrors, setValidationErrors] = useState({});
  const fieldsTypes = {
    address: "text",
    email: "text",
    name: "text",
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    if (!validateForm(detailsToSubmit, fieldsTypes, setValidationErrors))
      return;
    setButtonLoading(true);
    // rest of the api...
    console.log(detailsToSubmit);
    try {
      const headers = {
        Authorization: authToken,
      };
      const res = await axios.put(
        `${apiUrl}/vendorclients/update-vendor-client-billing-info`,
        detailsToSubmit,
        {
          headers,
        }
      );
      console.log(res);
      setButtonLoading(false);
      refreshData();
      closeModal();
    } catch (err) {
      console.log(err);
      setButtonLoading(false);
    }
  };

  return (
    <CustomModal open={modalIsOpen} onClose={closeModal}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update Billing Information
      </Typography>

      <CustomFormFields
        detailsToSubmit={detailsToSubmit}
        setDetailsToSubmit={setDetailsToSubmit}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />
      <Box sx={{ mt: 2 }}>
        <CustomButton
          loading={buttonLoading}
          text="Confirm"
          fullWidth
          onClick={handleSubmit}
        />
      </Box>
    </CustomModal>
  );
};

export default UpdateBillingInfoModal;
