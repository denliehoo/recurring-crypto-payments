import { useSubcriptionDetail } from '@checkout/store';
import { KeyboardBackspace } from '@mui/icons-material';
import { useMediaQuery, Grid, Box, Typography } from '@mui/material';
import type { FC } from 'react';

const SideBar: FC = () => {
  const isSmOrUp = useMediaQuery('(min-width:600px)');

  const details = useSubcriptionDetail((state) => state.details);

  const { vendor, returnUrl } = details || {};

  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={4}
      sx={{
        width: '100%',
        position: 'fixed',
        height: isSmOrUp ? '100%' : '15%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '30px',
          alignItems: 'flex-start',
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
          color: 'white',
        }}
      >
        <Box
          sx={{
            marginTop: isSmOrUp ? '30%' : 'none',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {isSmOrUp && (
            <Typography variant="h5">
              Manage your {vendor} Billing Settings
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'lightgray', cursor: 'pointer' },
            }}
            onClick={() => (window.location.href = returnUrl!)}
          >
            <KeyboardBackspace />
            <Typography>Return to {vendor}</Typography>
          </Box>
          {isSmOrUp && (
            <Typography sx={{ mt: 'auto' }}>Powered by RecurCrypt</Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default SideBar;
