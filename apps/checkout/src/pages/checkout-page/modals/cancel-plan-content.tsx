import { Button, Typography } from '@mui/material';
import CustomButton from '@components/button';
import { FC, useState } from 'react';
import axios from 'axios';
import { useCheckoutModal, useSubcriptionDetail } from '@checkout/store';

const CancelPlanContent: FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const setModal = useCheckoutModal((state) => state.setModal);
  const authToken = useSubcriptionDetail((state) => state.authToken);
  const setRefreshData = useSubcriptionDetail((state) => state.setRefreshData);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCancelPlan = async () => {
    setButtonLoading(true);
    try {
      const headers = {
        Authorization: authToken,
      };

      await axios.post(`${apiUrl}/externalPage/cancel-subscription`, null, {
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
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cancel Plan
      </Typography>
      <Typography>Are you sure you want to cancel your plan?</Typography>
      <CustomButton text="confirm" loading={buttonLoading} onClick={handleCancelPlan} />
      <Button variant="outlined" onClick={() => setModal(undefined)} sx={{ ml: 2 }}>
        No
      </Button>
    </>
  );
};

export default CancelPlanContent;
