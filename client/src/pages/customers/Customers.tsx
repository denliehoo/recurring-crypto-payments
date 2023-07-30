// import classes from "./Customers.module.css";
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

const Customers = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const vendorDetails = useSelector((state: any) => state.vendorDetails);
  console.log(vendorDetails);
  useEffect(() => {
    const getData = async () => {
      try {
        const res: any = await apiCallAuth(
          "get",
          `/vendorclients/get-vendor-clients-by-vendor`
        );

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
      {/* <div>Top is number of total customers</div>
      <div>Below is a table of customers</div> 
      if havent done config, show havent done config component
      */}
      {/* Table */}
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
                  <TableCell>Unique ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Wallet</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="right">
                      {row?.billingInfo?.name}
                    </TableCell>
                    <TableCell align="right">
                      {row?.billingInfo?.email}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={row?.paymentMethod?.wallet}>
                        <span>
                          {row?.paymentMethod
                            ? `${row?.paymentMethod?.wallet.substring(
                                0,
                                4
                              )}...${row?.paymentMethod?.wallet.substring(
                                row?.paymentMethod?.wallet.length - 4
                              )}`
                            : ""}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
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

export default Customers;

// const rows = [
//   {
//     _id: "asasd",
//     name: "name", // billingInfo
//     email: "email", // billingInfo
//     wallet: "0x..", // paymentMethod
//     status: "active",
//   },
//   {
//     _id: "a123123",
//     name: "name",
//     email: "email",
//     wallet: "0x..",
//     status: "active",
//   },
//   {
//     _id: "as1e12e",
//     name: "name",
//     email: "email",
//     wallet: "0x..",
//     status: "active",
//   },
// ];
