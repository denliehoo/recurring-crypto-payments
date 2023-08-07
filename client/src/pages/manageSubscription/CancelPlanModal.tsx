// import classes from "./CancelPlanModal.module.css";

import { Box, Button, Modal, Typography } from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";
import { useState } from "react";
import axios from "axios";
import CustomModal from "../../components/UI/CustomModal";

const CancelPlanModal = (props: any) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { cancelPlanModal, closeCancelPlanModal, authToken, refreshData } =
    props;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCancelPlan = async () => {
    setButtonLoading(true);
    try {
      const headers = {
        Authorization: authToken,
      };

      console.log(authToken);

      const res = await axios.post(
        `${apiUrl}/externalPage/cancel-subscription`,
        null,
        {
          headers,
        }
      );
      console.log(res);
      setButtonLoading(false);
      refreshData();
      closeCancelPlanModal();
    } catch (err) {
      console.log(err);
      setButtonLoading(false);
    }
  };
  return (
    <CustomModal open={cancelPlanModal} onClose={closeCancelPlanModal}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cancel Plan
      </Typography>
      <Typography>Are you sure you want to cancel your plan?</Typography>
      <CustomButton
        text="confirm"
        loading={buttonLoading}
        onClick={handleCancelPlan}
      />
      <Button variant="outlined" onClick={closeCancelPlanModal} sx={{ ml: 2 }}>
        No
      </Button>
    </CustomModal>
  );
};

export default CancelPlanModal;
