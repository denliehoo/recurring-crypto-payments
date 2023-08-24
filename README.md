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

- .env.dev

```Javascript
DB_URL=mongodb://127.0.0.1:27017/recurring-crypto-payments
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=http://localhost:3031
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=DEV
```

- .env.prod

```Javascript
DB_URL=DB_URL_INSTRUCTIONS_IN_DOCUMENTATION
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=DEPLOYED_FRONTEND_URL
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=PROD
```

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
