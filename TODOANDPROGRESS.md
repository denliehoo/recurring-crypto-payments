# Todo:

- Proper linting (use biome)
- husky pre-hook commit
- HTTP-only cookie instead of local storage for JWT
- Re-do API routes properly
- Clean up APIs
- Build and deploy (test)
- GraphQL layer
- Upgrade to React 19
- Use react compiler
- Proper typing for contracts

- Give options for network and tokens; tokens available should be based of network
- Need get ABI data from API

# Future Task

- swap out mailing to a more reliable service e.g. twillio...
- Add invoices
- Improve smart contracts to have a multiple deduction so that can improve efficiency (by calling multiple deductions in one transaction instead of one by one). Possible flow for the new CRON API:
  1. For each of the payments, check the balance and allowance
  2. If ok, push to an array
  3. If not ok, delete scheduled payment and move to completed payment with failed, change user entity to cancelled, etc
  4. Continue with the array of ok payments, now call the multi reduce balance on the contract
  5. Look at the events (probably) emitted. And change the array accordingly
  6. For those that pass, do the move the scheduled payment to completed with completed status etc.
  7. For those that fail, means its likely a gas/congestion/etc... issue. Thus, just ignore it for now and let it be called again on the next api schedule (note: maybe change to call api every hour, but for ending within 4 hours. This is to ensure that e.g., if they dont get reduced because of e.g. gas issues, then at least still have 3 more attempts before the end subscription DB entity activates; )
  8. API finish
- Allow vendors to delete vendorclients on dashboard (which will also delete their pending scheduled payment if any)

# Non-critical bugs:

- Fix this non-critical error for recharts (in DashboardLineChart.tsx): ResizeObserver loop completed with undelivered notifications.
  at handleError (http://localhost:3031/static/js/bundle.js:128061:58)
  at http://localhost:3031/static/js/bundle.js:128080:7
- Bug fix for when hover over wallet address, cause things to move (TextWithTooltip.tsx); e.g. check in Payments; looks like an issue when in lower screen size and the table overflows. Temporarily showing full address instead in tables to prevent this issue
- For the CRON API, extend it and the relevant entities to check if enough balance and allowance (e.g. 3 days before) and remind them. To prevent being spammed, can e.g. set more data on the payment entity such as isSentEmail which is a false by default. Upon sending the email, it becomes true and we don't send the email reminder
- Do edge case of handling this error when calling initiate subscription API. (Basically it ran to an error that it was sent but not mined and might be mined. But since it is an error, it stopped the API there and didnt add scheduled payments etc ) Error: Error: Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined! at Object.TransactionError (/Users/denlie/Desktop/Coding/recurring-crypto-payments/server/node_modules/web3-core-helpers/lib/errors.js:90:21) at /Users/denlie/Desktop/Coding/recurring-crypto-payments/server/node_modules/web3-core-method/lib/index.js:426:49 at processTicksAndRejections (node:internal/process/task_queues:96:5) {receipt: undefined}
- Handle error on frontend for when fail to deduct balance

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
- 28/07/23: Connected get payout API to frontend
- 28/07/23: Request Payout Modal completeds; cleaned up frontend for payouts; clean up console errors for integrations modal
- 28/07/23: Redeploy vendor smart contracts( because of a fix in withdraw; previously withdraw doesnt reduce balance variable). Update ABI on server file and client. Change any hardcoded addresses
- 28/07/23: Basic Structure Of Customers page
- 31/07/23: Payments Page
- 31/07/23: Remarks field for completedPayments db entity
- 31/07/23: "Change payment method" function on frontend (external page) for when user wants to change payment method
  - Should change payment method
  - Should update the schedule payment to deduct the new address
- 01/08/23: Cancel Plan; added cancelled status to completed payment; added API for cancel plan; connected to frontend
- 01/08/23: Renew Plan feature
- 02/08/23: Refactored Modal into a custom component - CustomModal
- 02/08/23: Update billingInfo Modal
- 02/08/23: Add allowance button on frontend (external page)
- 03/08/23: Touch up frontend for external page
- 03/08/23: Add return URL in vendor db entity and updated accordingly on frontend
- 03/08/23: Logout functionality
- 04/08/23: Chart logic on frontend
- 07/08/23: Dashboard API and frontend
- 07/08/23: Refactor out external frontend APIs routes and controllers from payments and vendorClient to a separate route and controller: externalPage; change endpoints on frontend too
- 08/08/23: Skeleton for webhooks
- 10/08/23: Add 1 more DB Entity - pendingEndSubscription of which the CRON api will utilise.
  - For the this new DB entity, it is only created when user cancels subscription and has time left on the subscription.
  - Once subscription time is up, change the user status to "ended". Add this functionality into the CRON api
  - For vendorClient add an additional status: ended, which makes subscription has ended. The difference between cancel and ended being that for cancelled, it is only cancelled but hasnt't ended yet; i.e. the user still has time left in the subscription. Whereas for ended, it means subscription has already ended. Thus upon failure to pay, for the cron api, status becomes ended and not cancelled
  - Update the frontend in the respective places for the scenarios of the new status: ended
- 11/08/23: Add instructions on integrations page on how to integrate (once integrations configured)
- 11/08/23: Simulate sending webhook to the vendor upon successful XXX
- 13/08/23: Replace tables with DataGrid which allows for filtering, sorting, pagination, etc..
- 14/08/23: Enhanced registration/login process and page and moved certain variables to environmental variables
- 14/08/23: Mailing service by sending gmail through Nodejs; reference: https://miracleio.me/snippets/use-gmail-with-nodemailer
- 14/08/23: Vendors now need to confirm email before being able to access account
- 20/08/23: Server deployed, AWS CRON setup
- 23/08/23: Add hash for Payments tab and split client environments into prod and dev
- 23/08/23: Ensure user connects to correct network
- 23/08/23: Split environments for server into dev and prod
- 24/08/23: Frontend deployment
- 27/09/23: Updated Integrations Instructions
