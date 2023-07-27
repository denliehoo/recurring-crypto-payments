import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DisplayField from "../../components/UI/DisplayField";

const ConfiguredIntergrations = (props: any) => {
  const { vendor, vendorId } = props;
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Integrations
      </Typography>
      <Typography sx={{ mb: 2 }}>
        These are your configured integrations details
      </Typography>
      <DisplayField text={vendor.apiKey} hideOption={true} label={"API Keys"} />
      <DisplayField
        text={vendor.vendorContract}
        hideOption={false}
        label={"Your Contract Address"}
      />

      <DisplayField
        text={vendor.webhookUrl}
        hideOption={false}
        label={"Webhook Url"}
      />
      <DisplayField text={vendor.plan} hideOption={false} label={"Plan"} />
      <DisplayField text={vendor.amount} hideOption={false} label={"Amount"} />
      <DisplayField
        text={vendor.tokenAddress}
        hideOption={false}
        label={"Token Address"}
      />

      <Typography>INSTRUCTIONS ON INTEGRATION HERE</Typography>
    </Box>
  );
};

export default ConfiguredIntergrations;
