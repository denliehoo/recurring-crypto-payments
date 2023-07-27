import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DisplayField from "../../../components/UI/DisplayField";
import EditConfigurationsModal from "./EditConfigurationsModal";

const ConfiguredIntergrations = (props: any) => {
  const { vendor, vendorId, refreshData } = props;
  const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Integrations</Typography>
        <Button variant="contained" onClick={() => setEditModalOpen(true)}>
          Edit
        </Button>
      </Box>
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
        text={vendor.tokenAddress}
        hideOption={false}
        label={"Token Address"}
      />
      <DisplayField
        text={(vendor.amount / 10 ** 6).toString()}
        hideOption={false}
        label={"Monthly Subscription Price"}
      />
      <DisplayField
        text={vendor.name}
        hideOption={false}
        label={"Business Name"}
      />
      <DisplayField
        text={vendor.webhookUrl}
        hideOption={false}
        label={"Webhook Url"}
      />
      <DisplayField text={vendor.plan} hideOption={false} label={"Plan"} />

      {editModalOpen && (
        <EditConfigurationsModal
          editModalOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          vendor={vendor}
          vendorId={vendorId}
          refreshData={refreshData}
        />
      )}

      <Typography>INSTRUCTIONS ON INTEGRATION HERE</Typography>
    </Box>
  );
};

export default ConfiguredIntergrations;
