import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const chainIds: any = {
  eth: '0x1',
  ftm: '0xFA',
  goerli: '0x5',
}

const chainConfig: any = {
  // other configs here...
  ftm: {
    chainId: '0xFA',
    chainName: 'Fantom',
    rpcUrls: ['https://rpc.ankr.com/fantom'],
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ftmscan.com'],
  },
}

// in the future add in the chain as a param to ensure user is connected to correct chain
export const connectWallet = async (): Promise<Web3 | undefined> => {
  const chain = "goerli"
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

      // change chain
      const networkId = await web3.eth.net.getId() // int type
      let onCorrectChain = true;

      if(web3.utils.toHex(networkId) !== chainIds[chain]){
        // attempt to connect
        onCorrectChain = await attemptToChangeChain(chain)
        if(!onCorrectChain){
          return undefined
        }
      }


      return web3;
    } else {
      throw new Error("MetaMask is not installed");
    }
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return undefined;
  }
};


const attemptToChangeChain = async (chain: any) => {
  // try to switch, if can't switch (either because user reject or dont have the chain id), then will give error
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIds[chain] }],
    })
    return true
  } catch {
    // if user dont have the chain then we add it
    try {
      const results = await window.ethereum.request({
        jsonrpc: '2.0',
        method: 'wallet_addEthereumChain',
        params: [chainConfig[chain]],
        id: 0,
      })

      if (!results) return false
      return true

    } catch {
      console.log('User rejected')
      return false
      // maybe change address here or something to unsupported? Will this cause any problems?
    }
  }
}