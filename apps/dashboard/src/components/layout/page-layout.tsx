import type { FC, ReactNode } from 'react';
import ConfigureIntegrationsFirst from '../shared/configure-integrations-first';
import { useAppSelector } from '@dashboard/store';
import LoadingOverlay from '@components/loading-overlay';
interface IPageLayoutProps {
  isLoading: boolean;
  children: ReactNode;
}

const PageLayout: FC<IPageLayoutProps> = ({ isLoading, children }) => {
  const vendorDetails = useAppSelector((state) => state.vendorDetails);
  const { vendorContract, tokenAddress } = vendorDetails;
  // If no vendorContract and token address, means user has not configured integrations
  const isIntegrationsConfigured = vendorContract && tokenAddress;

  if (!isIntegrationsConfigured) {
    return <ConfigureIntegrationsFirst />;
  }
  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      {children}
    </>
  );
};

export default PageLayout;
