// import classes from "./Integrations.module.css";

import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { Vendor } from "../../../../shared/types/Vendor";
import { Box } from "@mui/material";
import ConfigureIntegrations from "./ConfigureIntegrations";

const Integrations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>(null);
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
      setIsLoading(false);
    };
    getVendorDetails();
  }, []);
  return (
    //Include API Keys, webhook, option to create contract, etc...

    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : vendor!.plan ? (
        // Have configured integrations
        <Box>Integrations Done</Box>
      ) : (
        // Have not configured integrations
        <Box>
          <ConfigureIntegrations />
        </Box>
      )}
    </div>
  );
};

export default Integrations;
