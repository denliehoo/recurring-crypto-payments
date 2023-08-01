// import classes from "./CancelPlanModal.module.css";

import { Box, Button, Modal, Typography } from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";
import { useState } from "react";
import axios from "axios";

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
        `${apiUrl}/payments/cancel-subscription`,
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
    <Modal open={cancelPlanModal} onClose={closeCancelPlanModal}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cancel Plan
        </Typography>
        <Typography>Are you sure you want to cancel your plan?</Typography>
        <CustomButton
          text="confirm"
          loading={buttonLoading}
          onClick={handleCancelPlan}
        />
        <Button variant="outlined" onClick={closeCancelPlanModal}>
          No
        </Button>
      </Box>
    </Modal>
  );
};

export default CancelPlanModal;
