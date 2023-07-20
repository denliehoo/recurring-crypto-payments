import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Divider,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { VendorClientSubscriptionDetails } from "../../../../shared/types/VendorClientSubscriptionDetails";
import { Receipt, TagRounded, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  activeSampleData,
  cancelledSampleData,
  inactiveSampleData,
} from "../../utils/manageSubscriptionExternalSampleDatas";
import StartPlanModal from "./StartPlanModal";
import { useParams } from "react-router-dom";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          paddingTop: "2px",
          paddingBottom: "2px",
          paddingLeft: "10px",
          paddingRight: "10px",
        },
      },
    },
  },
});

export default function ManageSubscriptionExternal() {
  const { authToken } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] =
    useState<VendorClientSubscriptionDetails | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openThreeDots = Boolean(anchorEl);
  const handleThreeDotsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseThreeDots = () => {
    setAnchorEl(null);
  };
  const handleAddAllowance = () => {
    handleCloseThreeDots();
    console.log("Add allowance...");
    // other stuff here...
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const [startPlanModal, setStartPlanModal] = useState(false);
  useEffect(() => {
    console.log(authToken);
    const getData = async () => {
      try {
        const headers = {
          Authorization: authToken,
        };
        const res = await axios.get(
          `${apiUrl}/payments/get-subscription-page-details`,
          {
            headers,
          }
        );
        console.log(res);
        console.log(res.data.paymentMethod);
        setDetails(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();

    // simulate got this from call API
    // const sampleData = activeSampleData;
    // const sampleData = inactiveSampleData;
    // const sampleData = cancelledSampleData;

    // setDetails(sampleData);
    // setIsLoading(false);
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
                {details!.amount / 10 ** 6} {details!.token} per month
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
              {details?.paymentMethod?.wallet ? (
                // <Box>
                //   [Logo]{details!.paymentMethod!.token}{" "}
                //   {details!.paymentMethod!.wallet}{" "}
                //   {details!.paymentMethod!.sufficientAllowance ? "y" : "n"}{" "}
                //   {details!.paymentMethod!.sufficientBalance ? "y" : "n"} ...{" "}
                //   <Button variant="contained">Add allowance</Button>
                // </Box>
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Allowance</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        [Logo]{details!.paymentMethod!.token}{" "}
                      </TableCell>
                      <TableCell>
                        {details!.paymentMethod!.wallet.slice(0, 4)}...
                        {details!.paymentMethod!.wallet.slice(-4)}{" "}
                      </TableCell>
                      <TableCell>
                        {details!.paymentMethod!.sufficientAllowance
                          ? "y"
                          : "n"}
                      </TableCell>
                      <TableCell>
                        {details!.paymentMethod!.sufficientBalance ? "y" : "n"}
                      </TableCell>
                      {/* do a popup upon clicking the... with the add allowance optoin */}
                      <TableCell>
                        <IconButton
                          id="basic-button"
                          aria-controls={
                            openThreeDots ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openThreeDots ? "true" : undefined}
                          onClick={handleThreeDotsClick}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openThreeDots}
                          onClose={handleCloseThreeDots}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleAddAllowance}>
                            Add Allowance
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              ) : (
                <Box>You have no payment methods</Box>
              )}
              {details!.status !== "inactive" && (
                <Box>
                  {/* openThreeDots modal to metamask */}
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
                    {i.amount / 10 ** 6} {i.token} {i.status}
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
            vendorContract={details!.vendorContract}
            authToken={authToken}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
}
