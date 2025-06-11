import { useNavigate, useSearchParams } from 'react-router-dom';
import CentrePage from '../../components/UI/CentrePage';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoadingOverlay from '@components/loading-overlay';
import { handleApiError } from '@core/utils';
import { apiVerifyEmail } from '@dashboard/api/login/verify-email';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const encodedAuthToken = searchParams.get('token');
  const token = encodedAuthToken?.replace(/~/g, '.');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        return;
      }
      try {
        await apiVerifyEmail(token);
        setIsVerified(true);
      } catch (err) {
        const { message } = handleApiError(err);
        setError(message);
      }
      setIsLoading(false);
    };
    verifyEmail();
  }, []);

  return (
    <CentrePage>
      <LoadingOverlay isLoading={isLoading} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6">
          {isVerified ? 'You have been verified' : `Error: ${error}`}
        </Typography>

        <Button onClick={() => navigate('/login')} variant="contained">
          Proceed To Login
        </Button>
      </Box>
    </CentrePage>
  );
};

export default VerifyEmail;
