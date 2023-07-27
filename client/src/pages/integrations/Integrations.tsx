// import classes from "./Integrations.module.css";

import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { Vendor } from "../../../../shared/types/Vendor";
import { Box } from "@mui/material";
import ConfigureIntegrations from "./ConfigureIntegrations";
import ConfiguredIntergrations from "./ConfiguredIntegrations";

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorId, setVendorId] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const getVendorDetails = async () => {
      const res: any = await apiCallAuth("get", "/vendors/getVendorByToken");
      console.log(res);
      const {
        name,
        email,
        apiKey,
        webhookUrl,
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
  return (
    //Include API Keys, webhook, option to create contract, etc...

    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : vendor!.plan ? (
        // Have configured integrations
        <Box>
          <ConfiguredIntergrations vendorId={vendorId} vendor={vendor} />
        </Box>
      ) : (
        // Have not configured integrations
        <Box>
          <ConfigureIntegrations
            vendorId={vendorId}
            refreshData={() => setRefreshData(!refreshData)}
          />
        </Box>
      )}
    </div>
  );
};

export default Integrations;
