import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { VendorClientSubscriptionDetails } from "../../types/VendorClientSubscriptionDetails";
import { Receipt, TagRounded } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  activeSampleData,
  cancelledSampleData,
  inactiveSampleData,
} from "../../utils/manageSubscriptionExternalSampleData";
import StartPlanModal from "./StartPlanModal";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ManageSubscriptionExternal() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] =
    useState<VendorClientSubscriptionDetails | null>(null);

  const [startPlanModal, setStartPlanModal] = useState(false);
  useEffect(() => {
    // simulate got this from call API
    // const sampleData = activeSampleData;
    const sampleData = inactiveSampleData;
    // const sampleData = cancelledSampleData;
    setDetails(sampleData);
    setIsLoading(false);
  }, []);

  const textBasedOnStatus = (
    active: string,
    inactive: string,
    cancelled: string
  ) => {
    const status = details!.status;
    if (status === "active") return active;
    if (status === "inactive") return inactive;
    return cancelled;
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <Box>Manage your {details!.vendor} Billing Settings</Box>
            <Box>Return to {details!.vendor}</Box>
            <Box>Powered by RecurCrypt</Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5">
              Current Plan
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              <Box>{details!.plan}</Box>
              <Box>
                {details!.amount} {details!.token} per month
              </Box>
              <Box>
                {textBasedOnStatus(
                  `Your plan will auto renew on ${details!.nextDate?.toString()}`,
                  "",
                  `Your plan has been cancelled and ${
                    details?.nextDate && details.nextDate > new Date()
                      ? "will stop on"
                      : "has stopped since"
                  } ${details!.nextDate?.toString()}`
                )}
              </Box>
              {details!.status === "inactive" && (
                <Button
                  variant="contained"
                  onClick={() => setStartPlanModal(true)}
                >
                  Start Plan
                </Button>
              )}
            </Box>

            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Payment method
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {details!.paymentMethod ? (
                <Box>
                  [Logo]{details!.paymentMethod!.token}{" "}
                  {details!.paymentMethod!.wallet}{" "}
                  {details!.paymentMethod!.sufficientAllowance ? "y" : "n"}{" "}
                  {details!.paymentMethod!.sufficientBalance ? "y" : "n"} ...{" "}
                  <Button variant="contained">Add allowance</Button>
                </Box>
              ) : (
                <Box>You have no payment methods</Box>
              )}
              {details!.status !== "inactive" && (
                <Box>
                  {/* open modal to metamask */}
                  <Button variant="contained"> Change Payment Method</Button>
                </Box>
              )}
            </Box>

            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Billing Information
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {details!.status !== "inactive" ? (
                <Box>
                  <Box>Name: {details!.billingInfo!.name}</Box>
                  <Box>Billing Address: {details!.billingInfo!.address}</Box>
                  <Button variant="contained">Update information</Button>
                </Box>
              ) : (
                <Box>You have no billing details</Box>
              )}
            </Box>

            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Invoice History
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {!details!.invoices.length ? (
                <Box>You have no invoices </Box>
              ) : (
                details!.invoices.map((i) => (
                  <Box>
                    {i.date.toString()}
                    <IconButton onClick={() => console.log(i.invoice)}>
                      <Receipt />
                    </IconButton>
                    <IconButton onClick={() => console.log(i.hash)}>
                      <TagRounded />
                    </IconButton>
                    {i.amount} {i.token} {i.status}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Grid>
        {startPlanModal && (
          <StartPlanModal
            startPlanModal={startPlanModal}
            closeStartPlanModal={() => setStartPlanModal(false)}
            tokenAddress={details!.tokenAddress}
            token={details!.token}
            amount={details!.amount}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
}
