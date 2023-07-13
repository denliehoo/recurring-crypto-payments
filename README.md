# recurring crypto payments

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

# Rough Todo:

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
