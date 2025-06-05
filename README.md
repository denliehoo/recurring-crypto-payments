# RecurCrypt

This is an application that allows vendors or users to accept recurring cryptocurrency payments from ERC20 tokens from stablecoins such as USDC and USDT.
This allows users to have a subscription-based model similar to stripe
Stack includes: MERN + Typescript + Solidity (Smart Contract) + AWS Lambda (cron job)

This is the overall flow of the integrations required:

1. Business signs up for an account at ReucrCrypt
2. Business completes the relevant integrations on their application (e.g. creation of ReurCrypt users, setting up webhooks, setting up a frontend that redirects users to the payments page, etc)

This is the overall flow of the clients on the businesses' web application:

1. The client is on the business web application and clicks on, for example, a "Manage Subscription" button
2. The client is redirected to a payments page which is hosted by RecurCrypt
3. The client initiates their subscription by:
   - Connecting their wallet
   - Ensuring that they have sufficient balance
   - Approving allowance for the smart contract for the token which will be used to pay
   - Fill in relevant details and click the confirm subscription button
4. Upon confirming their subscription, the tokens will be deducted from the client's wallet and transferred to the businesses' Smart Contract
5. RecurCrypt's database will add another pending payment which will be due next month
6. A webhook will be sent to the business's server (if integrated correctly) to inform the business that the user has begun their subscription. It is the responsibility of the business to handle the webhooks accordingly.
7. In the background, a CRON job (using AWS Lambda + EventBridge) is always running every few minutes to check for any payments that are due.
8. [Work In Progress] Slightly before the payment is due (e.g. a few days before), the CRON job will check whether the relevant wallets have sufficient balance and allowance. A reminder will be sent to the client through e-mail if they have insufficient balance or allowance.
9. When it is time for the next payment, the CRON job will automatically deduct the tokens from the client and transfer them to the business's Smart Contract, assuming sufficient balance and allowance. A webhook will be sent the the business sever to inform them that payments have been received.
10. However, if there is insufficient balance or allowance, the payment will fail and the subscription will be terminated. A webhook will also be sent to the businesses's server.

## End-to-end flow diagram

![Flow diagram](https://miro.medium.com/v2/resize:fit:720/format:webp/1*-281EueFK_7Z3ifrSoBx2A.png)

<!-- TODO: Proper documentation and explaination -->

# Project Structure

This app follows a **monorepo** structure:

```
apps/
  dashboard     # Client dashboard page
  checkout      # Client checkout page
  bff           # TODO: GraphQL layer for frontend to call server (certain APIs)
  server        # Backend server

packages/
  components    # Frontend UI components
  configs       # Shared application configs
  core          # Shared code among all apps and packages (e.g. types, utils)
```

- **apps/**: Contains all application entry points (frontend and backend).

  - **dashboard**: Main client dashboard.
  - **checkout**: Payment/checkout flow for clients.
  - **bff**: Backend-for-frontend GraphQL API layer.
  - **server**: Main backend server.

- **packages/**: Contains shared code and libraries.
  - **components**: Reusable frontend UI components.
  - **configs**: Shared application configs
  - **core**: Logic, types and utilities shared across all apps and packages.

This structure helps organize code for scalability and code sharing across multiple applications.

# Installation and running

This project requires the following dependencies:

- pnpm: Project uses pnpm 10.11.0
  - `npm install -g pnpm`
- node: Project uses node 22.14.0
- nodemon
  - `npm install -g nodemon`
- Mongodb (TODO: Instructions)

To install: `pnpm install`

### Client

To run client dasboard page:

- `pnpm dev:dashboard`

To run client checkout page:

- `pnpm dev:checkout`
<!-- Prod TBC -->

### Server

To run development server:

- First, Ensure mongodb is running first by running `mongod` in a separate terminal.
- `pnpm dev:server`

### contracts

Contracts TBC

<!-- cd client

- in 1 terminal: ganache-cli
- in another terminal: truffle migrate --reset
- or to test contracts: truffle test -->

# .env in server:

- .env.dev

```Javascript
DB_URL=mongodb://127.0.0.1:27017/recurring-crypto-payments
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_SEPOLIA
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=http://localhost:3031
FRONT_END_CHECKOUT_URL=http://localhost:3032
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
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_SEPOLIA
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=DEPLOYED_FRONTEND_URL
FRONT_END_CHECKOUT_URL=DEPLOYED_FRONTEND_CHECKOUT_URL
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=PROD
```

# .env in client:

<!-- Add for dashboard and checkout -->

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

- Master (0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7): https://sepolia.etherscan.io/address/0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7#code
- VendorContract (0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4): https://sepolia.etherscan.io/address/0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4#code
- FakeUSDT (0xC9606fea595Ed3a94B4c8548ca0C2252C7856E89): https://sepolia.etherscan.io/address/0xc9606fea595ed3a94b4c8548ca0c2252c7856e89#code
