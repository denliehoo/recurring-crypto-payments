import { Typography } from '@mui/material';
import type { FC } from 'react';
import { useConfigurePlanContent } from './hooks';

const ConfigurePlanModalHeader: FC = () => {
  const { address } = useConfigurePlanContent();
  return (
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        '& > :first-of-type': {
          marginRight: 'auto',
        },
      }}
    >
      <span>
        {status === 'active' ? 'Change Payment Method' : 'Start Plan'}
      </span>
      {address && (
        <span>{`${address.substring(0, 4)}...${address.substring(address.length - 4)}`}</span>
      )}
    </Typography>
  );
};

export default ConfigurePlanModalHeader;
