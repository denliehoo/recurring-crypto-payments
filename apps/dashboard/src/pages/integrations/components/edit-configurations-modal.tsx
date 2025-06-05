import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import IntegrationFormFields from './integration-form-fields';

import CustomButton from '@components/button';
import CustomModal from '@components/modal';
import { validateForm } from '@core/utils/form';
import { Vendor } from '@core/types';
import { apiCallAuth } from '@dashboard/api/api-request';

interface IEditConfigurationsModal {
  editModalOpen: boolean;
  closeModal: () => void;
  vendor: Vendor;
  vendorId: string;
  refreshData: () => void;
}

export interface IVendorDetails {
  tokenAddress?: string;
  monthlySubscriptionPrice: number | string;
  businessName?: string;
  webhookUrl?: string;
  returnUrl?: string;
  planName?: string;
  amount?: number;
}

const EditConfigurationsModal: FC<IEditConfigurationsModal> = (props) => {
  const { editModalOpen, closeModal, vendor, vendorId, refreshData } = props;
  const { amount: vendorAmount = 0 } = vendor;
  const [vendorDetails, setVendorDetails] = useState<IVendorDetails | undefined>({
    tokenAddress: vendor.tokenAddress,
    monthlySubscriptionPrice: vendorAmount / 10 ** 6,
    businessName: vendor.name,
    webhookUrl: vendor.webhookUrl,
    returnUrl: vendor.returnUrl,
    planName: vendor.plan,
  });

  console.log(vendorDetails);
  const [validationErrors, setValidationErrors] = useState({});
  const [addressError, setAddressError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const fieldsTypes = {
    monthlySubscriptionPrice: 'number',
    businessName: 'text',
    webhookUrl: 'text',
    returnUrl: 'text',
    planName: 'text',
  };

  const handleEdit = async () => {
    setButtonLoading(true);
    if (
      !validateForm(vendorDetails, fieldsTypes, setValidationErrors) ||
      vendorDetails?.tokenAddress
    ) {
      if (vendorDetails?.tokenAddress) {
        setAddressError(true);
      }
      setButtonLoading(false);
      return;
    }
    const bodyData = {
      name: vendorDetails?.businessName,
      webhookUrl: vendorDetails?.webhookUrl,
      returnUrl: vendorDetails?.returnUrl,
      tokenAddress: vendorDetails?.tokenAddress,
      // When form value is edited, it will be a string even if it is an integer
      amount: Math.ceil(parseFloat(String(vendorDetails?.monthlySubscriptionPrice)) * 10 ** 6),
      plan: vendorDetails?.planName,
      vendorContract: vendor.vendorContract,
      id: vendorId,
    };
    try {
      await apiCallAuth('put', '/vendors', bodyData);

      setButtonLoading(false);
      refreshData();
      closeModal();
    } catch {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (
      vendorDetails?.businessName === vendor.name &&
      vendorDetails?.webhookUrl === vendor.webhookUrl &&
      vendorDetails?.returnUrl === vendor.returnUrl &&
      vendorDetails?.tokenAddress === vendor.tokenAddress &&
      vendorDetails?.monthlySubscriptionPrice.toString() === (vendorAmount / 10 ** 6).toString() &&
      vendorDetails?.planName === vendor.plan
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
