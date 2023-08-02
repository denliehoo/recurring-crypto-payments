import { Box, Modal, SxProps } from "@mui/material";
import { ChangeEvent } from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  children: React.ReactNode;
  disableCloseUponClickingOutside?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const { open, onClose, sx, disableCloseUponClickingOutside } = props;
  const handleClose = (e: ChangeEvent, reason: any) => {
    if (
      disableCloseUponClickingOutside &&
      (reason === "backdropClick" || reason === "escapeKeyDown")
    ) {
      return;
    }
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{ invisible: true }}
    >
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
          ...sx,
        }}
      >
        {props.children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
