# Database

- Go to mongodb atlas to create an account: https://cloud.mongodb.com/
- Create a cluster
- Create an admin account during cluster creation (if havent) and assign it to the account
- In that cluster dashboard, click CONNECT -> choose MongoDB for VS Code -> you'll see what is the connection string there (e.g. mongodb+srv://usernamehere:password@yourclusterdetails.mongodb.net/)
- copy that connection string and replace password with the password you created for the admin account and place it in your envrionment variabls
- Go back to the atlas dashboard -> scroll down on the side bar to security -> choose network access
- Add this IP Address: 0.0.0.0/0 ; this will allow access from any IP address. By default, only the IP address of which you created the admin account will be there and this is for a security reason. Without allowing access from all IP addresses, when your server is deployed, you'll run into errors.

# Server deployment

Server deployment is done using Render

- https://dashboard.render.com/
- New > Web Service
- Connect to github repository
- Build & Deploy settings:
  - Branch: main
  - Root directory: server
  - build command: npm install [ensure that it has server/ before it]
  - start command: npm start [ensure server/ before it]
  - auto-deploy: no [can be yes if want]
- Add environmental values that are already in the server. In addition add this environmental value:
  - NODE_VERSION=16.15.1
  - Need to specify node version because the default version of 14.x.x doesn't have the CRYPTO module. Thus will face issue when running the server. This issue can be prevent by specifying the node version in env values; hence it will use that node version instead. Note: can use other versions as long as it has the crypto module. Using 16.x.x because that is the version used on my local machine
- Deploy it and wait
- To redeploy: push commit to github, click on manual deploy on the webserver > deploy latest commit > wait and done

# Frontend deployment

- refer to : https://hackernoon.com/how-to-deploy-a-react-application-with-firebase-hosting-p92m37b7

# AWS Cron

- Go to AWS Lambda > Functions > Create Function and call the API [Code below]
- In function > function overview > click add trigger > select EventBridge
- Create new rule > Schedule Expression > Schedule Expression: rate(1 hour) [basically one every hour] > Done
- If want to edit/end: go to the lambda function > click on the EventBridge > Select the Trigger (in Configurations tab) > click on the create schedule api > edit and save accordingly

```Javascript
import https from "https";

export const handler = async (event) => {
  const apiKey = "API_KEY_HERE";
  const apiUrl = 'BASE_SERVER_URL_HERE';
  const path = '/payments/cron-api';

  const options = {
    method: 'POST',
    path: path,
    headers: {
      'Authorization': apiKey
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl + path, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        console.log('Response Data:', data);
        resolve(data);
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });

    req.end();
  });
};
```

# Note on testing external frontend

- Can test external frontend manually by calling the get subscription page api along with the vendor , vendorclient and apikeys. Simply reseed the database and call the get all vendor clients api to get the the details, then input into the subscription page api

# Mailer documentation

- refer to: https://miracleio.me/snippets/use-gmail-with-nodemailer
