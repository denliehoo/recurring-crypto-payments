import { type FC, useState } from 'react';
import CustomButton from '@components/button';

import { Box, Typography } from '@mui/material';
import CustomFormFields from '@components/form-field';
import { validateForm } from '@core/utils/form';
import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import type { BillingInfo } from '@core/types';
import { apiUpdateBillingInfo } from '@checkout/api/update-billing-info';
import { handleApiError } from '@core/utils';

const UpdateBillingInfoModal: FC = () => {
  const setModal = useCheckoutModal((state) => state.setModal);

  const details = useSubcriptionDetail((state) => state.details);
  const { billingInfo } = details || {};

  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);

  const [detailsToSubmit, setDetailsToSubmit] = useState<BillingInfo>(
    billingInfo!,
  );
  const [validationErrors, setValidationErrors] = useState({});
  const fieldsTypes = {
    address: 'text',
    email: 'text',
    name: 'text',
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm(detailsToSubmit, fieldsTypes, setValidationErrors))
      return;
    setButtonLoading(true);

    try {
      await apiUpdateBillingInfo(detailsToSubmit);

      setButtonLoading(false);
      setRefreshData();
      setModal(undefined);
    } catch (err) {
      handleApiError(err);
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
        <CustomButton
          loading={buttonLoading}
          text="Confirm"
          fullWidth
          onClick={handleSubmit}
        />
      </Box>
    </>
  );
};

export default UpdateBillingInfoModal;
