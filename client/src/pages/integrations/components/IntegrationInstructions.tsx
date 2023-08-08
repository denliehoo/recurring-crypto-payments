import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const IntegrationInstructions = () => {
  const createVendorClient = `
  const headers = {
    Authorization: YOUR_API_KEYS,
  };

  const res = await axios.post(
    \`apiUrl/vendorClients/create/YOUR_RECURCRYPT_ID\`,
    null,
    {
      headers,
    }
  );

  const vendorClientId = await res.data._id; 
  // save the vendorClientId in your database for the given user...
`;
  const subscriptionSession = `
const headers = {
  Authorization: YOUR_API_KEYS,
};

const body = {
  vendor: YOUR_RECURCRYPT_ID,
  venorClient: VENDOR_CLIENT_ID
};

const res = await axios.post(
  \`apiUrl/externalPage/manage-subscription\`,
  body,
  {
    headers,
  }
);

const urlToRedirect = await res.data.url
// redirect your user on your frontend to the urlToRedirect...
`;

  const listenToWebHook = `
app.post(YOUR_CONFIGURED_WEBHOOK_URL, async(req, res) => {
  const {event, timestamp, data} = req.body;
  const auth = req.headers.authorization

  // please ensure to store your API Keys securely; ensure it is not shown in any repositories
  if (auth !== YOUR_API_KEY)
      return res.status(401).json({ error: "Incorrect API Key" });

  // handle the webhook 
  switch(event){
    // when client first subscribes
    case SUBSCRIPTION_BEGUN:
        // handle accordingly
        break;
    
    // when client cancels their subscription. Note: this doesn't mean their subscription term has ended
    case SUBSCRIPTION_CANCELLED:
        // handle accordingly
        break;

    // when a client who cancelled their subscription renews their subscription
    case SUBSCRIPTION_RENEWED:
        // handle accordingly
        break;

    // when a client's subscription term has come to an end
    case SUBSCRIPTION_ENDED:
        // handle accordingly
        break;
    
    // when a client succesfully pays to continue their subscription
    case SUBSCRIPTION_CONTINUED:
        // handle accordingly
        break;

    case SUCCESSFUL_PAYMENT:
        // handle accordingly
        break;

    case FAILED_PAYMENT:
        // handle accordingly
        break;

    default:
        console.log(unhandled event)
  }   
  
  // send a response as a confirmation
  return res.status(204).end()

});
`;

  return (
    <Box>
      <Typography variant="h5">Integration in 3 Easy steps</Typography>
      <Box>
        <Typography variant="h6">1. Customer Creation</Typography>
        <Typography>
          During, customer creation, create a vendor client and save it to your
          database. This can be done by making an API call to
          apiUrl/vendorClients/create/:id where id refers to your RecurCrypt ID
          [Note to self, add ID field in integrations page]
        </Typography>
        <SyntaxHighlighter language="javascript" style={tomorrowNight}>
          {createVendorClient}
        </SyntaxHighlighter>
      </Box>
      <Box>
        <Typography variant="h6">
          2. Set UpCustomer Subscription Session
        </Typography>
        <Typography>
          [Note to self ensure API and API validation is correct].... Next, make
          a post request to apiUrl/externalPage/manage-subscription along with
          your RecurCrypt ID and the client's ID. The api will return a URL of
          which you should redirect your users to. At that redirected page,
          users can manage their subscription
        </Typography>
        <SyntaxHighlighter language="javascript" style={tomorrowNight}>
          {subscriptionSession}
        </SyntaxHighlighter>
      </Box>
      <Box>
        <Typography variant="h6">3. Listen to webhook events </Typography>
        <Typography>
          [Note to self set up webhook]... Next, you will have to configure your
          server to listen to webhook events. Such events includes: initiation
          of subscription, cancellation of subscription, renewal of
          subscription, end of subscription, client failed payments, client
          successful payments, etc..
        </Typography>
        <SyntaxHighlighter language="javascript" style={tomorrowNight}>
          {listenToWebHook}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default IntegrationInstructions;
