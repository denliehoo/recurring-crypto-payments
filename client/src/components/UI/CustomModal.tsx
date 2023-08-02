import { Box, Modal, SxProps } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const { open, onClose, sx } = props;
  return (
    <Modal open={open} onClose={onClose}>
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
