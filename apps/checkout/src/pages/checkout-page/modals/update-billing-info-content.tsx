import { FC, useState } from 'react';
import CustomButton from '@components/button';

import CustomModal from '@components/modal';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import CustomFormFields from '@components/form-field';
import { validateForm } from '@core/utils/form';
import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import { BillingInfo } from 'core';

const UpdateBillingInfoModal: FC = () => {
  const authToken = useSubcriptionDetail((state) => state.authToken);
  const setModal = useCheckoutModal((state) => state.setModal);

  const details = useSubcriptionDetail((state) => state.details);
  const { billingInfo } = details || {};

  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);

  const [detailsToSubmit, setDetailsToSubmit] = useState<BillingInfo>(billingInfo!);
  const [validationErrors, setValidationErrors] = useState({});
  const fieldsTypes = {
    address: 'text',
    email: 'text',
    name: 'text',
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    if (!validateForm(detailsToSubmit, fieldsTypes, setValidationErrors)) return;
    setButtonLoading(true);
    // rest of the api...

    try {
      const headers = {
        Authorization: authToken,
      };
      await axios.put(`${apiUrl}/externalPage/update-vendor-client-billing-info`, detailsToSubmit, {
        headers,
      });

      setButtonLoading(false);
      setRefreshData();
      setModal(undefined);
    } catch (err) {
      console.log(err);
      setButtonLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update Billing Information
      </Typography>

      <CustomFormFields
        detailsToSubmit={detailsToSubmit as any}
        setDetailsToSubmit={setDetailsToSubmit}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        fieldsTypes={fieldsTypes}
      />
      <Box sx={{ mt: 2 }}>
        <CustomButton loading={buttonLoading} text="Confirm" fullWidth onClick={handleSubmit} />
      </Box>
    </>
  );
};

export default UpdateBillingInfoModal;
