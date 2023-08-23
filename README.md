# recurring crypto payments

RecurCrypt
This is a application that allows vendors or users to accept recurring cryptocurrency payments from ERC20 tokens from stable coins such as USDC and USDT.
This allows users to have a subscription based model similar to stripe
Stack includes: MERN + Typescript + Solidity (Smart Contract) + AWS Lambda (cron job)
This is the overall flow of the application:

1. User goes onto the frontend and approves an allowance for the smart contract for the stablecoin that they will be using to pay
2. User can then click on a button to begin their subscription. This button can only be clicked once the user has approved allowance for the smart contract
3. This button calls an API. This APIs then asks the smart contract to reduce the token balance from the user and add it to the smart contract
4. Simaltaneously, the API send data to the database that the user balance has been deducted and that their subscription has begun. Furthermore, it takes note of when is the next time (1month from now) that the user balance should be deducted again
5. Upon confirmation, a webhook event will be sent to the client and the client's servers will have to have setup the webhook for it.
6. One month later, this will probably be a cron job where by once it is time for the balance to be deducted again, a server will automatically use an API and reduce the user's balance again. Might be using AWS Lambda to execute this?
7. Same as step 5, upon confirmation, a webhook will be sent
8. However, if lets say the user doesnt have enough balance or smart contract doenst have any allowance, an email will be sent to the user's email to ask them to increase their balance

# client

- cd client
- npm start
- if running prod: npm run start:prod

# server

- cd server
- npm run dev

# contracts

cd client

- in 1 terminal: ganache-cli
- in another terminal: truffle migrate --reset
- or to test contracts: truffle test

# .env in server:

```Javascript
DB_URL=DB_URL_HERE_INSTRUCTIONS_BELOW
JWT_KEY=TEMPKEY
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=http://localhost:3031
MAILER_EMAIL=XXX
MAILER_PASSWORD=XXX
MAILER_APP_PASSWORD=XXX
```

- Note: ensure to change FRONT_END_URL after deployment

# .env in client:

- .env.dev

```Javascript
REACT_APP_ENV=DEV
REACT_APP_API_URL=http://localhost:3030
```

- .env.prod

```Javascript
REACT_APP_ENV=PROD
REACT_APP_API_URL=URL_OF_DEPLOYED_SERVER
```

# deployed smart contracts:

- Master (0x92971a37d9ea86ad18591A0f86A90E273439F19e): https://goerli.etherscan.io/address/0x92971a37d9ea86ad18591a0f86a90e273439f19e#code
- VendorContract (0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E): https://goerli.etherscan.io/address/0xEf8dfbCa537FEF7B71d0F37b404E8fc770Ac807E#code
- FakeUSDT (0xC2CA4DFa527902c440d71F162403A3BB93045a24): https://goerli.etherscan.io/address/0xc2ca4dfa527902c440d71f162403a3bb93045a24#code

# database

- Go to mongodb atlas to create an account: https://cloud.mongodb.com/
- Create a cluster
- Create an admin account during cluster creation (if havent) and assign it to the account
- In that cluster dashboard, click CONNECT -> choose MongoDB for VS Code -> you'll see what is the connection string there (e.g. mongodb+srv://usernamehere:password@yourclusterdetails.mongodb.net/)
- copy that connection string and replace password with the password you created for the admin account and place it in your envrionment variabls
- Go back to the atlas dashboard -> scroll down on the side bar to security -> choose network access
- Add this IP Address: 0.0.0.0/0 ; this will allow access from any IP address. By default, only the IP address of which you created the admin account will be there and this is for a security reason. Without allowing access from all IP addresses, when your server is deployed, you'll run into errors.

# server deployment

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

# AWS Cron:

- Go to AWS Lambda > Functions > Create Function and call the API
- In function > function overview > click add trigger > select EventBridge
- Create new rule > Schedule Expression > Schedule Expression: rate(1 hour) [basically one every hour] > Done
- If want to edit/end: go to the lambda function > click on the EventBridge > Select the Trigger (in Configurations tab) > click on the create schedule api > edit and save accordingly

# Note on testing external frontend:

- Can test external frontend manually by calling the get subscription page api along with the vendor , vendorclient and apikeys. Simply reseed the database and call the get all vendor clients api to get the the details, then input into the subscription page api
