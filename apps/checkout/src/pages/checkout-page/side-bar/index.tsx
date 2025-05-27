import { KeyboardBackspace } from '@mui/icons-material';
import { useMediaQuery, Grid, Box, Typography } from '@mui/material';
import { VendorClientSubscriptionDetails } from 'core';
import { FC } from 'react';

interface ISideBar {
  details: VendorClientSubscriptionDetails;
}

const SideBar: FC<ISideBar> = ({ details }) => {
  const isSmOrUp = useMediaQuery('(min-width:600px)');

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
            <Typography variant="h5">Manage your {details.vendor} Billing Settings</Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'lightgray', cursor: 'pointer' },
            }}
            onClick={() => (window.location.href = details.returnUrl!)}
          >
            <KeyboardBackspace />
            <Typography>Return to {details!.vendor}</Typography>
          </Box>
          {isSmOrUp && <Typography sx={{ mt: 'auto' }}>Powered by RecurCrypt</Typography>}
        </Box>
      </Box>
    </Grid>
  );
};

export default SideBar;
