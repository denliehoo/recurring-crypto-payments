# Todo:

- update vendorclient entity to fit what is needed
- Continue on payments controller:
  - When user calls create a session, send them to the manage subscription page
  - create apis to "add" and "schedule" the payments
  - create apis to give the data to the page
- Do up manage subscription page on frontend and connect smart contract to it:
  - Connect wallet
  - Check balance
  - Check allowance
  - Confirm subscription

# Rough backlog

- Create smart contract POC
  - Do a factory style contract. Anyone can use this function to create the contract which has:
    - Constructor argument input address that will accept payments
    - Function to deduct the balance and transfer to the factory smart contract (need modifier to ensure only the AWS lambda contract / master contract can call it)
    - Function to withdraw crypto (need modifier such that only the vendor address as per the argument can withdraw the crypto)
    - Events emission
    - Hardcode to 1 "Fake" stablecoin for now
- Create a simple frontend that allows users to "subscribe" and manage their subscriptions
- Create a backend user database
- Create a simple frontend admin panel of which users can get API keys
- Set up a server which listens to users creating a checkout session of which it should return a URL to the simple frontend to subscribe
- Upon successful checkout, send webhook to user telling them that subscription has begun, to achieve this:
  - User first need to approve allowance for the smart contract
  - Need to listen for approval of allowance and upon approval, try to deduct the balance
  - Need to listen to smart contract event upon receive the crypto
  - need ask user for an API secret on the admin dashboard and what link we should is the url to send the webhook to
    - In the future maybe create a package like stripe so that we dont need to ask users for API secret
  - Then, send webhook to user about the successful checkout with a session id (so users can manage their subscription)
  - and, a webhook that payments were successful
- Upon successful checkout, also need to "add" that we should deduct from the user balance next month
  - Thus need to somehow set up a CRON job for this with AWS Lambda
- Upon reaching time to pay,
  - CRON job calls the smart contract function to deduct the balance (has they need to private keys and smart contract only allows them to do deduction)
  - Send webhook to app
- Need set up a server which listens to users managing their checkout session of which they must put their id and checkout session id
  - Users can cancel their subscription here and upon doing so:
    - cancels the pending CRON job
    - sends a webhook to the app to let them know client has cancelled
- Need create documentation and sample code to teach users how to use and what to do

# Done

- 13/07/23: Initialised server, client and contracts with some basic boiler plate
- 13/07/23: Basic folder structure and code for user entity in server
- 13/07/23: Smart contract POC
- 13/07/23: Basic user entity
- 14/07/23: Renamed user entity to vendor entity for clarity. Also created basic VendorClients entity
- 14/07/23: VendorClient done but with no auth yet
- 14/07/23: Skeleton for payments controller
- 17/07/23: Skeleton for frontend of external manage subscription page
- 18/07/23: Updated vendor entity to match what is needed and started on payments controller
