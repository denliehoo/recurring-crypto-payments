import type React from 'react';
import { Paper, TableContainer } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  renderAmount,
  renderDate,
  renderStatus,
} from '../../utils/renderTableCell';

interface Row {
  _id: string;
  updatedAt: string;
  vendorClientId: string;
  amount: number;
  status: string;
  paymentDate: string;
  remarks?: string;
  userAddress: string;
  hash?: string;
  paymentMethod?: {
    wallet: string;
  };
}

interface Props {
  rows: Row[];
}

const columns: GridColDef[] = [
  {
    field: 'updatedAt',
    headerName: 'Date',
    width: 130,
    renderCell: renderDate,
  },
  {
    field: 'vendorClientId',
    headerName: 'User Id',
    width: 220,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 80,
    renderCell: renderAmount,
  },
  {
    field: 'token',
    headerName: 'Token',
    width: 100,
    renderCell: () => <span>USDT</span>,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: renderStatus,
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 150,
    renderCell: renderDate,
    // sortComparator: (v1, v2) => {
    //   const date1 = new Date(v1);
    //   const date2 = new Date(v2);
    //   return date2.getTime() - date1.getTime();
    // },
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 180,
  },
  {
    field: 'hash',
    headerName: 'Hash',
    width: 300,
  },
  {
    field: 'userAddress',
    headerName: 'Wallet',
    width: 370,
  },
];

interface PaymentsTableProps {
  rows: any[];
  hideFooter?: boolean;
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ rows, hideFooter }) => {
  return (
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
        hideFooter={hideFooter}
      />
    </TableContainer>
  );
};

export default PaymentsTable;
