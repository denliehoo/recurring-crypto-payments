import { Box, Modal, ModalOwnProps, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ICustomModalProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  children: ReactNode;
  disableCloseUponClickingOutside?: boolean;
}

const CustomModal: FC<ICustomModalProps> = ({
  open,
  onClose,
  sx,
  disableCloseUponClickingOutside,
  children,
}) => {
  const handleClose: ModalOwnProps['onClose'] = (_e, reason) => {
    if (
      disableCloseUponClickingOutside &&
      (reason === 'backdropClick' || reason === 'escapeKeyDown')
    ) {
      return;
    }
    onClose();
  };
  return (
    <Modal open={open} onClose={handleClose} BackdropProps={{ invisible: true }}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
