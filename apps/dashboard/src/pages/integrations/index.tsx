// import classes from "./Integrations.module.css";

import { useEffect, useState } from 'react';
import { apiCallAuth } from '../../utils/api-request';

import { Box } from '@mui/material';
import ConfigureIntegrations from './components/configure-integrations';
import ConfiguredIntergrations from './components/configured-integrations';
import { Vendor } from '@core/types';

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorId, setVendorId] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const getVendorDetails = async () => {
      const res: any = await apiCallAuth('get', '/vendors/getVendorByToken');

      const {
        name,
        email,
        apiKey,
        webhookUrl,
        returnUrl,
        tokenAddress,
        amount,
        vendorContract,
        plan,
        _id: id,
      } = res.data;
      setVendor({
        name,
        email,
        apiKey,
        webhookUrl,
        returnUrl,
        tokenAddress,
        amount,
        vendorContract,
        plan,
      });
      setVendorId(id);
      setIsLoading(false);
    };
    getVendorDetails();
  }, [refreshData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (vendor && vendor.plan) {
    return (
      <ConfiguredIntergrations
        vendorId={vendorId}
        vendor={vendor}
        refreshData={() => setRefreshData(!refreshData)}
      />
    );
  }

  // Have not configured integrations

  return (
    <ConfigureIntegrations vendorId={vendorId} refreshData={() => setRefreshData(!refreshData)} />
  );
};

export default Integrations;
