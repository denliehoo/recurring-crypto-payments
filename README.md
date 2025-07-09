# RecurCrypt

RecurCrypt is a full-stack application that enables businesses to accept recurring cryptocurrency payments using ERC20 stablecoins like USDC and USDT. It provides a subscription-based model similar to Stripe, built on the blockchain.

## Teck stack

- **Frontend:**

  - **React**
  - **TypeScript**
  - **MUI (Material-UI)**
  - **Zustand:** A small, fast, and scalable state-management solution.
  - **Rspack:** A high-performance web bundler for building our frontend assets.

<!-- - **BFF (Backend-for-Frontend):**

  - **GraphQL:** A query language for our API that empowers the frontend to request exactly the data it needs.
  - **Apollo Server:** A robust GraphQL server, integrated with Express, that acts as the single entry point for our frontend and orchestrates data from downstream services. -->

- **Backend:**

  - **Node.js**
  - **TypeScript**
  - **Express**
  - **MongoDB**

- **Blockchain:**

  - **Solidity:** The primary language for writing smart contracts on Ethereum and other compatible blockchains.

- **DevOps & Tooling:**
  - **AWS Lambda:** Used for running serverless functions, such as our cron jobs.
  <!-- - **GitHub Actions:** For our Continuous Integration and Continuous Deployment (CI/CD) pipelines. -->
  - **Husky:** To manage and run Git hooks, ensuring code quality before commits.
  - **Biome:** A high-performance toolchain for linting, formatting, and more.
  - **pnpm:** A fast, disk space-efficient package manager.
  - **Monorepo:** A single repository containing multiple distinct projects with well-defined relationships.

## How It Works

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

## Project Structure

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

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: `v22.14.0`
- **pnpm**: `v10.11.0` (`npm install -g pnpm`)
- **nodemon**: (`npm install -g nodemon`)
- **MongoDB**: Must be installed and running locally.
<!--TODO: Add instructions for mongo db installation  -->

### Running locally

**1. Clone the repository**

**2. Configure Local Domains**

You need to map local subdomains to your localhost IP. Add the following lines to your hosts file:

```sh
127.0.0.1 recurcrypt-dashboard.denliehoo.localhost
127.0.0.1 recurcrypt-checkout.denliehoo.localhost
127.0.0.1 recurcrypt-api.denliehoo.localhost
```

- On macOS/Linux: Edit the file at `/etc/hosts`.

  1. In terminal: `vim /etc/host`s OR `code /etc/hosts`
  2. Add the above code snippet to the bottom and save

- For Windows:
  1. Search for Notepad in applications, right click and run as administrator
  2. In the notepad, go to FIle> Open
  3. Navigate to `C:\Windows\System32\Drivers\etc\`
  4. For file type, change from `\*.txt` to `All files`
  5. Select hosts
  6. Paste the above snippet into the file and save
  7. Search for cmd in applications, right click and run as administrator
  8. Type `ipconfig /flushdns` and press enter

**3. Install Dependencies**

Navigate to the project root and run:
`pnpm install`

**4. Environment Configuration**

`apps/server/.env.dev`

```Javascript
DB_URL=mongodb://127.0.0.1:27017/recurring-crypto-payments
JWT_KEY=YOUR_OWN_KEY_HERE
WEB3_PROVIDER=WEB3_PROVIDER_URL_EXAMPLE_INFURA_SEPOLIA
OWNER_WALLET_ADDRESS=WALLET_ADDRESS_OF_OWNER_OF_MAIN_VENDOR_CONTRACT
OWNER_PRIVATE_KEY=PRIVATE_KEY_OF_OWNER
CRON_API_KEY=RECUR_CRYPT_CRON_API_KEY_HERE
FRONT_END_URL=http://recurcrypt-dashboard.denliehoo.localhost:3031
FRONT_END_CHECKOUT_URL=http://recurcrypt-checkout.denliehoo.localhost:3032
MAILER_EMAIL=YOUR_MAILER_EMAIL
MAILER_PASSWORD=YOUR_MAILER_PASSWORD
MAILER_APP_PASSWORD=YOUR_MAILER_APP_PASSWORD
PORT=3030
ENV=DEV
```

`apps/server/.env.prod`

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

`apps/dashboard/.env.dev` and `apps/checkout/.env.dev`

```Javascript
REACT_APP_ENV=DEV
REACT_APP_API_URL=http://recurcrypt-api.denliehoo.localhost:3030
```

`apps/dashboard/.env.prod` and `apps/checkout/.env.prod`

```Javascript
REACT_APP_ENV=PROD
REACT_APP_API_URL=URL_OF_DEPLOYED_SERVER
```

**4. Run the application**

- To run client dasboard page: `pnpm dev:dashboard`
- To run client checkout page:`pnpm dev:checkout`
- To run deployment server:
  - First, Ensure mongodb is running first by running `mongod` in a separate terminal.
- `pnpm dev:server`

<!-- TODO: Contracts -->
<!-- cd client

- in 1 terminal: ganache-cli
- in another terminal: truffle migrate --reset
- or to test contracts: truffle test -->

### Prod:

- To build client dasboard page: `pnpm prod:dashboard`
- To build client checkout page:`pnpm prod:checkout`
- To run server in prod mode: `pnpm prod:server`
- To build and run prod server:
  - `pnpm prod:build-server`
  - `pnpm prod:server-dist`
  - Note: won't be able to test the built server due to lack of env configs. This is purely for deployment only.

## Deployed smart contracts:

These contracts are deployed on the Sepolia Testnet.

- Master (0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7): https://sepolia.etherscan.io/address/0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7#code
- VendorContract (0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4): https://sepolia.etherscan.io/address/0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4#code
- FakeUSDT (0xC9606fea595Ed3a94B4c8548ca0C2252C7856E89): https://sepolia.etherscan.io/address/0xc9606fea595ed3a94b4c8548ca0c2252c7856e89#code

## Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for code formatting and linting.  
For the best experience, install the Biome extension in your code editor.

**Common commands:**

- **Format all files:**

  ```sh
  pnpm format:write
  ```

- **Check for linting issues:**

  ```sh
  pnpm lint:read
  ```

- **Automatically fix linting issues:**
  ```sh
  pnpm lint:write
  ```
