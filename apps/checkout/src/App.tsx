import { CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import CheckoutPage from './pages/checkout-page';
import { createTheme } from '@mui/material/styles';
import { useSubcriptionDetail } from './store';
import { apiGetSubscriptionDetails } from './api/get-subscription-details';

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
  const details = useSubcriptionDetail((state) => state.details);
  const setDetails = useSubcriptionDetail((state) => state.setDetails);
  const refreshData = useSubcriptionDetail((state) => state.refreshData);
  const setAuthToken = useSubcriptionDetail((state) => state.setAuthToken);

  const searchParams = new URLSearchParams(window.location.search);
  const encodedAuthToken = searchParams.get('authToken');

  const authToken = encodedAuthToken?.replace(/~/g, '.');
  localStorage.setItem('JWT', authToken || '');
  setAuthToken(authToken || '');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiGetSubscriptionDetails();

        setDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (authToken) {
      getData();
    }

    // sample url: http://localhost:3032/?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9~eyJ2ZW5kb3IiOiI2ODI0YTUyOTAzMWQ1ZGM2ZGM3NzkwOWYiLCJ2ZW5kb3JDbGllbnQiOiI2ODI0YTUyOTAzMWQ1ZGM2ZGM3NzkwYTEiLCJleHAiOjE3NDc3NTQ1NjUsImlhdCI6MTc0NzY2ODE2NX0~W5Ck1wmOr2iZy1tb1BcYWBGeKypO-8JivYXM-4vG9Cc
    // simulate got this from call API
    // const sampleData = activeSampleData;
    // const sampleData = inactiveSampleData;
    // const sampleData = cancelledSampleData;

    // setDetails(sampleData);
    // setIsLoading(false);
  }, [refreshData, authToken]);

  const isShowLoader = isLoading || !details || !authToken;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {isShowLoader ? <div>Loading</div> : <CheckoutPage />}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
