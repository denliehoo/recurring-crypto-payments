import { useEffect, useState } from 'react';
import { apiCallAuth } from '../../utils/api-request';
import ConfigureIntegrationsFirst from '../../components/shared/ConfigureIntegrationsFirst';
import PaymentsTable from '../../components/shared/PaymentsTable';
import { useAppSelector } from '@dashboard/store';

const Payments = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useAppSelector((state) => state.vendorDetails);

  useEffect(() => {
    const getData = async () => {
      try {
        const res: any = await apiCallAuth('get', `/payments/get-all-payments`);

        setRows(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : !vendorDetails.vendorContract ? (
        <ConfigureIntegrationsFirst />
      ) : (
        <div>
          <PaymentsTable rows={rows} />
        </div>
      )}
    </div>
  );
};

export default Payments;
