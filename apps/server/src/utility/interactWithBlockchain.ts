import Web3 from 'web3';
import RecurringPayments from '../contractABIs/RecurringPayments.json';
import FakeUSDT from '../contractABIs/FakeUSDT.json';

export const sendReduceUserBalanceTransactionasync = async (
  userAddress: string,
  amount: string,
): Promise<string | null> => {
  try {
    // Create a Web3 instance connected to a provider (e.g., Infura)
    const web3 = new Web3(process.env.WEB3_PROVIDER || '');

    // Contract address and ABI of master contract
    const contractAddress = '0x8880DA75707ea777c0bdFBbF679b56cfac41a7d7';
    const contract = new web3.eth.Contract(
      RecurringPayments.abi as any,
      contractAddress,
    );

    const senderAddress = process.env.OWNER_WALLET_ADDRESS || '';
    const senderPrivateKey = process.env.OWNER_PRIVATE_KEY || '';

    const contractMethod = contract.methods.reduceUserBalance(
      userAddress,
      amount,
    );
    const transactionData = contractMethod.encodeABI();

    const nonce = await web3.eth.getTransactionCount(senderAddress);
    let gasPrice: string | number = await web3.eth.getGasPrice();
    // Add 20% to the gas price to reduce chances of timeout error
    // since higher gas price = faster mined (temporary solution)
    // parseInt to ensure no decimals (which would cause errors)
    gasPrice = Math.ceil(Number.parseInt(gasPrice) * 1.2);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(300000);

    const transactionObject = {
      from: senderAddress,
      to: contractAddress,
      nonce: web3.utils.toHex(nonce),
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      data: transactionData,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject as any,
      senderPrivateKey,
    );

    // Broadcast the signed transaction
    // wait for up to 100 blocks (default 50); this is to prevent error from being thrown
    // however still need to handle the problem properly in the future
    // e.g. leave it as pending
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction || '',
    );
    // .on('transactionHash', (hash: any) => {
    //   // can get the hash even if transaction times out
    //   // might be useful for edge case
    //   // console.log(hash);
    // });

    console.log('Transaction receipt:', receipt);

    // Check if the transaction was successful
    if (receipt.status === true) {
      return receipt.transactionHash;
    }
    return null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const isAllowanceAndBalanceSufficient = async (
  userAddress: string,
  vendorTokenAddress: string,
  vendorContractAddress: string,
  amount: number,
): Promise<[boolean, boolean]> => {
  const web3 = new Web3(process.env.WEB3_PROVIDER || '');
  const tokenContract = new web3.eth.Contract(
    FakeUSDT.abi as any,
    vendorTokenAddress,
  );

  const balance: string = await tokenContract.methods
    .balanceOf(userAddress)
    .call();
  const allowance: string = await tokenContract.methods
    .allowance(userAddress, vendorContractAddress)
    .call();

  const sufficientAllowance: boolean = Number.parseFloat(allowance) >= amount;
  const sufficientBalance: boolean = Number.parseFloat(balance) >= amount;

  return [sufficientAllowance, sufficientBalance];
};
