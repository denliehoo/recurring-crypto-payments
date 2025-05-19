import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  AvatarGroup,
  Divider,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";

import {
  Receipt,
  TagRounded,
  KeyboardBackspace,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  activeSampleData,
  cancelledSampleData,
  inactiveSampleData,
} from "../../utils/manageSubscriptionExternalSampleDatas";
import ConfigurePlanModal from "./ConfigurePlanModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CancelPlanModal from "./CancelPlanModal";
import UpdateBillingInfoModal from "./UpdateBillingInfoModal";
import AddAllowanceModal from "./AddAllowanceModal";
import { capitalizeFirstLetter, formatDate } from "../../utils/transformText";
import ETHLogo from "../../assets/images/ETHLogo.png";
import USDTLogo from "../../assets/images/USDTLogo.png";

import { VendorClientSubscriptionDetails } from "@core/types";
import TextWithTooltip from "@components/src/text-tooltip";

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
  const [searchParams] = useSearchParams();
  const encodedAuthToken = searchParams.get("authToken");
  console.log(encodedAuthToken);
  const authToken = encodedAuthToken?.replace(/~/g, ".");

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] =
    useState<VendorClientSubscriptionDetails | null>(null);
  const [refreshData, setRefreshData] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const [configurePlanModal, setConfigurePlanModal] = useState(false);
  const [cancelPlanModal, setCancelPlanModal] = useState(false);
  const [updateBillingInfoModal, setUpdateBillingInfoModal] = useState(false);
  const [addAllowanceModal, setAddAllowanceModal] = useState(false);
  const isSmOrUp = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const headers = {
          Authorization: authToken,
        };
        const res = await axios.get(
          `${apiUrl}/externalPage/get-subscription-page-details`,
          {
            headers,
          }
        );

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
  }, [refreshData]);

  const textBasedOnStatus = (
    active: string,
    inactive: string,
    cancelled: string,
    ended: string
  ) => {
    const status = details!.status;
    if (status === "active") return active;
    if (status === "inactive") return inactive;
    if (status === "cancelled") return cancelled;
    return ended;
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {
          <Grid
            item
            xs={false}
            sm={4}
            md={4}
            sx={{
              width: "100%",
              position: "fixed",
              height: isSmOrUp ? "100%" : "15%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "30px",
                alignItems: "flex-start",
                backgroundColor: "black",
                width: "100%",
                height: "100%",
                color: "white",
              }}
            >
              <Box
                sx={{
                  marginTop: isSmOrUp ? "30%" : "none",
                  height: "70%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {isSmOrUp && (
                  <Typography variant="h5">
                    Manage your {details!.vendor} Billing Settings
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { color: "lightgray", cursor: "pointer" },
                  }}
                  onClick={() => (window.location.href = details!.returnUrl!)}
                >
                  <KeyboardBackspace />
                  <Typography>Return to {details!.vendor}</Typography>
                </Box>
                {isSmOrUp && (
                  <Typography sx={{ mt: "auto" }}>
                    Powered by RecurCrypt
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        }
        <Grid sm={4} md={4} />
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              marginTop: isSmOrUp ? "30px" : "150px",
            }}
          >
            <Typography component="h1" variant="h5">
              Current Plan
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  backgroundColor:
                    details!.status === "active" ? "#d7f7c2" : "#e3e8ed",
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "5px",
                }}
              >
                {capitalizeFirstLetter(details!.status)}
              </Box>
              <Box>{details!.plan}</Box>
              <Box>
                {details!.amount / 10 ** 6} {details!.token} per month
              </Box>
              <Box>
                {textBasedOnStatus(
                  `Your plan will auto renew on ${formatDate(
                    details!.nextDate!
                  )}`,
                  "",
                  `Your plan has been cancelled and will stop on ${formatDate(
                    details!.nextDate!
                  )}
                  `,
                  `Your plan has been ended since ${formatDate(
                    details!.nextDate!
                  )}
                  `
                )}
              </Box>
              <Button
                variant="contained"
                onClick={() =>
                  // if active, cancel plan modal, if inactive/cancelled, configure plan
                  details!.status === "active"
                    ? setCancelPlanModal(true)
                    : setConfigurePlanModal(true)
                }
              >
                {textBasedOnStatus("Cancel ", "Start ", "Renew ", "Renew ")}
                Plan
              </Button>
            </Box>

            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Payment method
            </Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {details?.paymentMethod?.wallet ? (
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Allowance</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <AvatarGroup>
                          <Avatar src={USDTLogo} />
                          <Avatar src={ETHLogo} />
                        </AvatarGroup>
                        <span style={{ marginLeft: "10px" }}>
                          {details!.paymentMethod!.token} (ERC20)
                        </span>
                      </TableCell>
                      <TableCell>
                        <TextWithTooltip
                          text={details!.paymentMethod!.wallet}
                          shortened={true}
                        />
                      </TableCell>
                      <TableCell>
                        {details!.paymentMethod!.sufficientAllowance ? (
                          <CheckCircle />
                        ) : (
                          <Cancel />
                        )}
                      </TableCell>
                      <TableCell>
                        {details!.paymentMethod!.sufficientBalance ? (
                          <CheckCircle />
                        ) : (
                          <Cancel />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              ) : (
                <Box>You have no payment methods</Box>
              )}
              {details!.status !== "inactive" && (
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setConfigurePlanModal(true)}
                  >
                    Change Method
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => setAddAllowanceModal(true)}
                  >
                    Change Allowance
                  </Button>
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
                  <Button
                    variant="contained"
                    onClick={() => setUpdateBillingInfoModal(true)}
                  >
                    Update
                  </Button>
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
                    {formatDate(i.date)}
                    {/* <IconButton onClick={() => console.log(i.invoice)}>
                      <Receipt />
                    </IconButton> */}
                    <IconButton>
                      <a href={i.hash} target="_blank" rel="noreferrer">
                        <TagRounded />
                      </a>
                    </IconButton>
                    {i.amount / 10 ** 6} {i.token} {i.status}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Grid>
        {configurePlanModal && (
          <ConfigurePlanModal
            configurePlanModal={configurePlanModal}
            closeConfigurePlanModal={() => setConfigurePlanModal(false)}
            tokenAddress={details!.tokenAddress}
            token={details!.token}
            amount={details!.amount}
            vendorContract={details!.vendorContract}
            authToken={authToken}
            status={details!.status}
            currentWallet={details?.paymentMethod?.wallet}
            refreshData={() => setRefreshData(!refreshData)}
            nextDate={details?.nextDate}
          />
        )}
        {addAllowanceModal && (
          <AddAllowanceModal
            modalIsOpen={addAllowanceModal}
            closeModal={() => setAddAllowanceModal(false)}
            tokenAddress={details!.tokenAddress}
            token={details!.token}
            amount={details!.amount}
            vendorContract={details!.vendorContract}
            authToken={authToken}
            currentWallet={details?.paymentMethod?.wallet}
            refreshData={() => setRefreshData(!refreshData)}
          />
        )}
        {cancelPlanModal && (
          <CancelPlanModal
            cancelPlanModal={cancelPlanModal}
            closeCancelPlanModal={() => setCancelPlanModal(false)}
            refreshData={() => setRefreshData(!refreshData)}
            authToken={authToken}
          />
        )}
        {updateBillingInfoModal && (
          <UpdateBillingInfoModal
            modalIsOpen={updateBillingInfoModal}
            closeModal={() => setUpdateBillingInfoModal(false)}
            billingInfo={details?.billingInfo}
            authToken={authToken}
            refreshData={() => setRefreshData(!refreshData)}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
}

// export default function ManageSubscriptionExternal() {
//   return <div>Helloworld s</div>;
// }
