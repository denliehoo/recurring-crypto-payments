import { Box, Divider, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import ConfigureIntegrationsFirst from '../../components/shared/ConfigureIntegrationsFirst';
import { useEffect, useState } from 'react';
import CustomButton from '@components/button';
import RequestPayoutModal from './request-payout-modal';
import { apiCallAuth } from '../../utils/api-request';
import TagIcon from '@mui/icons-material/Tag';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { renderAmount, renderDate } from '../../utils/renderTableCell';
import { GetPayoutsApiResponse, Payout, Vendor } from '@core/types';

const columns: GridColDef<Payout>[] = [
  {
    field: 'payoutDate',
    headerName: 'Date',
    width: 250,
    renderCell: renderDate,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    renderCell: renderAmount,
  },
  {
    field: 'token',
    headerName: 'Token',
    width: 150,
  },
  {
    field: 'hash',
    headerName: 'Hash',
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton>
        <a
          href={`https://sepolia.etherscan.io/tx/${params.value}`}
          target="_blank"
          rel="noreferrer"
        >
          <TagIcon />
        </a>
      </IconButton>
    ),
  },
];

const Payouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestPayoutModal, setRequestPayoutModal] = useState(false);
  const [rows, setRows] = useState<Payout[]>([]);
  const [owner, setOwner] = useState('');
  const [pendingBalance, setPendingBalance] = useState('0');
  const [vendorDetails, setVendorDetails] = useState<Vendor | undefined>(undefined);
  const [refreshData, setRefreshData] = useState(true);

  // TODO: Figure out why most GET API calls are double calling
  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await apiCallAuth<GetPayoutsApiResponse>(
          'get',
          '/payments/get-payouts-details'
        );

        const { payouts, pendingBalance, owner, vendor } = data;
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

  // TODO: Refactor Loading, configureintfirst(config), content as a HOCC to be reused
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!vendorDetails?.tokenAddress) {
    return <ConfigureIntegrationsFirst />;
  }

  return (
    <Box>
      <Typography variant="h5">Payouts</Typography>
      <Typography>You currently have {parseInt(pendingBalance) / 10 ** 6} USDT Pending</Typography>
      <CustomButton
        variant="contained"
        onClick={() => setRequestPayoutModal(true)}
        text="Request Payout"
        fullWidth
        disabled={pendingBalance.toString() === '0'} // disable if no usdt pending
      />
      <Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="h5">Payout History</Typography>
        <TableContainer sx={{ mt: 2 }} component={Paper}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.payoutDate.toString()}
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
  );
};

export default Payouts;
