import { CssBaseline, ThemeProvider, useMediaQuery, Grid } from '@mui/material';
import axios from 'axios';
import { VendorClientSubscriptionDetails } from 'core';
import { useState, useEffect } from 'react';
import CheckoutPage from './pages/checkout-page';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
    },
  },
});

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const encodedAuthToken = searchParams.get('authToken');

  const authToken = encodedAuthToken?.replace(/~/g, '.');

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<VendorClientSubscriptionDetails | null>(null);
  const [refreshData, setRefreshData] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      console.log(`url: ${apiUrl}/externalPage/get-subscription-page-details`);
      try {
        const headers = {
          Authorization: authToken,
        };
        const res = await axios.get(`${apiUrl}/externalPage/get-subscription-page-details`, {
          headers,
        });

        setDetails(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    getData();

    // simulate got this from call API
    // const sampleData = activeSampleData;
    // const sampleData = inactiveSampleData;
    // const sampleData = cancelledSampleData;

    // setDetails(sampleData);
    // setIsLoading(false);
  }, [refreshData]);

  const isShowLoader = isLoading || !details || !authToken;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {isShowLoader ? (
          <div>Loading</div>
        ) : (
          <CheckoutPage
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            details={details}
            authToken={authToken}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
