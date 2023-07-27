# Todo:

- Work on Payouts page
  - API for get payout data
  - Req Payout Modal
- "Change payment method" function on frontend for when user wants to change payment method
  - Should change payment method
  - Should update the schedule payment to deduct the new address
- Add allowance button on frontend
- Simulate sending webhook to the vendor upon successful XXX
- Frontend of admin panel

# Future Task

- Add instructions on integrations page on how to integrate (once integrations configured)
- Auth for api calls
- Use some AWS Lambda to set up a CRON job to call that api every X minute (e.g. 1 minute)
- For the CRON API, extend it and the relevant entities to check if enough balance and allowance (e.g. 3 days before) and remind them. To prevent being spammed, can e.g. set more data on the payment entity such as isSentEmail which is a false by default. Upon sending the email, it becomes true and we don't send the email reminder
- Do edge case of handling this error when calling initiate subscription API. (Basically it ran to an error that it was sent but not mined and might be mined. But since it is an error, it stopped the API there and didnt add scheduled payments etc ) Error: Error: Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined! at Object.TransactionError (/Users/denlie/Desktop/Coding/recurring-crypto-payments/server/node_modules/web3-core-helpers/lib/errors.js:90:21) at /Users/denlie/Desktop/Coding/recurring-crypto-payments/server/node_modules/web3-core-method/lib/index.js:426:49 at processTicksAndRejections (node:internal/process/task_queues:96:5) {receipt: undefined}
- Handle error on frontend for when fail to deduct balance
- Improve smart contracts to have a multiple deduction so that can improve efficiency (by calling multiple deductions in one transaction instead of one by one). Possible flow for the new CRON API:
  1. For each of the payments, check the balance and allowance
  2. If ok, push to an array
  3. If not ok, delete scheduled payment and move to completed payment with failed, change user entity to cancelled, etc
  4. Continue with the array of ok payments, now call the multi reduce balance on the contract
  5. Look at the events (probably) emitted. And change the array accordingly
  6. For those that pass, do the move the scheduled payment to completed with completed status etc.
  7. For those that fail, do same as 3.
  8. API finish

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
- 18/07/23: update vendorclient entity to fit what is needed
- 19/07/23: Set up and connected API to get details from external frontend; also created API to get the session for it. Note: in the future need change the manage subscription API to get the data from body cause currently getting it manually through code
- 19/07/23: Do up manage subscription page on frontend and connect smart contract to it:
  - Connect wallet [ok]
  - Check balance [ok]
  - Check allowance & approve allowance [ok]
- 20/07/23: Added fiels on frontend to get billingInfo, updated vendorclient entity, and added working function reduce user balance from server
- 20/07/23: Worked on Initiate subscription payments API. Now, API will reduce user balance, add billing info and invoice
- 20/07/23: Update get subscription details api to check for client balance and allowance and update the entity if needed. Updated frontend for payment methods
- 21/07/23: Create a new DB entity called ScheduledPayments which has info of the the payment such as: vendorContract, amount, token, date(to pay), etc..;Create a new DB entity called CompletedPayments which has same info as above + status of paid or failed and hash. Also wrote skeleton of apis in payment controller
- 21/07/23: Added controller helper functions for scheduledPayments and completedPayments; Worked on initiate subscription API to include adding scheduledPayment and completedPayment
- 21/07/23: Create the CRON api
- 25/07/23: CRON API test successful
- 26/07/23: Rough skeleton of frontend
- 26/07/23: Added redux and get vendor details by token
- 27/07/23: Configure Integrations for Integrations Page Completed
- 27/07/23: Integrations Page Completed
- 27/07/23: Added Payout database entity
