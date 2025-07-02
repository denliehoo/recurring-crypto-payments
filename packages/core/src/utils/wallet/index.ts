import Web3 from 'web3';
import { EBlockchainNetwork } from '../../enum';
import {
  BLOCKCHAIN_ID_MAPPING,
  BLOCKCHAIN_CONFIG_MAPPING,
} from '../../constants';

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <TODO: Get proper typing>
    ethereum?: any;
  }
}

// in the future add in the chain as a param to ensure user is connected to correct chain
export const connectWallet = async (): Promise<Web3 | undefined> => {
  const chain = EBlockchainNetwork.SEP;
  try {
    if (window.ethereum) {
      // Requesting access to the user's MetaMask accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);

      // Set the default account
      web3.eth.defaultAccount = accounts[0];

      // change chain
      const networkId = await web3.eth.net.getId(); // int type
      let onCorrectChain = true;

      if (web3.utils.toHex(networkId) !== BLOCKCHAIN_ID_MAPPING[chain]) {
        // attempt to connect
        onCorrectChain = await attemptToChangeChain(chain);
        if (!onCorrectChain) {
          return undefined;
        }
      }

      return web3;
    }
    throw new Error('MetaMask is not installed');
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return undefined;
  }
};

const attemptToChangeChain = async (chain: EBlockchainNetwork) => {
  // try to switch, if can't switch (either because user reject or dont have the chain id), then will give error
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BLOCKCHAIN_ID_MAPPING[chain] }],
    });
    return true;
  } catch {
    // if user dont have the chain then we add it
    try {
      const results = await window.ethereum.request({
        jsonrpc: '2.0',
        method: 'wallet_addEthereumChain',
        params: [BLOCKCHAIN_CONFIG_MAPPING[chain]],
        id: 0,
      });

      if (!results) return false;
      return true;
    } catch {
      console.log('User rejected');
      return false;
      // maybe change address here or something to unsupported? Will this cause any problems?
    }
  }
};
