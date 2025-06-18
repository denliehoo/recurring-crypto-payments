import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { renderStatus } from '../../utils/renderTableCell';
import type { VendorClient } from '@core/types/VendorClient';
import PageLayout from '@dashboard/components/layout/page-layout';
import { apiGetCustomers } from '@dashboard/api/customers/get-customers';
import { handleApiError } from '@core/utils';

const columns: GridColDef<VendorClient>[] = [
  {
    field: '_id',
    headerName: 'Unique ID',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    valueGetter: (params) => params.row?.billingInfo?.name || '',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    valueGetter: (params) => params.row?.billingInfo?.email || '',
  },

  {
    field: 'wallet',
    headerName: 'Wallet',
    width: 400,
    valueGetter: (params) => params.row?.paymentMethod?.wallet || '',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: renderStatus,
  },
];

const Customers = () => {
  const [rows, setRows] = useState<VendorClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await apiGetCustomers();

        setRows(data);
        setIsLoading(false);
      } catch (err) {
        handleApiError(err);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <PageLayout isLoading={isLoading}>
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
    </PageLayout>
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
