import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from "@mui/material";
import { formatDate } from "../../utils/transformText";

interface Row {
  _id: string;
  updatedAt: string;
  vendorClientId: string;
  amount: number;
  status: string;
  paymentDate: string;
  remarks?: string;
  userAddress: string;
  paymentMethod?: {
    wallet: string;
  };
}

interface Props {
  rows: Row[];
}

const PaymentsTable: React.FC<Props> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">User Id</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Token</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Payment Date</TableCell>
            <TableCell align="right">Remarks</TableCell>
            <TableCell align="right">Wallet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatDate(new Date(row.updatedAt))}
              </TableCell>
              <TableCell align="right">{row.vendorClientId}</TableCell>
              <TableCell align="right">{row.amount / 10 ** 6}</TableCell>
              <TableCell align="right">USDT</TableCell>
              <TableCell align="right">
                {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
              </TableCell>
              <TableCell align="right">
                {formatDate(new Date(row.paymentDate))}
              </TableCell>
              <TableCell align="right">
                {row?.remarks ? row.remarks : ""}
              </TableCell>
              <TableCell align="right">
                <Tooltip title={row?.paymentMethod?.wallet}>
                  <span>
                    {`${row.userAddress.substring(
                      0,
                      4
                    )}...${row.userAddress.substring(
                      row.userAddress.length - 4
                    )}`}
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
