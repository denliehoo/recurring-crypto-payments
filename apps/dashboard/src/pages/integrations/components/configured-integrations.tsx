import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import DisplayField from '../../../components/UI/DisplayField';
import EditConfigurationsModal from './edit-configurations-modal';
import IntegrationInstructions from './integration-instructions';
import { Vendor } from '@core/types';

interface IConfiguredIntegrations {
  vendorId: string;
  vendor: Vendor;
  refreshData: () => void;
}

const ConfiguredIntergrations: FC<IConfiguredIntegrations> = ({
  vendor,
  vendorId,
  refreshData,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { vendorContract, tokenAddress, name, webhookUrl, returnUrl, plan, amount = 0 } = vendor;
  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Integrations</Typography>
        <Button variant="contained" onClick={() => setEditModalOpen(true)}>
          Edit
        </Button>
      </Box>
      <Typography sx={{ mb: 2 }}>These are your configured integrations details</Typography>
      <DisplayField text={vendor.apiKey} hideOption={true} label={'API Keys'} />
      <DisplayField text={vendorId} label="RecurCrypt ID" hideOption={false} />
      <DisplayField text={vendorContract} hideOption={false} label={'Your Contract Address'} />

      <DisplayField text={tokenAddress} hideOption={false} label={'Token Address'} />
      <DisplayField
        text={(amount / 10 ** 6).toString()}
        hideOption={false}
        label={'Monthly Subscription Price'}
      />
      <DisplayField text={name} hideOption={false} label={'Business Name'} />
      <DisplayField text={webhookUrl} hideOption={false} label={'Webhook Url'} />
      <DisplayField text={returnUrl} hideOption={false} label={'Return Url'} />
      <DisplayField text={plan} hideOption={false} label={'Plan'} />

      {editModalOpen && (
        <EditConfigurationsModal
          editModalOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          vendor={vendor}
          vendorId={vendorId}
          refreshData={refreshData}
        />
      )}

      <IntegrationInstructions />
    </Box>
  );
};

export default ConfiguredIntergrations;
