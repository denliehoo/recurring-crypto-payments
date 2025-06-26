import { EBlockchainNetwork } from '../enum';

export const BLOCKCHAIN_ID_MAPPING = {
  [EBlockchainNetwork.ETH]: '0x1',
  [EBlockchainNetwork.FTM]: '0xFA',
  [EBlockchainNetwork.SEP]: '0xAA36A7',
};

interface IAssetDetails {
  name: string;
  symbol: string;
  decimals: number;
}

interface IChainConfig {
  chainId: string; // Hexadecimal string, e.g., '0x1' for Ethereum Mainnet
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: IAssetDetails;
  blockExplorerUrls: string[];
}

export const BLOCKCHAIN_CONFIG_MAPPING: Record<
  EBlockchainNetwork,
  IChainConfig
> = {
  [EBlockchainNetwork.FTM]: {
    chainId: BLOCKCHAIN_ID_MAPPING[EBlockchainNetwork.FTM],
    chainName: 'Fantom',
    rpcUrls: ['https://rpc.ankr.com/fantom'],
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  [EBlockchainNetwork.ETH]: {
    chainId: BLOCKCHAIN_ID_MAPPING[EBlockchainNetwork.ETH],
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://eth.llamArpc.com'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [EBlockchainNetwork.SEP]: {
    chainId: BLOCKCHAIN_ID_MAPPING[EBlockchainNetwork.SEP],
    chainName: 'Sepolia Testnet',
    rpcUrls: [
      'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      'https://rpc.sepolia.org',
    ], // Replace YOUR_INFURA_PROJECT_ID
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'SEPETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
};
