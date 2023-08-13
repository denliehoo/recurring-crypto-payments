// import classes from "./Customers.module.css";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { useSelector } from "react-redux";
import ConfigureIntegrationsFirst from "../../components/shared/ConfigureIntegrationsFirst";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { renderStatus } from "../../utils/renderTableCell";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "Unique ID",
    width: 250,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    valueGetter: (params) => params.row?.billingInfo?.name || "",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    valueGetter: (params) => params.row?.billingInfo?.email || "",
  },

  {
    field: "wallet",
    headerName: "Wallet",
    width: 400,
    valueGetter: (params) => params.row?.paymentMethod?.wallet || "",
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: renderStatus,
  },
];

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
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              autoHeight
            />
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
