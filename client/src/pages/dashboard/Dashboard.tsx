import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Chart on monthly payments */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            Chart on monthly payments...
          </Paper>
        </Grid>
        {/* Total monthly deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            Total monthly payments
          </Paper>
        </Grid>
        {/* Recent Payments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            Recen payments (a table) Date | Name | Wallet Address | Amount
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
