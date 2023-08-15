//       <div>Top is total number of payments</div>
//         Bottom is list of all payments (finished(completed/failed) and
//         scheduled(pending)) of which users can filter to see completed, failed
//         and scheduled payments

import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { useSelector } from "react-redux";
import ConfigureIntegrationsFirst from "../../components/shared/ConfigureIntegrationsFirst";
import PaymentsTable from "../../components/shared/PaymentsTable";

const Payments = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useSelector((state: any) => state.vendorDetails);

  useEffect(() => {
    const getData = async () => {
      try {
        const res: any = await apiCallAuth("get", `/payments/get-all-payments`);

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
