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

cd client
npm start

# server

cd server
npm start

# contracts

cd client

- in 1 terminal: ganache-cli
- in another terminal: truffle migrate --reset
- or to test contracts: truffle test

# .env in server:

```Javascript
DB_URL=mongodb://127.0.0.1:27017/recurring-crypto-payments
JWT_KEY=TEMPKEY
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_GOERLI
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
```

# .env in client:

```Javascript
REACT_APP_API_URL=http://localhost:3030
```

# deployed smart contracts:

- Master (0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7): https://goerli.etherscan.io/address/0x8880da75707ea777c0bdfbbf679b56cfac41a7d7#code
- VendorContract (0xEff966e8fA76014FFBb88B1F356e991058eDdfee): https://goerli.etherscan.io/address/0xEff966e8fA76014FFBb88B1F356e991058eDdfee#code
- FakeUSDT (0xC2CA4DFa527902c440d71F162403A3BB93045a24): https://goerli.etherscan.io/address/0xc2ca4dfa527902c440d71f162403a3bb93045a24#code
