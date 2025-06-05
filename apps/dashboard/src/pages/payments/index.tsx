import { useEffect, useState } from 'react';
import { apiCallAuth, handleApiError } from '../../utils/api-request';
import PaymentsTable from '../../components/shared/PaymentsTable';
import { ScheduledPayment } from '@core/types';
import PageLayout from '@dashboard/components/layout/page-layout';

const Payments = () => {
  const [rows, setRows] = useState<ScheduledPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <PageLayout isLoading={isLoading}>
      <PaymentsTable rows={rows} />
    </PageLayout>
  );
};

export default Payments;
