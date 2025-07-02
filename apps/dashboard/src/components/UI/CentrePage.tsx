import { Box, Container } from '@mui/material';
import { FC } from 'react';

const CentrePage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default CentrePage;
