import { useEffect, useState } from 'react';
import { apiCallAuth, handleApiError } from '../../utils/api-request';
import ConfigureIntegrationsFirst from '../../components/shared/ConfigureIntegrationsFirst';
import PaymentsTable from '../../components/shared/PaymentsTable';
import { useAppSelector } from '@dashboard/store';
import { ScheduledPayment } from '@core/types';

const Payments = () => {
  const [rows, setRows] = useState<ScheduledPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useAppSelector((state) => state.vendorDetails);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await apiCallAuth<ScheduledPayment[]>('get', `/payments/get-all-payments`);

        setRows(data);
        setIsLoading(false);
      } catch (err) {
        handleApiError(err);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!vendorDetails.vendorContract) {
    return <ConfigureIntegrationsFirst />;
  }

  return <PaymentsTable rows={rows} />;
};

export default Payments;
