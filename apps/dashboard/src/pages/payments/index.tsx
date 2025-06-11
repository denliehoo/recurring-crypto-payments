import { useEffect, useState } from 'react';
import PaymentsTable from '../../components/shared/PaymentsTable';
import { ScheduledPayment } from '@core/types';
import PageLayout from '@dashboard/components/layout/page-layout';
import { handleApiError } from '@core/utils';
import { apiGetPayments } from '@dashboard/api/payments/get-payments';

const Payments = () => {
  const [rows, setRows] = useState<ScheduledPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await apiGetPayments();

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
