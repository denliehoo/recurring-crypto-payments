import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IntegrationFormFields from "./IntegrationFormFields";
import { apiCallAuth } from "../../../utils/apiRequest";
import CustomButton from "../../../components/UI/CustomButton";
import { validateForm } from "../../../utils/validateForm";
import CustomModal from "../../../components/UI/CustomModal";

const EditConfigurationsModal = (props: any) => {
  const { editModalOpen, closeModal, vendor, vendorId, refreshData } = props;
  const [vendorDetails, setVendorDetails] = useState<any>({
    tokenAddress: vendor.tokenAddress,
    monthlySubscriptionPrice: vendor.amount / 10 ** 6,
    businessName: vendor.name,
    webhookUrl: vendor.webhookUrl,
    returnUrl: vendor.returnUrl,
    planName: vendor.plan,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [addressError, setAddressError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const fieldsTypes = {
    monthlySubscriptionPrice: "number",
    businessName: "text",
    webhookUrl: "text",
    returnUrl: "text",
    planName: "text",
  };

  const handleEdit = async () => {
    setButtonLoading(true);
    if (
      !validateForm(vendorDetails, fieldsTypes, setValidationErrors) ||
      !vendorDetails.tokenAddress
    ) {
      if (!vendorDetails.tokenAddress) {
        setAddressError(true);
      }
      setButtonLoading(false);
      return;
    }
    const bodyData = {
      name: vendorDetails.businessName,
      webhookUrl: vendorDetails.webhookUrl,
      returnUrl: vendorDetails.returnUrl,
      tokenAddress: vendorDetails.tokenAddress,
      amount: Math.ceil(
        parseFloat(vendorDetails.monthlySubscriptionPrice) * 10 ** 6
      ),
      plan: vendorDetails.planName,
      vendorContract: vendor.vendorContract,
      id: vendorId,
    };
    try {
      const res = await apiCallAuth("put", "/vendors", bodyData);

      setButtonLoading(false);
      refreshData();
      closeModal();
    } catch {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (
      vendorDetails.businessName === vendor.name &&
      vendorDetails.webhookUrl === vendor.webhookUrl &&
      vendorDetails.returnUrl === vendor.returnUrl &&
      vendorDetails.tokenAddress === vendor.tokenAddress &&
      vendorDetails.monthlySubscriptionPrice.toString() ===
        (vendor.amount / 10 ** 6).toString() &&
      vendorDetails.planName === vendor.plan
    ) {
      setFormChanged(false);
    } else {
      setFormChanged(true);
    }
  }, [vendorDetails]);
  return (
    <CustomModal open={editModalOpen} onClose={closeModal}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Configurations
      </Typography>
      <IntegrationFormFields
        vendorDetails={vendorDetails}
        setVendorDetails={setVendorDetails}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
        addressError={addressError}
        setAddressError={setAddressError}
      />
      <CustomButton
        onClick={handleEdit}
        loading={buttonLoading}
        text="Edit"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!formChanged}
      />
    </CustomModal>
  );
};

export default EditConfigurationsModal;
