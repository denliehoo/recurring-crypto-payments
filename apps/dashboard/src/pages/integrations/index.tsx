import { useEffect, useState } from 'react';

import ConfigureIntegrations from './components/configure-integrations';
import ConfiguredIntergrations from './components/configured-integrations';
import type { Vendor } from '@core/types';
import PageLayout from '@dashboard/components/layout/page-layout';
import { apiGetVendorDetails } from '@dashboard/api/vendor/get-details';

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorId, setVendorId] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const getAndSetVendorDetails = async () => {
      const { data } = await apiGetVendorDetails();

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
      } = data;
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
        _id: id,
      });
      setVendorId(id);
      setIsLoading(false);
    };
    getAndSetVendorDetails();
  }, [refreshData]);

  return (
    <PageLayout isLoading={isLoading}>
      {vendor && vendor.plan ? (
        <ConfiguredIntergrations
          vendorId={vendorId}
          vendor={vendor}
          refreshData={() => setRefreshData(!refreshData)}
        />
      ) : (
        <ConfigureIntegrations
          vendorId={vendorId}
          refreshData={() => setRefreshData(!refreshData)}
        />
      )}
    </PageLayout>
  );
};

export default Integrations;
