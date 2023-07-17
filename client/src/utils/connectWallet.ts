import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async (): Promise<Web3 | undefined> => {
  try {
    if (window.ethereum) {
      // Requesting access to the user's MetaMask accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);

      // Set the default account
      web3.eth.defaultAccount = accounts[0];

      return web3;
    } else {
      throw new Error("MetaMask is not installed");
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return undefined;
  }
};
