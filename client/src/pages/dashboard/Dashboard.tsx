import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PaymentsTable from "../../components/shared/PaymentsTable";
import DashboardLineChart from "./components/DashboardLineChart";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiCallAuth } from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfigureIntegrationsFirst from "../../components/shared/ConfigureIntegrationsFirst";

// import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const vendorDetails = useSelector((state: any) => state.vendorDetails);

  // console.log(vendorDetails);

  useEffect(() => {
    const clientTimezone = Math.abs(new Date().getTimezoneOffset() / 60);
    const getDashboard = async () => {
      const res: any = await apiCallAuth(
        "get",
        `/payments/get-dashboard?utc=${clientTimezone}`
      );
      console.log(res);

      setDashboard({
        chartData: res?.data?.chartData,
        pendingBalance: res?.data?.pendingBalance,
        recentPayments: res?.data?.recentPayments,
        totalDaily: res?.data?.totalDaily,
      });
      // setDashboard({
      //   chartData: [],
      //   pendingBalance: 0,
      //   recentPayments: [],
      //   totalDaily: 0,
      // });
      setIsLoading(false);
    };
    getDashboard();
  }, []);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <DashboardLineChart rows={dashboard.chartData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Typography variant="h5">Daily Total</Typography>
            <Box>
              <Typography variant="h6">
                {dashboard.totalDaily / 10 ** 6} USDT
              </Typography>
            </Box>
            <Typography variant="h5">Pending</Typography>
            <Box>
              <Typography variant="h6">
                {dashboard.pendingBalance / 10 ** 6} USDT
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => navigate("/payouts")}>
              Claim
            </Button>
          </Paper>
        </Grid>
        {/* Recent Payments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <PaymentsTable rows={dashboard.recentPayments} />

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => navigate("/payments")}>
                View All
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

/*
const generateSampleData = () => {
  let data = [];
  const generateRandomDate = () => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ); // Midnight today
    const randomTime = Math.floor(
      Math.random() * (now.getTime() - todayStart.getTime())
    );
    const randomDate = new Date(todayStart.getTime() + randomTime);
    return randomDate.toISOString();
  };
  for (let i = 0; i < 10; i++) {
    data.push({
      paymentDate: generateRandomDate(),
      amount: 15000000,
      // _id: "64ccad8c2a9f81053c2a0d85",
      // status: "paid",
      // hash: "0x9b3e9e7b548f7fd5b5e7bc53a011726aa1d004748de04eaea543e6e7854ffcc8",
      // remarks: null,
      // vendorContract: "0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E",
      // userAddress: "0x1B54FF756E2a04707826b95041C0e9123C6B4F23",
      // tokenAddress: "0xC2CA4DFa527902c440d71F162403A3BB93045a24",
      // vendorId: "64cb7ed74f631aee776a1dc3",
      // vendorClientId: "64cb7ed74f631aee776a1dc5",
      // createdAt: "2023-08-04T07:49:32.137Z",
      // updatedAt: "2023-08-04T07:49:32.137Z",
      // __v: 0,
    });
  }
  data.sort((a, b) => Date.parse(a.paymentDate) - Date.parse(b.paymentDate));

  return data;
};

const transformData = (data: any) => {
  let amounts: any = [
    { time: "00:00", amount: 0 },
    { time: "03:00", amount: 0 },
    { time: "06:00", amount: 0 },
    { time: "09:00", amount: 0 },
    { time: "12:00", amount: 0 },
    { time: "15:00", amount: 0 },
    { time: "18:00", amount: 0 },
    { time: "21:00", amount: 0 },
    { time: "24:00", amount: 0 },
  ];

  for (let d of data) {
    let indx = Math.ceil(new Date(d.paymentDate).getHours() / 3); // note that this basically converts UTC time to the client's timezone
    if (indx === 0) indx = 1; // take into account when hour = 0 (e.g. 00:23) since 0/3 = 0; but it should be in indx 1 instead
    amounts[indx].amount += d.amount / 10 ** 6; // USDT 6 decimals
  }

  const currentHourIndex = Math.ceil(new Date().getHours() / 3);
  console.log(currentHourIndex);

  for (let i = 1; i < currentHourIndex + 1; i++) {
    amounts[i].amount += amounts[i - 1].amount;
  }

  if (currentHourIndex === 8) return amounts; // if current time is between 21:00 and 24:00, just return the amounts
  for (let i = currentHourIndex + 1; i < amounts.length; i++) {
    amounts[i].amount = undefined;
  }
  return amounts;
};
*/
