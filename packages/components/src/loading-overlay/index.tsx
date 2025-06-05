import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => (
  <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingOverlay;
