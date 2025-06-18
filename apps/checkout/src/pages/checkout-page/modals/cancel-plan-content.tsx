import { Button, Typography } from '@mui/material';
import CustomButton from '@components/button';
import { type FC, useState } from 'react';
import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';
import { apiCancelSubscription } from '@checkout/api/cancel-subscription';

const CancelPlanContent: FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const setModal = useCheckoutModal((state) => state.setModal);

  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);

  const handleCancelPlan = async () => {
    setButtonLoading(true);
    try {
      await apiCancelSubscription();

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
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cancel Plan
      </Typography>
      <Typography>Are you sure you want to cancel your plan?</Typography>
      <CustomButton
        text="confirm"
        loading={buttonLoading}
        onClick={handleCancelPlan}
      />
      <Button
        variant="outlined"
        onClick={() => setModal(undefined)}
        sx={{ ml: 2 }}
      >
        No
      </Button>
    </>
  );
};

export default CancelPlanContent;
