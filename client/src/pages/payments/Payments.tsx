// import classes from "./Payments.module.css";

// const Payments = () => {
//   return (
//     <div>
//       <div>Top is total number of payments</div>
//       <div>
//         Bottom is list of all payments (finished(completed/failed) and
//         scheduled(pending)) of which users can filter to see completed, failed
//         and scheduled payments
//       </div>
//     </div>
//   );
// };

// export default Payments;

// import classes from "./Payments.module.css";
// import classes from "./Payments.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { useSelector } from "react-redux";
import ConfigureIntegrationsFirst from "../../components/others/ConfigureIntegrationsFirst";
import { Tooltip } from "@mui/material";

const Payments = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useSelector((state: any) => state.vendorDetails);
  console.log(vendorDetails);
  useEffect(() => {
    const getData = async () => {
      try {
        const res: any = await apiCallAuth("get", `/payments/get-all-payments`);

        setRows(res.data);
        setIsLoading(false);
        console.log(res);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : !vendorDetails.vendorContract ? (
        <ConfigureIntegrationsFirst />
      ) : (
        <div>
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
                      {row.updatedAt}
                    </TableCell>
                    <TableCell align="right">{row.vendorClientId}</TableCell>
                    <TableCell align="right">{row.amount / 10 ** 6}</TableCell>
                    <TableCell align="right">USDT</TableCell>
                    <TableCell align="right">
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </TableCell>
                    <TableCell align="right">{row.paymentDate}</TableCell>
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
        </div>
      )}
    </div>
  );
};

export default Payments;
