// import classes from "./Payouts.module.css";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import ConfigureIntegrationsFirst from "../../components/others/ConfigureIntegrationsFirst";
import { useEffect, useState } from "react";
import CustomButton from "../../components/UI/CustomButton";
import RequestPayoutModal from "./components/RequestPayoutModal";
import { apiCallAuth } from "../../utils/apiRequest";
import TagIcon from "@mui/icons-material/Tag";

const Payouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestPayoutModal, setRequestPayoutModal] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [owner, setOwner] = useState("");
  const [pendingBalance, setPendingBalance] = useState(0);
  const [vendorDetails, setVendorDetails] = useState<any>(null);
  const [refreshData, setRefreshData] = useState(true);
  useEffect(() => {
    // const fakeRows = [
    //   { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
    //   { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
    //   { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
    //   { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
    // ];
    // const fakePendingBalance = 150;
    // const fakeOwner = "0x....";
    // const fakeVendor = {
    //   _id: "64c2043072184fcf2675c591",
    //   name: "Test Company",
    //   email: "test@test.com",
    //   password: "$2b$10$4aQ/nKWB4okDNEHlmlwnduNzjCDcAZBN0DqNJjEazsb65gOT1xylq",
    //   apiKey:
    //     "sk-ac469da4-37bf-4930-9750-38e36d209877d20b4e27-dac5-4959-ad54-42940bf05f7e3a0cda4a-dd1b-4c04-802b-7676ea76ed2b",
    //   webhookUrl: "https://testing.com",
    //   tokenAddress: "0xC2CA4DFa527902c440d71F162403A3BB93045a24",
    //   amount: 15000000,
    //   vendorContract: "0xEff966e8fA76014FFBb88B1F356e991058eDdfee",
    //   plan: "Testing Company Premium Plan",
    // };

    // setOwner(fakeOwner);
    // setRows(fakeRows);
    // setPendingBalance(fakePendingBalance);
    // setVendorDetails(fakeVendor);
    const getDetails = async () => {
      try {
        const res: any = await apiCallAuth(
          "get",
          "/payments/get-payouts-details"
        );
        console.log(res);
        const { payouts, pendingBalance, owner, vendor } = await res!.data;
        setOwner(owner);
        setRows(payouts);
        setPendingBalance(pendingBalance);
        setVendorDetails(vendor);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getDetails();
  }, [refreshData]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {vendorDetails?.tokenAddress ? (
            <Box>
              <Typography variant="h5">Payouts</Typography>
              <Typography>
                You currently have {pendingBalance / 10 ** 6} USDT Pending
              </Typography>
              <CustomButton
                variant="contained"
                onClick={() => setRequestPayoutModal(true)}
                text="Request Payout"
                fullWidth
                disabled={pendingBalance === 0} // disable if no usdt pending
              />
              <Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant="h5">Payout History</Typography>
                <TableContainer sx={{ mt: 2 }} component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Token</TableCell>

                        <TableCell align="right">Hash</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length ? (
                        rows.map((row) => (
                          <TableRow
                            key={row.payoutDate.toString()}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {new Date(row.payoutDate).toLocaleString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                  hour12: true,
                                }
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {row.amount / 10 ** 6}
                            </TableCell>
                            <TableCell align="right">{row.token}</TableCell>
                            <TableCell align="right">
                              <IconButton>
                                <a
                                  href={`https://goerli.etherscan.io/tx/${row.hash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <TagIcon />{" "}
                                </a>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <Box>You have no payouts</Box>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              {requestPayoutModal && (
                <RequestPayoutModal
                  requestPayoutModal={requestPayoutModal}
                  closeRequestPayoutModal={() => setRequestPayoutModal(false)}
                  vendor={vendorDetails}
                  owner={owner}
                  refreshData={() => setRefreshData(!refreshData)}
                />
              )}
            </Box>
          ) : (
            <ConfigureIntegrationsFirst />
          )}
        </div>
      )}
    </div>
  );
};

export default Payouts;
