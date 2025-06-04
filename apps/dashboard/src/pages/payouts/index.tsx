import { Box, Divider, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import ConfigureIntegrationsFirst from '../../components/shared/ConfigureIntegrationsFirst';
import { useEffect, useState } from 'react';
import CustomButton from '@components/button';
import RequestPayoutModal from './components/request-payout-modal';
import { apiCallAuth } from '../../utils/api-request';
import TagIcon from '@mui/icons-material/Tag';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { renderAmount, renderDate } from '../../utils/renderTableCell';

const columns: GridColDef[] = [
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
  const [rows, setRows] = useState<any[]>([]);
  const [owner, setOwner] = useState('');
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
    //   tokenAddress: "0xc9606fea595ed3a94b4c8548ca0c2252c7856e89",
    //   amount: 15000000,
    //   vendorContract: "0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4",
    //   plan: "Testing Company Premium Plan",
    // };

    // setOwner(fakeOwner);
    // setRows(fakeRows);
    // setPendingBalance(fakePendingBalance);
    // setVendorDetails(fakeVendor);
    const getDetails = async () => {
      try {
        const res: any = await apiCallAuth('get', '/payments/get-payouts-details');

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
              <Typography>You currently have {pendingBalance / 10 ** 6} USDT Pending</Typography>
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
          ) : (
            <ConfigureIntegrationsFirst />
          )}
        </div>
      )}
    </div>
  );
};

export default Payouts;
