// import classes from "./Payouts.module.css";
import {
  Box,
  Button,
  Divider,
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

const Payouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useSelector((state: any) => state.vendorDetails);
  const [payoutModal, setPayoutModal] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [pendingBalance, setPendingBalance] = useState(0);

  useEffect(() => {
    const fakeRows = [
      { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
      { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
      { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
      { payoutDate: new Date(), amount: 10, token: "USDT", hash: "0x..." },
    ];
    const fakePendingBalance = 150;
    setRows(fakeRows);
    setPendingBalance(fakePendingBalance);
    setIsLoading(false);
  }, []);

  return (
    <div>
      {vendorDetails.tokenAddress ? (
        <Box>
          <Typography variant="h5">Payouts</Typography>
          <Typography>
            You currently have {pendingBalance} USDT Pending
          </Typography>
          <CustomButton
            variant="contained"
            onClick={() => setPayoutModal(true)}
            text="Request Payout"
            fullWidth
            // disabled={true} // disable if no usdt pending
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.payoutDate.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.payoutDate.toString()}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.token}</TableCell>
                      <TableCell align="right">{row.hash}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <ConfigureIntegrationsFirst />
      )}
    </div>
  );
};

export default Payouts;
