export const FakeUSDT = {
  contractName: 'FakeUSDT',
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'mint',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  metadata:
    '{"compiler":{"version":"0.8.0+commit.c7dfd78e"},"language":"Solidity","output":{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"project:/src/contracts/FakeUSDT.sol":"FakeUSDT"},"evmVersion":"istanbul","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"project:/src/contracts/FakeUSDT.sol":{"keccak256":"0x461b249839d66d6c95fd23a43759d6bc7253b269328080f7d43ad5bca72b1957","license":"UNLICENSED","urls":["bzz-raw://a36f852a0100777b005cc525fa3afecdde5460ce1381ba46c613e4e38b1f5f35","dweb:/ipfs/Qmc2spitpncFSMPZiKtjy7qviemxHP3e84ph3id7vtAM6R"]}},"version":1}',
  bytecode:
    '0x60806040523480156200001157600080fd5b506040518060400160405280600881526020017f46616b6555534454000000000000000000000000000000000000000000000000815250600090805190602001906200005f92919062000225565b506040518060400160405280600581526020017f555344544600000000000000000000000000000000000000000000000000000081525060019080519060200190620000ad92919062000225565b506006600260006101000a81548160ff021916908360ff160217905550620000e033633b9aca00620000e760201b60201c565b5062000473565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156200015b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001529062000328565b60405180910390fd5b81600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001ac919062000378565b925050819055508273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516200021391906200034a565b60405180910390a36001905092915050565b8280546200023390620003df565b90600052602060002090601f016020900481019282620002575760008555620002a3565b82601f106200027257805160ff1916838001178555620002a3565b82800160010185558215620002a3579182015b82811115620002a257825182559160200191906001019062000285565b5b509050620002b29190620002b6565b5090565b5b80821115620002d1576000816000905550600101620002b7565b5090565b6000620002e460198362000367565b91507f496e76616c696420726563697069656e742061646472657373000000000000006000830152602082019050919050565b6200032281620003d5565b82525050565b600060208201905081810360008301526200034381620002d5565b9050919050565b600060208201905062000361600083018462000317565b92915050565b600082825260208201905092915050565b60006200038582620003d5565b91506200039283620003d5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620003ca57620003c962000415565b5b828201905092915050565b6000819050919050565b60006002820490506001821680620003f857607f821691505b602082108114156200040f576200040e62000444565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6110ef80620004836000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806340c10f191161006657806340c10f191461013457806370a082311461016457806395d89b4114610194578063a9059cbb146101b2578063dd62ed3e146101e257610093565b806306fdde0314610098578063095ea7b3146100b657806323b872dd146100e6578063313ce56714610116575b600080fd5b6100a0610212565b6040516100ad9190610e04565b60405180910390f35b6100d060048036038101906100cb9190610c87565b6102a0565b6040516100dd9190610de9565b60405180910390f35b61010060048036038101906100fb9190610c38565b610392565b60405161010d9190610de9565b60405180910390f35b61011e6106f3565b60405161012b9190610ea1565b60405180910390f35b61014e60048036038101906101499190610c87565b610706565b60405161015b9190610de9565b60405180910390f35b61017e60048036038101906101799190610bd3565b61083d565b60405161018b9190610e86565b60405180910390f35b61019c610886565b6040516101a99190610e04565b60405180910390f35b6101cc60048036038101906101c79190610c87565b610914565b6040516101d99190610de9565b60405180910390f35b6101fc60048036038101906101f79190610bfc565b610b22565b6040516102099190610e86565b60405180910390f35b6000805461021f90610fea565b80601f016020809104026020016040519081016040528092919081815260200182805461024b90610fea565b80156102985780601f1061026d57610100808354040283529160200191610298565b820191906000526020600020905b81548152906001019060200180831161027b57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103809190610e86565b60405180910390a36001905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610403576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103fa90610e66565b60405180910390fd5b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610485576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047c90610e46565b60405180910390fd5b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610544576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053b90610e26565b60405180910390fd5b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105939190610f2e565b9250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105e99190610ed8565b9250508190555081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461067c9190610f2e565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106e09190610e86565b60405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076e90610e66565b60405180910390fd5b81600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107c69190610ed8565b925050819055508273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161082b9190610e86565b60405180910390a36001905092915050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6001805461089390610fea565b80601f01602080910402602001604051908101604052809291908181526020018280546108bf90610fea565b801561090c5780601f106108e15761010080835404028352916020019161090c565b820191906000526020600020905b8154815290600101906020018083116108ef57829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610985576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097c90610e66565b60405180910390fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610a07576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fe90610e46565b60405180910390fd5b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a569190610f2e565b9250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610aac9190610ed8565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b109190610e86565b60405180910390a36001905092915050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081359050610bb88161108b565b92915050565b600081359050610bcd816110a2565b92915050565b600060208284031215610be557600080fd5b6000610bf384828501610ba9565b91505092915050565b60008060408385031215610c0f57600080fd5b6000610c1d85828601610ba9565b9250506020610c2e85828601610ba9565b9150509250929050565b600080600060608486031215610c4d57600080fd5b6000610c5b86828701610ba9565b9350506020610c6c86828701610ba9565b9250506040610c7d86828701610bbe565b9150509250925092565b60008060408385031215610c9a57600080fd5b6000610ca885828601610ba9565b9250506020610cb985828601610bbe565b9150509250929050565b610ccc81610f74565b82525050565b6000610cdd82610ebc565b610ce78185610ec7565b9350610cf7818560208601610fb7565b610d008161107a565b840191505092915050565b6000610d18601683610ec7565b91507f496e73756666696369656e7420616c6c6f77616e6365000000000000000000006000830152602082019050919050565b6000610d58601483610ec7565b91507f496e73756666696369656e742062616c616e63650000000000000000000000006000830152602082019050919050565b6000610d98601983610ec7565b91507f496e76616c696420726563697069656e742061646472657373000000000000006000830152602082019050919050565b610dd481610fa0565b82525050565b610de381610faa565b82525050565b6000602082019050610dfe6000830184610cc3565b92915050565b60006020820190508181036000830152610e1e8184610cd2565b905092915050565b60006020820190508181036000830152610e3f81610d0b565b9050919050565b60006020820190508181036000830152610e5f81610d4b565b9050919050565b60006020820190508181036000830152610e7f81610d8b565b9050919050565b6000602082019050610e9b6000830184610dcb565b92915050565b6000602082019050610eb66000830184610dda565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610ee382610fa0565b9150610eee83610fa0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f2357610f2261101c565b5b828201905092915050565b6000610f3982610fa0565b9150610f4483610fa0565b925082821015610f5757610f5661101c565b5b828203905092915050565b6000610f6d82610f80565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610fd5578082015181840152602081019050610fba565b83811115610fe4576000848401525b50505050565b6000600282049050600182168061100257607f821691505b602082108114156110165761101561104b565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b61109481610f62565b811461109f57600080fd5b50565b6110ab81610fa0565b81146110b657600080fd5b5056fea2646970667358221220620f2e9502281f34bc420f2f19554203252fffa911db2443e253fc677cbf5a4e64736f6c63430008000033',
  deployedBytecode:
    '0x608060405234801561001057600080fd5b50600436106100935760003560e01c806340c10f191161006657806340c10f191461013457806370a082311461016457806395d89b4114610194578063a9059cbb146101b2578063dd62ed3e146101e257610093565b806306fdde0314610098578063095ea7b3146100b657806323b872dd146100e6578063313ce56714610116575b600080fd5b6100a0610212565b6040516100ad9190610e04565b60405180910390f35b6100d060048036038101906100cb9190610c87565b6102a0565b6040516100dd9190610de9565b60405180910390f35b61010060048036038101906100fb9190610c38565b610392565b60405161010d9190610de9565b60405180910390f35b61011e6106f3565b60405161012b9190610ea1565b60405180910390f35b61014e60048036038101906101499190610c87565b610706565b60405161015b9190610de9565b60405180910390f35b61017e60048036038101906101799190610bd3565b61083d565b60405161018b9190610e86565b60405180910390f35b61019c610886565b6040516101a99190610e04565b60405180910390f35b6101cc60048036038101906101c79190610c87565b610914565b6040516101d99190610de9565b60405180910390f35b6101fc60048036038101906101f79190610bfc565b610b22565b6040516102099190610e86565b60405180910390f35b6000805461021f90610fea565b80601f016020809104026020016040519081016040528092919081815260200182805461024b90610fea565b80156102985780601f1061026d57610100808354040283529160200191610298565b820191906000526020600020905b81548152906001019060200180831161027b57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103809190610e86565b60405180910390a36001905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610403576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103fa90610e66565b60405180910390fd5b600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610485576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047c90610e46565b60405180910390fd5b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610544576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053b90610e26565b60405180910390fd5b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105939190610f2e565b9250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105e99190610ed8565b9250508190555081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461067c9190610f2e565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106e09190610e86565b60405180910390a3600190509392505050565b600260009054906101000a900460ff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076e90610e66565b60405180910390fd5b81600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107c69190610ed8565b925050819055508273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161082b9190610e86565b60405180910390a36001905092915050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6001805461089390610fea565b80601f01602080910402602001604051908101604052809291908181526020018280546108bf90610fea565b801561090c5780601f106108e15761010080835404028352916020019161090c565b820191906000526020600020905b8154815290600101906020018083116108ef57829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610985576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097c90610e66565b60405180910390fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115610a07576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fe90610e46565b60405180910390fd5b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a569190610f2e565b9250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610aac9190610ed8565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b109190610e86565b60405180910390a36001905092915050565b6000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081359050610bb88161108b565b92915050565b600081359050610bcd816110a2565b92915050565b600060208284031215610be557600080fd5b6000610bf384828501610ba9565b91505092915050565b60008060408385031215610c0f57600080fd5b6000610c1d85828601610ba9565b9250506020610c2e85828601610ba9565b9150509250929050565b600080600060608486031215610c4d57600080fd5b6000610c5b86828701610ba9565b9350506020610c6c86828701610ba9565b9250506040610c7d86828701610bbe565b9150509250925092565b60008060408385031215610c9a57600080fd5b6000610ca885828601610ba9565b9250506020610cb985828601610bbe565b9150509250929050565b610ccc81610f74565b82525050565b6000610cdd82610ebc565b610ce78185610ec7565b9350610cf7818560208601610fb7565b610d008161107a565b840191505092915050565b6000610d18601683610ec7565b91507f496e73756666696369656e7420616c6c6f77616e6365000000000000000000006000830152602082019050919050565b6000610d58601483610ec7565b91507f496e73756666696369656e742062616c616e63650000000000000000000000006000830152602082019050919050565b6000610d98601983610ec7565b91507f496e76616c696420726563697069656e742061646472657373000000000000006000830152602082019050919050565b610dd481610fa0565b82525050565b610de381610faa565b82525050565b6000602082019050610dfe6000830184610cc3565b92915050565b60006020820190508181036000830152610e1e8184610cd2565b905092915050565b60006020820190508181036000830152610e3f81610d0b565b9050919050565b60006020820190508181036000830152610e5f81610d4b565b9050919050565b60006020820190508181036000830152610e7f81610d8b565b9050919050565b6000602082019050610e9b6000830184610dcb565b92915050565b6000602082019050610eb66000830184610dda565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610ee382610fa0565b9150610eee83610fa0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f2357610f2261101c565b5b828201905092915050565b6000610f3982610fa0565b9150610f4483610fa0565b925082821015610f5757610f5661101c565b5b828203905092915050565b6000610f6d82610f80565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610fd5578082015181840152602081019050610fba565b83811115610fe4576000848401525b50505050565b6000600282049050600182168061100257607f821691505b602082108114156110165761101561104b565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b61109481610f62565b811461109f57600080fd5b50565b6110ab81610fa0565b81146110b657600080fd5b5056fea2646970667358221220620f2e9502281f34bc420f2f19554203252fffa911db2443e253fc677cbf5a4e64736f6c63430008000033',
  immutableReferences: {},
  generatedSources: [
    {
      ast: {
        nodeType: 'YulBlock',
        src: '0:2377:5',
        statements: [
          {
            body: {
              nodeType: 'YulBlock',
              src: '153:177:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '163:74:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '229:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '234:2:5',
                        type: '',
                        value: '25',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '170:58:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '170:67:5',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '163:3:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '258:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '263:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '254:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '254:11:5',
                      },
                      {
                        kind: 'string',
                        nodeType: 'YulLiteral',
                        src: '267:27:5',
                        type: '',
                        value: 'Invalid recipient address',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '247:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '247:48:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '247:48:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '305:19:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '316:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '321:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '312:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '312:12:5',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '305:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '141:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '149:3:5',
                type: '',
              },
            ],
            src: '7:323:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '401:53:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '418:3:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '441:5:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '423:17:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '423:24:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '411:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '411:37:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '411:37:5',
                },
              ],
            },
            name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '389:5:5',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '396:3:5',
                type: '',
              },
            ],
            src: '336:118:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '631:248:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '641:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '653:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '664:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '649:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '649:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '641:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '688:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '699:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '684:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '684:17:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '707:4:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '713:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '703:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '703:20:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '677:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '677:47:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '677:47:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '733:139:5',
                  value: {
                    arguments: [
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '867:4:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '741:124:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '741:131:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '733:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '611:9:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '626:4:5',
                type: '',
              },
            ],
            src: '460:419:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '983:124:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '993:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '1005:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1016:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '1001:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1001:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '993:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '1073:6:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1086:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1097:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '1082:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1082:17:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '1029:43:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1029:71:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '1029:71:5',
                },
              ],
            },
            name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '955:9:5',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '967:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '978:4:5',
                type: '',
              },
            ],
            src: '885:222:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1209:73:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '1226:3:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '1231:6:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '1219:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1219:19:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '1219:19:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '1247:29:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '1266:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1271:4:5',
                        type: '',
                        value: '0x20',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '1262:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1262:14:5',
                  },
                  variableNames: [
                    {
                      name: 'updated_pos',
                      nodeType: 'YulIdentifier',
                      src: '1247:11:5',
                    },
                  ],
                },
              ],
            },
            name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '1181:3:5',
                type: '',
              },
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '1186:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'updated_pos',
                nodeType: 'YulTypedName',
                src: '1197:11:5',
                type: '',
              },
            ],
            src: '1113:169:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1332:261:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '1342:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '1365:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '1347:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1347:20:5',
                  },
                  variableNames: [
                    {
                      name: 'x',
                      nodeType: 'YulIdentifier',
                      src: '1342:1:5',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '1376:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '1399:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '1381:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1381:20:5',
                  },
                  variableNames: [
                    {
                      name: 'y',
                      nodeType: 'YulIdentifier',
                      src: '1376:1:5',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1539:22:5',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x11',
                            nodeType: 'YulIdentifier',
                            src: '1541:16:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1541:18:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1541:18:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '1460:1:5',
                      },
                      {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1467:66:5',
                            type: '',
                            value:
                              '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                          },
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '1535:1:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1463:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1463:74:5',
                      },
                    ],
                    functionName: {
                      name: 'gt',
                      nodeType: 'YulIdentifier',
                      src: '1457:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1457:81:5',
                  },
                  nodeType: 'YulIf',
                  src: '1454:2:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '1571:16:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '1582:1:5',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '1585:1:5',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '1578:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1578:9:5',
                  },
                  variableNames: [
                    {
                      name: 'sum',
                      nodeType: 'YulIdentifier',
                      src: '1571:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'checked_add_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'x',
                nodeType: 'YulTypedName',
                src: '1319:1:5',
                type: '',
              },
              {
                name: 'y',
                nodeType: 'YulTypedName',
                src: '1322:1:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'sum',
                nodeType: 'YulTypedName',
                src: '1328:3:5',
                type: '',
              },
            ],
            src: '1288:305:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1644:32:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '1654:16:5',
                  value: {
                    name: 'value',
                    nodeType: 'YulIdentifier',
                    src: '1665:5:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '1654:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '1626:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '1636:7:5',
                type: '',
              },
            ],
            src: '1599:77:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1733:269:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '1743:22:5',
                  value: {
                    arguments: [
                      {
                        name: 'data',
                        nodeType: 'YulIdentifier',
                        src: '1757:4:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1763:1:5',
                        type: '',
                        value: '2',
                      },
                    ],
                    functionName: {
                      name: 'div',
                      nodeType: 'YulIdentifier',
                      src: '1753:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1753:12:5',
                  },
                  variableNames: [
                    {
                      name: 'length',
                      nodeType: 'YulIdentifier',
                      src: '1743:6:5',
                    },
                  ],
                },
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '1774:38:5',
                  value: {
                    arguments: [
                      {
                        name: 'data',
                        nodeType: 'YulIdentifier',
                        src: '1804:4:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1810:1:5',
                        type: '',
                        value: '1',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '1800:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1800:12:5',
                  },
                  variables: [
                    {
                      name: 'outOfPlaceEncoding',
                      nodeType: 'YulTypedName',
                      src: '1778:18:5',
                      type: '',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1851:51:5',
                    statements: [
                      {
                        nodeType: 'YulAssignment',
                        src: '1865:27:5',
                        value: {
                          arguments: [
                            {
                              name: 'length',
                              nodeType: 'YulIdentifier',
                              src: '1879:6:5',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1887:4:5',
                              type: '',
                              value: '0x7f',
                            },
                          ],
                          functionName: {
                            name: 'and',
                            nodeType: 'YulIdentifier',
                            src: '1875:3:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1875:17:5',
                        },
                        variableNames: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '1865:6:5',
                          },
                        ],
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'outOfPlaceEncoding',
                        nodeType: 'YulIdentifier',
                        src: '1831:18:5',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '1824:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1824:26:5',
                  },
                  nodeType: 'YulIf',
                  src: '1821:2:5',
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1954:42:5',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x22',
                            nodeType: 'YulIdentifier',
                            src: '1968:16:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1968:18:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1968:18:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'outOfPlaceEncoding',
                        nodeType: 'YulIdentifier',
                        src: '1918:18:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '1941:6:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '1949:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '1938:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1938:14:5',
                      },
                    ],
                    functionName: {
                      name: 'eq',
                      nodeType: 'YulIdentifier',
                      src: '1915:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1915:38:5',
                  },
                  nodeType: 'YulIf',
                  src: '1912:2:5',
                },
              ],
            },
            name: 'extract_byte_array_length',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'data',
                nodeType: 'YulTypedName',
                src: '1717:4:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '1726:6:5',
                type: '',
              },
            ],
            src: '1682:320:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2036:152:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2053:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2056:77:5',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2046:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2046:88:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2046:88:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2150:1:5',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2153:4:5',
                        type: '',
                        value: '0x11',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2143:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2143:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2143:15:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2174:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2177:4:5',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '2167:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2167:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2167:15:5',
                },
              ],
            },
            name: 'panic_error_0x11',
            nodeType: 'YulFunctionDefinition',
            src: '2008:180:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2222:152:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2239:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2242:77:5',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2232:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2232:88:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2232:88:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2336:1:5',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2339:4:5',
                        type: '',
                        value: '0x22',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2329:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2329:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2329:15:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2360:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2363:4:5',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '2353:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2353:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2353:15:5',
                },
              ],
            },
            name: 'panic_error_0x22',
            nodeType: 'YulFunctionDefinition',
            src: '2194:180:5',
          },
        ],
      },
      contents:
        '{\n\n    function abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 25)\n\n        mstore(add(pos, 0), "Invalid recipient address")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n}\n',
      id: 5,
      language: 'Yul',
      name: '#utility.yul',
    },
  ],
  deployedGeneratedSources: [
    {
      ast: {
        nodeType: 'YulBlock',
        src: '0:8578:5',
        statements: [
          {
            body: {
              nodeType: 'YulBlock',
              src: '59:87:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '69:29:5',
                  value: {
                    arguments: [
                      {
                        name: 'offset',
                        nodeType: 'YulIdentifier',
                        src: '91:6:5',
                      },
                    ],
                    functionName: {
                      name: 'calldataload',
                      nodeType: 'YulIdentifier',
                      src: '78:12:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '78:20:5',
                  },
                  variableNames: [
                    {
                      name: 'value',
                      nodeType: 'YulIdentifier',
                      src: '69:5:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '134:5:5',
                      },
                    ],
                    functionName: {
                      name: 'validator_revert_t_address',
                      nodeType: 'YulIdentifier',
                      src: '107:26:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '107:33:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '107:33:5',
                },
              ],
            },
            name: 'abi_decode_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'offset',
                nodeType: 'YulTypedName',
                src: '37:6:5',
                type: '',
              },
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '45:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '53:5:5',
                type: '',
              },
            ],
            src: '7:139:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '204:87:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '214:29:5',
                  value: {
                    arguments: [
                      {
                        name: 'offset',
                        nodeType: 'YulIdentifier',
                        src: '236:6:5',
                      },
                    ],
                    functionName: {
                      name: 'calldataload',
                      nodeType: 'YulIdentifier',
                      src: '223:12:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '223:20:5',
                  },
                  variableNames: [
                    {
                      name: 'value',
                      nodeType: 'YulIdentifier',
                      src: '214:5:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '279:5:5',
                      },
                    ],
                    functionName: {
                      name: 'validator_revert_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '252:26:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '252:33:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '252:33:5',
                },
              ],
            },
            name: 'abi_decode_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'offset',
                nodeType: 'YulTypedName',
                src: '182:6:5',
                type: '',
              },
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '190:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '198:5:5',
                type: '',
              },
            ],
            src: '152:139:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '363:196:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '409:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '418:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '421:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '411:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '411:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '411:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '384:7:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '393:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '380:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '380:23:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '405:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '376:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '376:32:5',
                  },
                  nodeType: 'YulIf',
                  src: '373:2:5',
                },
                {
                  nodeType: 'YulBlock',
                  src: '435:117:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '450:15:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '464:1:5',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '454:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '479:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '514:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '525:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '510:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '510:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '534:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '489:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '489:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '479:6:5',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '333:9:5',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '344:7:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '356:6:5',
                type: '',
              },
            ],
            src: '297:262:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '648:324:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '694:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '703:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '706:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '696:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '696:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '696:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '669:7:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '678:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '665:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '665:23:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '690:2:5',
                        type: '',
                        value: '64',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '661:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '661:32:5',
                  },
                  nodeType: 'YulIf',
                  src: '658:2:5',
                },
                {
                  nodeType: 'YulBlock',
                  src: '720:117:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '735:15:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '749:1:5',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '739:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '764:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '799:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '810:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '795:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '795:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '819:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '774:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '774:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '764:6:5',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '847:118:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '862:16:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '876:2:5',
                        type: '',
                        value: '32',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '866:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '892:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '927:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '938:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '923:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '923:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '947:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '902:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '902:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '892:6:5',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_addresst_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '610:9:5',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '621:7:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '633:6:5',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '641:6:5',
                type: '',
              },
            ],
            src: '565:407:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1078:452:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1124:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1133:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1136:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '1126:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1126:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1126:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1099:7:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1108:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1095:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1095:23:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1120:2:5',
                        type: '',
                        value: '96',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '1091:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1091:32:5',
                  },
                  nodeType: 'YulIf',
                  src: '1088:2:5',
                },
                {
                  nodeType: 'YulBlock',
                  src: '1150:117:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1165:15:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1179:1:5',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1169:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1194:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1229:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1240:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1225:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1225:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1249:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '1204:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1204:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '1194:6:5',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '1277:118:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1292:16:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1306:2:5',
                        type: '',
                        value: '32',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1296:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1322:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1357:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1368:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1353:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1353:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1377:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '1332:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1332:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '1322:6:5',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '1405:118:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1420:16:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1434:2:5',
                        type: '',
                        value: '64',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1424:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1450:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1485:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1496:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1481:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1481:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1505:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '1460:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1460:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value2',
                          nodeType: 'YulIdentifier',
                          src: '1450:6:5',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_addresst_addresst_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '1032:9:5',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '1043:7:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '1055:6:5',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '1063:6:5',
                type: '',
              },
              {
                name: 'value2',
                nodeType: 'YulTypedName',
                src: '1071:6:5',
                type: '',
              },
            ],
            src: '978:552:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '1619:324:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '1665:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1674:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '1677:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '1667:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '1667:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '1667:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1640:7:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '1649:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '1636:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1636:23:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1661:2:5',
                        type: '',
                        value: '64',
                      },
                    ],
                    functionName: {
                      name: 'slt',
                      nodeType: 'YulIdentifier',
                      src: '1632:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '1632:32:5',
                  },
                  nodeType: 'YulIf',
                  src: '1629:2:5',
                },
                {
                  nodeType: 'YulBlock',
                  src: '1691:117:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1706:15:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1720:1:5',
                        type: '',
                        value: '0',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1710:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1735:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1770:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1781:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1766:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1766:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1790:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_address',
                          nodeType: 'YulIdentifier',
                          src: '1745:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1745:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value0',
                          nodeType: 'YulIdentifier',
                          src: '1735:6:5',
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: 'YulBlock',
                  src: '1818:118:5',
                  statements: [
                    {
                      nodeType: 'YulVariableDeclaration',
                      src: '1833:16:5',
                      value: {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '1847:2:5',
                        type: '',
                        value: '32',
                      },
                      variables: [
                        {
                          name: 'offset',
                          nodeType: 'YulTypedName',
                          src: '1837:6:5',
                          type: '',
                        },
                      ],
                    },
                    {
                      nodeType: 'YulAssignment',
                      src: '1863:63:5',
                      value: {
                        arguments: [
                          {
                            arguments: [
                              {
                                name: 'headStart',
                                nodeType: 'YulIdentifier',
                                src: '1898:9:5',
                              },
                              {
                                name: 'offset',
                                nodeType: 'YulIdentifier',
                                src: '1909:6:5',
                              },
                            ],
                            functionName: {
                              name: 'add',
                              nodeType: 'YulIdentifier',
                              src: '1894:3:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '1894:22:5',
                          },
                          {
                            name: 'dataEnd',
                            nodeType: 'YulIdentifier',
                            src: '1918:7:5',
                          },
                        ],
                        functionName: {
                          name: 'abi_decode_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '1873:20:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '1873:53:5',
                      },
                      variableNames: [
                        {
                          name: 'value1',
                          nodeType: 'YulIdentifier',
                          src: '1863:6:5',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            name: 'abi_decode_tuple_t_addresst_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '1581:9:5',
                type: '',
              },
              {
                name: 'dataEnd',
                nodeType: 'YulTypedName',
                src: '1592:7:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '1604:6:5',
                type: '',
              },
              {
                name: 'value1',
                nodeType: 'YulTypedName',
                src: '1612:6:5',
                type: '',
              },
            ],
            src: '1536:407:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2008:50:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2025:3:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '2045:5:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_bool',
                          nodeType: 'YulIdentifier',
                          src: '2030:14:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2030:21:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2018:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2018:34:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2018:34:5',
                },
              ],
            },
            name: 'abi_encode_t_bool_to_t_bool_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '1996:5:5',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2003:3:5',
                type: '',
              },
            ],
            src: '1949:109:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2156:272:5',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '2166:53:5',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '2213:5:5',
                      },
                    ],
                    functionName: {
                      name: 'array_length_t_string_memory_ptr',
                      nodeType: 'YulIdentifier',
                      src: '2180:32:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2180:39:5',
                  },
                  variables: [
                    {
                      name: 'length',
                      nodeType: 'YulTypedName',
                      src: '2170:6:5',
                      type: '',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '2228:78:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2294:3:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '2299:6:5',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '2235:58:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2235:71:5',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '2228:3:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '2341:5:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2348:4:5',
                            type: '',
                            value: '0x20',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2337:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2337:16:5',
                      },
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2355:3:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '2360:6:5',
                      },
                    ],
                    functionName: {
                      name: 'copy_memory_to_memory',
                      nodeType: 'YulIdentifier',
                      src: '2315:21:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2315:52:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2315:52:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '2376:46:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2387:3:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '2414:6:5',
                          },
                        ],
                        functionName: {
                          name: 'round_up_to_mul_of_32',
                          nodeType: 'YulIdentifier',
                          src: '2392:21:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2392:29:5',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '2383:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2383:39:5',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '2376:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '2137:5:5',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2144:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '2152:3:5',
                type: '',
              },
            ],
            src: '2064:364:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2580:174:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '2590:74:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2656:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2661:2:5',
                        type: '',
                        value: '22',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '2597:58:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2597:67:5',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '2590:3:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '2685:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '2690:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '2681:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '2681:11:5',
                      },
                      {
                        kind: 'string',
                        nodeType: 'YulLiteral',
                        src: '2694:24:5',
                        type: '',
                        value: 'Insufficient allowance',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '2674:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2674:45:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '2674:45:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '2729:19:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2740:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2745:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '2736:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2736:12:5',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '2729:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2568:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '2576:3:5',
                type: '',
              },
            ],
            src: '2434:320:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '2906:172:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '2916:74:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '2982:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '2987:2:5',
                        type: '',
                        value: '20',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '2923:58:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '2923:67:5',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '2916:3:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '3011:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3016:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3007:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3007:11:5',
                      },
                      {
                        kind: 'string',
                        nodeType: 'YulLiteral',
                        src: '3020:22:5',
                        type: '',
                        value: 'Insufficient balance',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '3000:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3000:43:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3000:43:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '3053:19:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3064:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3069:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '3060:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3060:12:5',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '3053:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '2894:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '2902:3:5',
                type: '',
              },
            ],
            src: '2760:318:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3230:177:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '3240:74:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3306:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3311:2:5',
                        type: '',
                        value: '25',
                      },
                    ],
                    functionName: {
                      name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '3247:58:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3247:67:5',
                  },
                  variableNames: [
                    {
                      name: 'pos',
                      nodeType: 'YulIdentifier',
                      src: '3240:3:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'pos',
                            nodeType: 'YulIdentifier',
                            src: '3335:3:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3340:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3331:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3331:11:5',
                      },
                      {
                        kind: 'string',
                        nodeType: 'YulLiteral',
                        src: '3344:27:5',
                        type: '',
                        value: 'Invalid recipient address',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '3324:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3324:48:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3324:48:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '3382:19:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3393:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3398:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '3389:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3389:12:5',
                  },
                  variableNames: [
                    {
                      name: 'end',
                      nodeType: 'YulIdentifier',
                      src: '3382:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '3218:3:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'end',
                nodeType: 'YulTypedName',
                src: '3226:3:5',
                type: '',
              },
            ],
            src: '3084:323:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3478:53:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3495:3:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '3518:5:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint256',
                          nodeType: 'YulIdentifier',
                          src: '3500:17:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3500:24:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '3488:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3488:37:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3488:37:5',
                },
              ],
            },
            name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '3466:5:5',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '3473:3:5',
                type: '',
              },
            ],
            src: '3413:118:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3598:51:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '3615:3:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '3636:5:5',
                          },
                        ],
                        functionName: {
                          name: 'cleanup_t_uint8',
                          nodeType: 'YulIdentifier',
                          src: '3620:15:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3620:22:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '3608:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3608:35:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3608:35:5',
                },
              ],
            },
            name: 'abi_encode_t_uint8_to_t_uint8_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '3586:5:5',
                type: '',
              },
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '3593:3:5',
                type: '',
              },
            ],
            src: '3537:112:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3747:118:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '3757:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '3769:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '3780:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '3765:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3765:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '3757:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '3831:6:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '3844:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '3855:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '3840:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '3840:17:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_bool_to_t_bool_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '3793:37:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '3793:65:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '3793:65:5',
                },
              ],
            },
            name: 'abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '3719:9:5',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '3731:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '3742:4:5',
                type: '',
              },
            ],
            src: '3655:210:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '3989:195:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '3999:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '4011:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '4022:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '4007:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4007:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '3999:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4046:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4057:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '4042:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4042:17:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '4065:4:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4071:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '4061:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4061:20:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '4035:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4035:47:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '4035:47:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '4091:86:5',
                  value: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '4163:6:5',
                      },
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '4172:4:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '4099:63:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4099:78:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '4091:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '3961:9:5',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '3973:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '3984:4:5',
                type: '',
              },
            ],
            src: '3871:313:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '4361:248:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '4371:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '4383:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '4394:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '4379:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4379:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '4371:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4418:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4429:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '4414:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4414:17:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '4437:4:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4443:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '4433:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4433:20:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '4407:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4407:47:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '4407:47:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '4463:139:5',
                  value: {
                    arguments: [
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '4597:4:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '4471:124:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4471:131:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '4463:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '4341:9:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '4356:4:5',
                type: '',
              },
            ],
            src: '4190:419:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '4786:248:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '4796:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '4808:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '4819:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '4804:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4804:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '4796:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4843:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '4854:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '4839:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4839:17:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '4862:4:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '4868:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '4858:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '4858:20:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '4832:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4832:47:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '4832:47:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '4888:139:5',
                  value: {
                    arguments: [
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '5022:4:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '4896:124:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '4896:131:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '4888:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '4766:9:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '4781:4:5',
                type: '',
              },
            ],
            src: '4615:419:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5211:248:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5221:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '5233:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5244:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '5229:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5229:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '5221:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '5268:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5279:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '5264:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5264:17:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'tail',
                            nodeType: 'YulIdentifier',
                            src: '5287:4:5',
                          },
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '5293:9:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '5283:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5283:20:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '5257:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5257:47:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5257:47:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '5313:139:5',
                  value: {
                    arguments: [
                      {
                        name: 'tail',
                        nodeType: 'YulIdentifier',
                        src: '5447:4:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '5321:124:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5321:131:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '5313:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'abi_encode_tuple_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df__to_t_string_memory_ptr__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '5191:9:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '5206:4:5',
                type: '',
              },
            ],
            src: '5040:419:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5563:124:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5573:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '5585:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5596:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '5581:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5581:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '5573:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '5653:6:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '5666:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5677:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '5662:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5662:17:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint256_to_t_uint256_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '5609:43:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5609:71:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5609:71:5',
                },
              ],
            },
            name: 'abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '5535:9:5',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '5547:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '5558:4:5',
                type: '',
              },
            ],
            src: '5465:222:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5787:120:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5797:26:5',
                  value: {
                    arguments: [
                      {
                        name: 'headStart',
                        nodeType: 'YulIdentifier',
                        src: '5809:9:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '5820:2:5',
                        type: '',
                        value: '32',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '5805:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5805:18:5',
                  },
                  variableNames: [
                    {
                      name: 'tail',
                      nodeType: 'YulIdentifier',
                      src: '5797:4:5',
                    },
                  ],
                },
                {
                  expression: {
                    arguments: [
                      {
                        name: 'value0',
                        nodeType: 'YulIdentifier',
                        src: '5873:6:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'headStart',
                            nodeType: 'YulIdentifier',
                            src: '5886:9:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '5897:1:5',
                            type: '',
                            value: '0',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '5882:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '5882:17:5',
                      },
                    ],
                    functionName: {
                      name: 'abi_encode_t_uint8_to_t_uint8_fromStack',
                      nodeType: 'YulIdentifier',
                      src: '5833:39:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5833:67:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '5833:67:5',
                },
              ],
            },
            name: 'abi_encode_tuple_t_uint8__to_t_uint8__fromStack_reversed',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'headStart',
                nodeType: 'YulTypedName',
                src: '5759:9:5',
                type: '',
              },
              {
                name: 'value0',
                nodeType: 'YulTypedName',
                src: '5771:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'tail',
                nodeType: 'YulTypedName',
                src: '5782:4:5',
                type: '',
              },
            ],
            src: '5693:214:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '5972:40:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '5983:22:5',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '5999:5:5',
                      },
                    ],
                    functionName: {
                      name: 'mload',
                      nodeType: 'YulIdentifier',
                      src: '5993:5:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '5993:12:5',
                  },
                  variableNames: [
                    {
                      name: 'length',
                      nodeType: 'YulIdentifier',
                      src: '5983:6:5',
                    },
                  ],
                },
              ],
            },
            name: 'array_length_t_string_memory_ptr',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '5955:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '5965:6:5',
                type: '',
              },
            ],
            src: '5913:99:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6114:73:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '6131:3:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '6136:6:5',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '6124:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6124:19:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '6124:19:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '6152:29:5',
                  value: {
                    arguments: [
                      {
                        name: 'pos',
                        nodeType: 'YulIdentifier',
                        src: '6171:3:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '6176:4:5',
                        type: '',
                        value: '0x20',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '6167:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6167:14:5',
                  },
                  variableNames: [
                    {
                      name: 'updated_pos',
                      nodeType: 'YulIdentifier',
                      src: '6152:11:5',
                    },
                  ],
                },
              ],
            },
            name: 'array_storeLengthForEncoding_t_string_memory_ptr_fromStack',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'pos',
                nodeType: 'YulTypedName',
                src: '6086:3:5',
                type: '',
              },
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '6091:6:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'updated_pos',
                nodeType: 'YulTypedName',
                src: '6102:11:5',
                type: '',
              },
            ],
            src: '6018:169:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6237:261:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '6247:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6270:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '6252:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6252:20:5',
                  },
                  variableNames: [
                    {
                      name: 'x',
                      nodeType: 'YulIdentifier',
                      src: '6247:1:5',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '6281:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '6304:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '6286:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6286:20:5',
                  },
                  variableNames: [
                    {
                      name: 'y',
                      nodeType: 'YulIdentifier',
                      src: '6281:1:5',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '6444:22:5',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x11',
                            nodeType: 'YulIdentifier',
                            src: '6446:16:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '6446:18:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '6446:18:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6365:1:5',
                      },
                      {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '6372:66:5',
                            type: '',
                            value:
                              '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                          },
                          {
                            name: 'y',
                            nodeType: 'YulIdentifier',
                            src: '6440:1:5',
                          },
                        ],
                        functionName: {
                          name: 'sub',
                          nodeType: 'YulIdentifier',
                          src: '6368:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6368:74:5',
                      },
                    ],
                    functionName: {
                      name: 'gt',
                      nodeType: 'YulIdentifier',
                      src: '6362:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6362:81:5',
                  },
                  nodeType: 'YulIf',
                  src: '6359:2:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '6476:16:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6487:1:5',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '6490:1:5',
                      },
                    ],
                    functionName: {
                      name: 'add',
                      nodeType: 'YulIdentifier',
                      src: '6483:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6483:9:5',
                  },
                  variableNames: [
                    {
                      name: 'sum',
                      nodeType: 'YulIdentifier',
                      src: '6476:3:5',
                    },
                  ],
                },
              ],
            },
            name: 'checked_add_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'x',
                nodeType: 'YulTypedName',
                src: '6224:1:5',
                type: '',
              },
              {
                name: 'y',
                nodeType: 'YulTypedName',
                src: '6227:1:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'sum',
                nodeType: 'YulTypedName',
                src: '6233:3:5',
                type: '',
              },
            ],
            src: '6193:305:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6549:146:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '6559:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6582:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '6564:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6564:20:5',
                  },
                  variableNames: [
                    {
                      name: 'x',
                      nodeType: 'YulIdentifier',
                      src: '6559:1:5',
                    },
                  ],
                },
                {
                  nodeType: 'YulAssignment',
                  src: '6593:25:5',
                  value: {
                    arguments: [
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '6616:1:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint256',
                      nodeType: 'YulIdentifier',
                      src: '6598:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6598:20:5',
                  },
                  variableNames: [
                    {
                      name: 'y',
                      nodeType: 'YulIdentifier',
                      src: '6593:1:5',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '6640:22:5',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x11',
                            nodeType: 'YulIdentifier',
                            src: '6642:16:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '6642:18:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '6642:18:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6634:1:5',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '6637:1:5',
                      },
                    ],
                    functionName: {
                      name: 'lt',
                      nodeType: 'YulIdentifier',
                      src: '6631:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6631:8:5',
                  },
                  nodeType: 'YulIf',
                  src: '6628:2:5',
                },
                {
                  nodeType: 'YulAssignment',
                  src: '6672:17:5',
                  value: {
                    arguments: [
                      {
                        name: 'x',
                        nodeType: 'YulIdentifier',
                        src: '6684:1:5',
                      },
                      {
                        name: 'y',
                        nodeType: 'YulIdentifier',
                        src: '6687:1:5',
                      },
                    ],
                    functionName: {
                      name: 'sub',
                      nodeType: 'YulIdentifier',
                      src: '6680:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6680:9:5',
                  },
                  variableNames: [
                    {
                      name: 'diff',
                      nodeType: 'YulIdentifier',
                      src: '6672:4:5',
                    },
                  ],
                },
              ],
            },
            name: 'checked_sub_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'x',
                nodeType: 'YulTypedName',
                src: '6535:1:5',
                type: '',
              },
              {
                name: 'y',
                nodeType: 'YulTypedName',
                src: '6538:1:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'diff',
                nodeType: 'YulTypedName',
                src: '6544:4:5',
                type: '',
              },
            ],
            src: '6504:191:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6746:51:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '6756:35:5',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '6785:5:5',
                      },
                    ],
                    functionName: {
                      name: 'cleanup_t_uint160',
                      nodeType: 'YulIdentifier',
                      src: '6767:17:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6767:24:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '6756:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '6728:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '6738:7:5',
                type: '',
              },
            ],
            src: '6701:96:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6845:48:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '6855:32:5',
                  value: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '6880:5:5',
                          },
                        ],
                        functionName: {
                          name: 'iszero',
                          nodeType: 'YulIdentifier',
                          src: '6873:6:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '6873:13:5',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '6866:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6866:21:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '6855:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_bool',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '6827:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '6837:7:5',
                type: '',
              },
            ],
            src: '6803:90:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '6944:81:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '6954:65:5',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '6969:5:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '6976:42:5',
                        type: '',
                        value: '0xffffffffffffffffffffffffffffffffffffffff',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '6965:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '6965:54:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '6954:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint160',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '6926:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '6936:7:5',
                type: '',
              },
            ],
            src: '6899:126:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7076:32:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '7086:16:5',
                  value: {
                    name: 'value',
                    nodeType: 'YulIdentifier',
                    src: '7097:5:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '7086:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '7058:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '7068:7:5',
                type: '',
              },
            ],
            src: '7031:77:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7157:43:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '7167:27:5',
                  value: {
                    arguments: [
                      {
                        name: 'value',
                        nodeType: 'YulIdentifier',
                        src: '7182:5:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7189:4:5',
                        type: '',
                        value: '0xff',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '7178:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7178:16:5',
                  },
                  variableNames: [
                    {
                      name: 'cleaned',
                      nodeType: 'YulIdentifier',
                      src: '7167:7:5',
                    },
                  ],
                },
              ],
            },
            name: 'cleanup_t_uint8',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '7139:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'cleaned',
                nodeType: 'YulTypedName',
                src: '7149:7:5',
                type: '',
              },
            ],
            src: '7114:86:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7255:258:5',
              statements: [
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '7265:10:5',
                  value: {
                    kind: 'number',
                    nodeType: 'YulLiteral',
                    src: '7274:1:5',
                    type: '',
                    value: '0',
                  },
                  variables: [
                    {
                      name: 'i',
                      nodeType: 'YulTypedName',
                      src: '7269:1:5',
                      type: '',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '7334:63:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              arguments: [
                                {
                                  name: 'dst',
                                  nodeType: 'YulIdentifier',
                                  src: '7359:3:5',
                                },
                                {
                                  name: 'i',
                                  nodeType: 'YulIdentifier',
                                  src: '7364:1:5',
                                },
                              ],
                              functionName: {
                                name: 'add',
                                nodeType: 'YulIdentifier',
                                src: '7355:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '7355:11:5',
                            },
                            {
                              arguments: [
                                {
                                  arguments: [
                                    {
                                      name: 'src',
                                      nodeType: 'YulIdentifier',
                                      src: '7378:3:5',
                                    },
                                    {
                                      name: 'i',
                                      nodeType: 'YulIdentifier',
                                      src: '7383:1:5',
                                    },
                                  ],
                                  functionName: {
                                    name: 'add',
                                    nodeType: 'YulIdentifier',
                                    src: '7374:3:5',
                                  },
                                  nodeType: 'YulFunctionCall',
                                  src: '7374:11:5',
                                },
                              ],
                              functionName: {
                                name: 'mload',
                                nodeType: 'YulIdentifier',
                                src: '7368:5:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '7368:18:5',
                            },
                          ],
                          functionName: {
                            name: 'mstore',
                            nodeType: 'YulIdentifier',
                            src: '7348:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '7348:39:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '7348:39:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'i',
                        nodeType: 'YulIdentifier',
                        src: '7295:1:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '7298:6:5',
                      },
                    ],
                    functionName: {
                      name: 'lt',
                      nodeType: 'YulIdentifier',
                      src: '7292:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7292:13:5',
                  },
                  nodeType: 'YulForLoop',
                  post: {
                    nodeType: 'YulBlock',
                    src: '7306:19:5',
                    statements: [
                      {
                        nodeType: 'YulAssignment',
                        src: '7308:15:5',
                        value: {
                          arguments: [
                            {
                              name: 'i',
                              nodeType: 'YulIdentifier',
                              src: '7317:1:5',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '7320:2:5',
                              type: '',
                              value: '32',
                            },
                          ],
                          functionName: {
                            name: 'add',
                            nodeType: 'YulIdentifier',
                            src: '7313:3:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '7313:10:5',
                        },
                        variableNames: [
                          {
                            name: 'i',
                            nodeType: 'YulIdentifier',
                            src: '7308:1:5',
                          },
                        ],
                      },
                    ],
                  },
                  pre: {
                    nodeType: 'YulBlock',
                    src: '7288:3:5',
                    statements: [],
                  },
                  src: '7284:113:5',
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '7431:76:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              arguments: [
                                {
                                  name: 'dst',
                                  nodeType: 'YulIdentifier',
                                  src: '7481:3:5',
                                },
                                {
                                  name: 'length',
                                  nodeType: 'YulIdentifier',
                                  src: '7486:6:5',
                                },
                              ],
                              functionName: {
                                name: 'add',
                                nodeType: 'YulIdentifier',
                                src: '7477:3:5',
                              },
                              nodeType: 'YulFunctionCall',
                              src: '7477:16:5',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '7495:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'mstore',
                            nodeType: 'YulIdentifier',
                            src: '7470:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '7470:27:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '7470:27:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'i',
                        nodeType: 'YulIdentifier',
                        src: '7412:1:5',
                      },
                      {
                        name: 'length',
                        nodeType: 'YulIdentifier',
                        src: '7415:6:5',
                      },
                    ],
                    functionName: {
                      name: 'gt',
                      nodeType: 'YulIdentifier',
                      src: '7409:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7409:13:5',
                  },
                  nodeType: 'YulIf',
                  src: '7406:2:5',
                },
              ],
            },
            name: 'copy_memory_to_memory',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'src',
                nodeType: 'YulTypedName',
                src: '7237:3:5',
                type: '',
              },
              {
                name: 'dst',
                nodeType: 'YulTypedName',
                src: '7242:3:5',
                type: '',
              },
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '7247:6:5',
                type: '',
              },
            ],
            src: '7206:307:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7570:269:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '7580:22:5',
                  value: {
                    arguments: [
                      {
                        name: 'data',
                        nodeType: 'YulIdentifier',
                        src: '7594:4:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7600:1:5',
                        type: '',
                        value: '2',
                      },
                    ],
                    functionName: {
                      name: 'div',
                      nodeType: 'YulIdentifier',
                      src: '7590:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7590:12:5',
                  },
                  variableNames: [
                    {
                      name: 'length',
                      nodeType: 'YulIdentifier',
                      src: '7580:6:5',
                    },
                  ],
                },
                {
                  nodeType: 'YulVariableDeclaration',
                  src: '7611:38:5',
                  value: {
                    arguments: [
                      {
                        name: 'data',
                        nodeType: 'YulIdentifier',
                        src: '7641:4:5',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7647:1:5',
                        type: '',
                        value: '1',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '7637:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7637:12:5',
                  },
                  variables: [
                    {
                      name: 'outOfPlaceEncoding',
                      nodeType: 'YulTypedName',
                      src: '7615:18:5',
                      type: '',
                    },
                  ],
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '7688:51:5',
                    statements: [
                      {
                        nodeType: 'YulAssignment',
                        src: '7702:27:5',
                        value: {
                          arguments: [
                            {
                              name: 'length',
                              nodeType: 'YulIdentifier',
                              src: '7716:6:5',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '7724:4:5',
                              type: '',
                              value: '0x7f',
                            },
                          ],
                          functionName: {
                            name: 'and',
                            nodeType: 'YulIdentifier',
                            src: '7712:3:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '7712:17:5',
                        },
                        variableNames: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '7702:6:5',
                          },
                        ],
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'outOfPlaceEncoding',
                        nodeType: 'YulIdentifier',
                        src: '7668:18:5',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '7661:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7661:26:5',
                  },
                  nodeType: 'YulIf',
                  src: '7658:2:5',
                },
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '7791:42:5',
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: 'panic_error_0x22',
                            nodeType: 'YulIdentifier',
                            src: '7805:16:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '7805:18:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '7805:18:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: 'outOfPlaceEncoding',
                        nodeType: 'YulIdentifier',
                        src: '7755:18:5',
                      },
                      {
                        arguments: [
                          {
                            name: 'length',
                            nodeType: 'YulIdentifier',
                            src: '7778:6:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '7786:2:5',
                            type: '',
                            value: '32',
                          },
                        ],
                        functionName: {
                          name: 'lt',
                          nodeType: 'YulIdentifier',
                          src: '7775:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '7775:14:5',
                      },
                    ],
                    functionName: {
                      name: 'eq',
                      nodeType: 'YulIdentifier',
                      src: '7752:2:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7752:38:5',
                  },
                  nodeType: 'YulIf',
                  src: '7749:2:5',
                },
              ],
            },
            name: 'extract_byte_array_length',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'data',
                nodeType: 'YulTypedName',
                src: '7554:4:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'length',
                nodeType: 'YulTypedName',
                src: '7563:6:5',
                type: '',
              },
            ],
            src: '7519:320:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '7873:152:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7890:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7893:77:5',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '7883:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7883:88:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '7883:88:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7987:1:5',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '7990:4:5',
                        type: '',
                        value: '0x11',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '7980:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '7980:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '7980:15:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8011:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8014:4:5',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '8004:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8004:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '8004:15:5',
                },
              ],
            },
            name: 'panic_error_0x11',
            nodeType: 'YulFunctionDefinition',
            src: '7845:180:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '8059:152:5',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8076:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8079:77:5',
                        type: '',
                        value:
                          '35408467139433450592217433187231851964531694900788300625387963629091585785856',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '8069:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8069:88:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '8069:88:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8173:1:5',
                        type: '',
                        value: '4',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8176:4:5',
                        type: '',
                        value: '0x22',
                      },
                    ],
                    functionName: {
                      name: 'mstore',
                      nodeType: 'YulIdentifier',
                      src: '8166:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8166:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '8166:15:5',
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8197:1:5',
                        type: '',
                        value: '0',
                      },
                      {
                        kind: 'number',
                        nodeType: 'YulLiteral',
                        src: '8200:4:5',
                        type: '',
                        value: '0x24',
                      },
                    ],
                    functionName: {
                      name: 'revert',
                      nodeType: 'YulIdentifier',
                      src: '8190:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8190:15:5',
                  },
                  nodeType: 'YulExpressionStatement',
                  src: '8190:15:5',
                },
              ],
            },
            name: 'panic_error_0x22',
            nodeType: 'YulFunctionDefinition',
            src: '8031:180:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '8265:54:5',
              statements: [
                {
                  nodeType: 'YulAssignment',
                  src: '8275:38:5',
                  value: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '8293:5:5',
                          },
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '8300:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'add',
                          nodeType: 'YulIdentifier',
                          src: '8289:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8289:14:5',
                      },
                      {
                        arguments: [
                          {
                            kind: 'number',
                            nodeType: 'YulLiteral',
                            src: '8309:2:5',
                            type: '',
                            value: '31',
                          },
                        ],
                        functionName: {
                          name: 'not',
                          nodeType: 'YulIdentifier',
                          src: '8305:3:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8305:7:5',
                      },
                    ],
                    functionName: {
                      name: 'and',
                      nodeType: 'YulIdentifier',
                      src: '8285:3:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8285:28:5',
                  },
                  variableNames: [
                    {
                      name: 'result',
                      nodeType: 'YulIdentifier',
                      src: '8275:6:5',
                    },
                  ],
                },
              ],
            },
            name: 'round_up_to_mul_of_32',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '8248:5:5',
                type: '',
              },
            ],
            returnVariables: [
              {
                name: 'result',
                nodeType: 'YulTypedName',
                src: '8258:6:5',
                type: '',
              },
            ],
            src: '8217:102:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '8368:79:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '8425:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '8434:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '8437:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '8427:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '8427:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '8427:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '8391:5:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '8416:5:5',
                              },
                            ],
                            functionName: {
                              name: 'cleanup_t_address',
                              nodeType: 'YulIdentifier',
                              src: '8398:17:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8398:24:5',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '8388:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8388:35:5',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '8381:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8381:43:5',
                  },
                  nodeType: 'YulIf',
                  src: '8378:2:5',
                },
              ],
            },
            name: 'validator_revert_t_address',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '8361:5:5',
                type: '',
              },
            ],
            src: '8325:122:5',
          },
          {
            body: {
              nodeType: 'YulBlock',
              src: '8496:79:5',
              statements: [
                {
                  body: {
                    nodeType: 'YulBlock',
                    src: '8553:16:5',
                    statements: [
                      {
                        expression: {
                          arguments: [
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '8562:1:5',
                              type: '',
                              value: '0',
                            },
                            {
                              kind: 'number',
                              nodeType: 'YulLiteral',
                              src: '8565:1:5',
                              type: '',
                              value: '0',
                            },
                          ],
                          functionName: {
                            name: 'revert',
                            nodeType: 'YulIdentifier',
                            src: '8555:6:5',
                          },
                          nodeType: 'YulFunctionCall',
                          src: '8555:12:5',
                        },
                        nodeType: 'YulExpressionStatement',
                        src: '8555:12:5',
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        arguments: [
                          {
                            name: 'value',
                            nodeType: 'YulIdentifier',
                            src: '8519:5:5',
                          },
                          {
                            arguments: [
                              {
                                name: 'value',
                                nodeType: 'YulIdentifier',
                                src: '8544:5:5',
                              },
                            ],
                            functionName: {
                              name: 'cleanup_t_uint256',
                              nodeType: 'YulIdentifier',
                              src: '8526:17:5',
                            },
                            nodeType: 'YulFunctionCall',
                            src: '8526:24:5',
                          },
                        ],
                        functionName: {
                          name: 'eq',
                          nodeType: 'YulIdentifier',
                          src: '8516:2:5',
                        },
                        nodeType: 'YulFunctionCall',
                        src: '8516:35:5',
                      },
                    ],
                    functionName: {
                      name: 'iszero',
                      nodeType: 'YulIdentifier',
                      src: '8509:6:5',
                    },
                    nodeType: 'YulFunctionCall',
                    src: '8509:43:5',
                  },
                  nodeType: 'YulIf',
                  src: '8506:2:5',
                },
              ],
            },
            name: 'validator_revert_t_uint256',
            nodeType: 'YulFunctionDefinition',
            parameters: [
              {
                name: 'value',
                nodeType: 'YulTypedName',
                src: '8489:5:5',
                type: '',
              },
            ],
            src: '8453:122:5',
          },
        ],
      },
      contents:
        '{\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_t_uint256(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_addresst_address(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert(0, 0) }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_addresst_addresst_uint256(headStart, dataEnd) -> value0, value1, value2 {\n        if slt(sub(dataEnd, headStart), 96) { revert(0, 0) }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_decode_tuple_t_addresst_uint256(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert(0, 0) }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function abi_encode_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 22)\n\n        mstore(add(pos, 0), "Insufficient allowance")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 20)\n\n        mstore(add(pos, 0), "Insufficient balance")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 25)\n\n        mstore(add(pos, 0), "Invalid recipient address")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_t_uint8_to_t_uint8_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint8(value))\n    }\n\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_tuple_t_uint8__to_t_uint8__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint8_to_t_uint8_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function array_length_t_string_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function checked_sub_t_uint256(x, y) -> diff {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        if lt(x, y) { panic_error_0x11() }\n\n        diff := sub(x, y)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function cleanup_t_bool(value) -> cleaned {\n        cleaned := iszero(iszero(value))\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function cleanup_t_uint8(value) -> cleaned {\n        cleaned := and(value, 0xff)\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n}\n',
      id: 5,
      language: 'Yul',
      name: '#utility.yul',
    },
  ],
  sourceMap:
    '64:2220:0:-:0;;;476:195;;;;;;;;;;500:17;;;;;;;;;;;;;;;;;:4;:17;;;;;;;;;;;;:::i;:::-;;527:16;;;;;;;;;;;;;;;;;:6;:16;;;;;;;;;;;;:::i;:::-;;564:1;553:8;;:12;;;;;;;;;;;;;;;;;;575:28;580:10;592;575:4;;;:28;;:::i;:::-;;64:2220;;2043:239;2102:4;2141:1;2126:17;;:3;:17;;;;2118:55;;;;;;;;;;;;:::i;:::-;;;;;;;;;2200:6;2183:8;:13;2192:3;2183:13;;;;;;;;;;;;;;;;:23;;;;;;;:::i;:::-;;;;;;;;2242:3;2221:33;;2238:1;2221:33;;;2247:6;2221:33;;;;;;:::i;:::-;;;;;;;;2271:4;2264:11;;2043:239;;;;:::o;64:2220::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:323:5:-;;170:67;234:2;229:3;170:67;:::i;:::-;163:74;;267:27;263:1;258:3;254:11;247:48;321:2;316:3;312:12;305:19;;153:177;;;:::o;336:118::-;423:24;441:5;423:24;:::i;:::-;418:3;411:37;401:53;;:::o;460:419::-;;664:2;653:9;649:18;641:26;;713:9;707:4;703:20;699:1;688:9;684:17;677:47;741:131;867:4;741:131;:::i;:::-;733:139;;631:248;;;:::o;885:222::-;;1016:2;1005:9;1001:18;993:26;;1029:71;1097:1;1086:9;1082:17;1073:6;1029:71;:::i;:::-;983:124;;;;:::o;1113:169::-;;1231:6;1226:3;1219:19;1271:4;1266:3;1262:14;1247:29;;1209:73;;;;:::o;1288:305::-;;1347:20;1365:1;1347:20;:::i;:::-;1342:25;;1381:20;1399:1;1381:20;:::i;:::-;1376:25;;1535:1;1467:66;1463:74;1460:1;1457:81;1454:2;;;1541:18;;:::i;:::-;1454:2;1585:1;1582;1578:9;1571:16;;1332:261;;;;:::o;1599:77::-;;1665:5;1654:16;;1644:32;;;:::o;1682:320::-;;1763:1;1757:4;1753:12;1743:22;;1810:1;1804:4;1800:12;1831:18;1821:2;;1887:4;1879:6;1875:17;1865:27;;1821:2;1949;1941:6;1938:14;1918:18;1915:38;1912:2;;;1968:18;;:::i;:::-;1912:2;1733:269;;;;:::o;2008:180::-;2056:77;2053:1;2046:88;2153:4;2150:1;2143:15;2177:4;2174:1;2167:15;2194:180;2242:77;2239:1;2232:88;2339:4;2336:1;2329:15;2363:4;2360:1;2353:15;64:2220:0;;;;;;;',
  deployedSourceMap:
    '64:2220:0:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;88:18;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1675:202;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1151:518;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;138:21;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2043:239;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;677:105;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;112:20;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;788:357;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1883:154;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;88:18;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1675:202::-;1742:4;1790:6;1758:7;:19;1766:10;1758:19;;;;;;;;;;;;;;;:29;1778:8;1758:29;;;;;;;;;;;;;;;:38;;;;1832:8;1811:38;;1820:10;1811:38;;;1842:6;1811:38;;;;;;:::i;:::-;;;;;;;;1866:4;1859:11;;1675:202;;;;:::o;1151:518::-;1263:4;1302:1;1287:17;;:3;:17;;;;1279:55;;;;;;;;;;;;:::i;:::-;;;;;;;;;1362:8;:15;1371:5;1362:15;;;;;;;;;;;;;;;;1352:6;:25;;1344:58;;;;;;;;;;;;:::i;:::-;;;;;;;;;1430:7;:14;1438:5;1430:14;;;;;;;;;;;;;;;:26;1445:10;1430:26;;;;;;;;;;;;;;;;1420:6;:36;;1412:71;;;;;;;;;;;;:::i;:::-;;;;;;;;;1513:6;1494:8;:15;1503:5;1494:15;;;;;;;;;;;;;;;;:25;;;;;;;:::i;:::-;;;;;;;;1546:6;1529:8;:13;1538:3;1529:13;;;;;;;;;;;;;;;;:23;;;;;;;:::i;:::-;;;;;;;;1592:6;1562:7;:14;1570:5;1562:14;;;;;;;;;;;;;;;:26;1577:10;1562:26;;;;;;;;;;;;;;;;:36;;;;;;;:::i;:::-;;;;;;;;1629:3;1613:28;;1622:5;1613:28;;;1634:6;1613:28;;;;;;:::i;:::-;;;;;;;;1658:4;1651:11;;1151:518;;;;;:::o;138:21::-;;;;;;;;;;;;;:::o;2043:239::-;2102:4;2141:1;2126:17;;:3;:17;;;;2118:55;;;;;;;;;;;;:::i;:::-;;;;;;;;;2200:6;2183:8;:13;2192:3;2183:13;;;;;;;;;;;;;;;;:23;;;;;;;:::i;:::-;;;;;;;;2242:3;2221:33;;2238:1;2221:33;;;2247:6;2221:33;;;;;;:::i;:::-;;;;;;;;2271:4;2264:11;;2043:239;;;;:::o;677:105::-;733:7;759:8;:16;768:6;759:16;;;;;;;;;;;;;;;;752:23;;677:105;;;:::o;112:20::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;788:357::-;851:4;890:1;875:17;;:3;:17;;;;867:55;;;;;;;;;;;;:::i;:::-;;;;;;;;;950:8;:20;959:10;950:20;;;;;;;;;;;;;;;;940:6;:30;;932:63;;;;;;;;;;;;:::i;:::-;;;;;;;;;1030:6;1006:8;:20;1015:10;1006:20;;;;;;;;;;;;;;;;:30;;;;;;;:::i;:::-;;;;;;;;1063:6;1046:8;:13;1055:3;1046:13;;;;;;;;;;;;;;;;:23;;;;;;;:::i;:::-;;;;;;;;1105:3;1084:33;;1093:10;1084:33;;;1110:6;1084:33;;;;;;:::i;:::-;;;;;;;;1134:4;1127:11;;788:357;;;;:::o;1883:154::-;1979:7;2005;:15;2013:6;2005:15;;;;;;;;;;;;;;;:25;2021:8;2005:25;;;;;;;;;;;;;;;;1998:32;;1883:154;;;;:::o;7:139:5:-;;91:6;78:20;69:29;;107:33;134:5;107:33;:::i;:::-;59:87;;;;:::o;152:139::-;;236:6;223:20;214:29;;252:33;279:5;252:33;:::i;:::-;204:87;;;;:::o;297:262::-;;405:2;393:9;384:7;380:23;376:32;373:2;;;421:1;418;411:12;373:2;464:1;489:53;534:7;525:6;514:9;510:22;489:53;:::i;:::-;479:63;;435:117;363:196;;;;:::o;565:407::-;;;690:2;678:9;669:7;665:23;661:32;658:2;;;706:1;703;696:12;658:2;749:1;774:53;819:7;810:6;799:9;795:22;774:53;:::i;:::-;764:63;;720:117;876:2;902:53;947:7;938:6;927:9;923:22;902:53;:::i;:::-;892:63;;847:118;648:324;;;;;:::o;978:552::-;;;;1120:2;1108:9;1099:7;1095:23;1091:32;1088:2;;;1136:1;1133;1126:12;1088:2;1179:1;1204:53;1249:7;1240:6;1229:9;1225:22;1204:53;:::i;:::-;1194:63;;1150:117;1306:2;1332:53;1377:7;1368:6;1357:9;1353:22;1332:53;:::i;:::-;1322:63;;1277:118;1434:2;1460:53;1505:7;1496:6;1485:9;1481:22;1460:53;:::i;:::-;1450:63;;1405:118;1078:452;;;;;:::o;1536:407::-;;;1661:2;1649:9;1640:7;1636:23;1632:32;1629:2;;;1677:1;1674;1667:12;1629:2;1720:1;1745:53;1790:7;1781:6;1770:9;1766:22;1745:53;:::i;:::-;1735:63;;1691:117;1847:2;1873:53;1918:7;1909:6;1898:9;1894:22;1873:53;:::i;:::-;1863:63;;1818:118;1619:324;;;;;:::o;1949:109::-;2030:21;2045:5;2030:21;:::i;:::-;2025:3;2018:34;2008:50;;:::o;2064:364::-;;2180:39;2213:5;2180:39;:::i;:::-;2235:71;2299:6;2294:3;2235:71;:::i;:::-;2228:78;;2315:52;2360:6;2355:3;2348:4;2341:5;2337:16;2315:52;:::i;:::-;2392:29;2414:6;2392:29;:::i;:::-;2387:3;2383:39;2376:46;;2156:272;;;;;:::o;2434:320::-;;2597:67;2661:2;2656:3;2597:67;:::i;:::-;2590:74;;2694:24;2690:1;2685:3;2681:11;2674:45;2745:2;2740:3;2736:12;2729:19;;2580:174;;;:::o;2760:318::-;;2923:67;2987:2;2982:3;2923:67;:::i;:::-;2916:74;;3020:22;3016:1;3011:3;3007:11;3000:43;3069:2;3064:3;3060:12;3053:19;;2906:172;;;:::o;3084:323::-;;3247:67;3311:2;3306:3;3247:67;:::i;:::-;3240:74;;3344:27;3340:1;3335:3;3331:11;3324:48;3398:2;3393:3;3389:12;3382:19;;3230:177;;;:::o;3413:118::-;3500:24;3518:5;3500:24;:::i;:::-;3495:3;3488:37;3478:53;;:::o;3537:112::-;3620:22;3636:5;3620:22;:::i;:::-;3615:3;3608:35;3598:51;;:::o;3655:210::-;;3780:2;3769:9;3765:18;3757:26;;3793:65;3855:1;3844:9;3840:17;3831:6;3793:65;:::i;:::-;3747:118;;;;:::o;3871:313::-;;4022:2;4011:9;4007:18;3999:26;;4071:9;4065:4;4061:20;4057:1;4046:9;4042:17;4035:47;4099:78;4172:4;4163:6;4099:78;:::i;:::-;4091:86;;3989:195;;;;:::o;4190:419::-;;4394:2;4383:9;4379:18;4371:26;;4443:9;4437:4;4433:20;4429:1;4418:9;4414:17;4407:47;4471:131;4597:4;4471:131;:::i;:::-;4463:139;;4361:248;;;:::o;4615:419::-;;4819:2;4808:9;4804:18;4796:26;;4868:9;4862:4;4858:20;4854:1;4843:9;4839:17;4832:47;4896:131;5022:4;4896:131;:::i;:::-;4888:139;;4786:248;;;:::o;5040:419::-;;5244:2;5233:9;5229:18;5221:26;;5293:9;5287:4;5283:20;5279:1;5268:9;5264:17;5257:47;5321:131;5447:4;5321:131;:::i;:::-;5313:139;;5211:248;;;:::o;5465:222::-;;5596:2;5585:9;5581:18;5573:26;;5609:71;5677:1;5666:9;5662:17;5653:6;5609:71;:::i;:::-;5563:124;;;;:::o;5693:214::-;;5820:2;5809:9;5805:18;5797:26;;5833:67;5897:1;5886:9;5882:17;5873:6;5833:67;:::i;:::-;5787:120;;;;:::o;5913:99::-;;5999:5;5993:12;5983:22;;5972:40;;;:::o;6018:169::-;;6136:6;6131:3;6124:19;6176:4;6171:3;6167:14;6152:29;;6114:73;;;;:::o;6193:305::-;;6252:20;6270:1;6252:20;:::i;:::-;6247:25;;6286:20;6304:1;6286:20;:::i;:::-;6281:25;;6440:1;6372:66;6368:74;6365:1;6362:81;6359:2;;;6446:18;;:::i;:::-;6359:2;6490:1;6487;6483:9;6476:16;;6237:261;;;;:::o;6504:191::-;;6564:20;6582:1;6564:20;:::i;:::-;6559:25;;6598:20;6616:1;6598:20;:::i;:::-;6593:25;;6637:1;6634;6631:8;6628:2;;;6642:18;;:::i;:::-;6628:2;6687:1;6684;6680:9;6672:17;;6549:146;;;;:::o;6701:96::-;;6767:24;6785:5;6767:24;:::i;:::-;6756:35;;6746:51;;;:::o;6803:90::-;;6880:5;6873:13;6866:21;6855:32;;6845:48;;;:::o;6899:126::-;;6976:42;6969:5;6965:54;6954:65;;6944:81;;;:::o;7031:77::-;;7097:5;7086:16;;7076:32;;;:::o;7114:86::-;;7189:4;7182:5;7178:16;7167:27;;7157:43;;;:::o;7206:307::-;7274:1;7284:113;7298:6;7295:1;7292:13;7284:113;;;7383:1;7378:3;7374:11;7368:18;7364:1;7359:3;7355:11;7348:39;7320:2;7317:1;7313:10;7308:15;;7284:113;;;7415:6;7412:1;7409:13;7406:2;;;7495:1;7486:6;7481:3;7477:16;7470:27;7406:2;7255:258;;;;:::o;7519:320::-;;7600:1;7594:4;7590:12;7580:22;;7647:1;7641:4;7637:12;7668:18;7658:2;;7724:4;7716:6;7712:17;7702:27;;7658:2;7786;7778:6;7775:14;7755:18;7752:38;7749:2;;;7805:18;;:::i;:::-;7749:2;7570:269;;;;:::o;7845:180::-;7893:77;7890:1;7883:88;7990:4;7987:1;7980:15;8014:4;8011:1;8004:15;8031:180;8079:77;8076:1;8069:88;8176:4;8173:1;8166:15;8200:4;8197:1;8190:15;8217:102;;8309:2;8305:7;8300:2;8293:5;8289:14;8285:28;8275:38;;8265:54;;;:::o;8325:122::-;8398:24;8416:5;8398:24;:::i;:::-;8391:5;8388:35;8378:2;;8437:1;8434;8427:12;8378:2;8368:79;:::o;8453:122::-;8526:24;8544:5;8526:24;:::i;:::-;8519:5;8516:35;8506:2;;8565:1;8562;8555:12;8506:2;8496:79;:::o',
  source:
    '// SPDX-License-Identifier: UNLICENSED\npragma solidity ^0.8.0;\n\ncontract FakeUSDT {\n    string public name;\n    string public symbol;\n    uint8 public decimals;\n    mapping(address => uint256) private balances;\n    mapping(address => mapping(address => uint256)) private allowed;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(\n        address indexed owner,\n        address indexed spender,\n        uint256 value\n    );\n\n    constructor() {\n        name = "FakeUSDT";\n        symbol = "USDTF";\n        decimals = 6;\n        mint(msg.sender, 1000000000); // 1,000,000,000 => /10^6 (6 decimals) => 1000 USDTF ($1000)\n    }\n\n    function balanceOf(address _owner) public view returns (uint256) {\n        return balances[_owner];\n    }\n\n    function transfer(address _to, uint256 _value) public returns (bool) {\n        require(_to != address(0), "Invalid recipient address");\n        require(_value <= balances[msg.sender], "Insufficient balance");\n\n        balances[msg.sender] -= _value;\n        balances[_to] += _value;\n        emit Transfer(msg.sender, _to, _value);\n        return true;\n    }\n\n    function transferFrom(\n        address _from,\n        address _to,\n        uint256 _value\n    ) public returns (bool) {\n        require(_to != address(0), "Invalid recipient address");\n        require(_value <= balances[_from], "Insufficient balance");\n        require(_value <= allowed[_from][msg.sender], "Insufficient allowance");\n\n        balances[_from] -= _value;\n        balances[_to] += _value;\n        allowed[_from][msg.sender] -= _value;\n        emit Transfer(_from, _to, _value);\n        return true;\n    }\n\n    function approve(address _spender, uint256 _value) public returns (bool) {\n        allowed[msg.sender][_spender] = _value;\n        emit Approval(msg.sender, _spender, _value);\n        return true;\n    }\n\n    function allowance(\n        address _owner,\n        address _spender\n    ) public view returns (uint256) {\n        return allowed[_owner][_spender];\n    }\n\n    function mint(address _to, uint256 _value) public returns (bool) {\n        require(_to != address(0), "Invalid recipient address");\n        balances[_to] += _value;\n        emit Transfer(address(0), _to, _value);\n        return true;\n    }\n}\n',
  sourcePath:
    '/Users/denlie/Desktop/Coding/recurring-crypto-payments/client/src/contracts/FakeUSDT.sol',
  ast: {
    absolutePath: 'project:/src/contracts/FakeUSDT.sol',
    exportedSymbols: {
      FakeUSDT: [273],
    },
    id: 274,
    license: 'UNLICENSED',
    nodeType: 'SourceUnit',
    nodes: [
      {
        id: 1,
        literals: ['solidity', '^', '0.8', '.0'],
        nodeType: 'PragmaDirective',
        src: '39:23:0',
      },
      {
        abstract: false,
        baseContracts: [],
        contractDependencies: [],
        contractKind: 'contract',
        fullyImplemented: true,
        id: 273,
        linearizedBaseContracts: [273],
        name: 'FakeUSDT',
        nodeType: 'ContractDefinition',
        nodes: [
          {
            constant: false,
            functionSelector: '06fdde03',
            id: 3,
            mutability: 'mutable',
            name: 'name',
            nodeType: 'VariableDeclaration',
            scope: 273,
            src: '88:18:0',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_string_storage',
              typeString: 'string',
            },
            typeName: {
              id: 2,
              name: 'string',
              nodeType: 'ElementaryTypeName',
              src: '88:6:0',
              typeDescriptions: {
                typeIdentifier: 't_string_storage_ptr',
                typeString: 'string',
              },
            },
            visibility: 'public',
          },
          {
            constant: false,
            functionSelector: '95d89b41',
            id: 5,
            mutability: 'mutable',
            name: 'symbol',
            nodeType: 'VariableDeclaration',
            scope: 273,
            src: '112:20:0',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_string_storage',
              typeString: 'string',
            },
            typeName: {
              id: 4,
              name: 'string',
              nodeType: 'ElementaryTypeName',
              src: '112:6:0',
              typeDescriptions: {
                typeIdentifier: 't_string_storage_ptr',
                typeString: 'string',
              },
            },
            visibility: 'public',
          },
          {
            constant: false,
            functionSelector: '313ce567',
            id: 7,
            mutability: 'mutable',
            name: 'decimals',
            nodeType: 'VariableDeclaration',
            scope: 273,
            src: '138:21:0',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_uint8',
              typeString: 'uint8',
            },
            typeName: {
              id: 6,
              name: 'uint8',
              nodeType: 'ElementaryTypeName',
              src: '138:5:0',
              typeDescriptions: {
                typeIdentifier: 't_uint8',
                typeString: 'uint8',
              },
            },
            visibility: 'public',
          },
          {
            constant: false,
            id: 11,
            mutability: 'mutable',
            name: 'balances',
            nodeType: 'VariableDeclaration',
            scope: 273,
            src: '165:44:0',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
              typeString: 'mapping(address => uint256)',
            },
            typeName: {
              id: 10,
              keyType: {
                id: 8,
                name: 'address',
                nodeType: 'ElementaryTypeName',
                src: '173:7:0',
                typeDescriptions: {
                  typeIdentifier: 't_address',
                  typeString: 'address',
                },
              },
              nodeType: 'Mapping',
              src: '165:27:0',
              typeDescriptions: {
                typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                typeString: 'mapping(address => uint256)',
              },
              valueType: {
                id: 9,
                name: 'uint256',
                nodeType: 'ElementaryTypeName',
                src: '184:7:0',
                typeDescriptions: {
                  typeIdentifier: 't_uint256',
                  typeString: 'uint256',
                },
              },
            },
            visibility: 'private',
          },
          {
            constant: false,
            id: 17,
            mutability: 'mutable',
            name: 'allowed',
            nodeType: 'VariableDeclaration',
            scope: 273,
            src: '215:63:0',
            stateVariable: true,
            storageLocation: 'default',
            typeDescriptions: {
              typeIdentifier:
                't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
              typeString: 'mapping(address => mapping(address => uint256))',
            },
            typeName: {
              id: 16,
              keyType: {
                id: 12,
                name: 'address',
                nodeType: 'ElementaryTypeName',
                src: '223:7:0',
                typeDescriptions: {
                  typeIdentifier: 't_address',
                  typeString: 'address',
                },
              },
              nodeType: 'Mapping',
              src: '215:47:0',
              typeDescriptions: {
                typeIdentifier:
                  't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
                typeString: 'mapping(address => mapping(address => uint256))',
              },
              valueType: {
                id: 15,
                keyType: {
                  id: 13,
                  name: 'address',
                  nodeType: 'ElementaryTypeName',
                  src: '242:7:0',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                },
                nodeType: 'Mapping',
                src: '234:27:0',
                typeDescriptions: {
                  typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                  typeString: 'mapping(address => uint256)',
                },
                valueType: {
                  id: 14,
                  name: 'uint256',
                  nodeType: 'ElementaryTypeName',
                  src: '253:7:0',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                },
              },
            },
            visibility: 'private',
          },
          {
            anonymous: false,
            id: 25,
            name: 'Transfer',
            nodeType: 'EventDefinition',
            parameters: {
              id: 24,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 19,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'from',
                  nodeType: 'VariableDeclaration',
                  scope: 25,
                  src: '300:20:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 18,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '300:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 21,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'to',
                  nodeType: 'VariableDeclaration',
                  scope: 25,
                  src: '322:18:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 20,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '322:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 23,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'value',
                  nodeType: 'VariableDeclaration',
                  scope: 25,
                  src: '342:13:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 22,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '342:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '299:57:0',
            },
            src: '285:72:0',
          },
          {
            anonymous: false,
            id: 33,
            name: 'Approval',
            nodeType: 'EventDefinition',
            parameters: {
              id: 32,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 27,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'owner',
                  nodeType: 'VariableDeclaration',
                  scope: 33,
                  src: '386:21:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 26,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '386:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 29,
                  indexed: true,
                  mutability: 'mutable',
                  name: 'spender',
                  nodeType: 'VariableDeclaration',
                  scope: 33,
                  src: '417:23:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 28,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '417:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 31,
                  indexed: false,
                  mutability: 'mutable',
                  name: 'value',
                  nodeType: 'VariableDeclaration',
                  scope: 33,
                  src: '450:13:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 30,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '450:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '376:93:0',
            },
            src: '362:108:0',
          },
          {
            body: {
              id: 54,
              nodeType: 'Block',
              src: '490:181:0',
              statements: [
                {
                  expression: {
                    id: 38,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      id: 36,
                      name: 'name',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 3,
                      src: '500:4:0',
                      typeDescriptions: {
                        typeIdentifier: 't_string_storage',
                        typeString: 'string storage ref',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '=',
                    rightHandSide: {
                      hexValue: '46616b6555534454',
                      id: 37,
                      isConstant: false,
                      isLValue: false,
                      isPure: true,
                      kind: 'string',
                      lValueRequested: false,
                      nodeType: 'Literal',
                      src: '507:10:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_stringliteral_11dc395186453465c6f1b19642e9ac4432d1e12c4c3f968c4acaa8277dc05acd',
                        typeString: 'literal_string "FakeUSDT"',
                      },
                      value: 'FakeUSDT',
                    },
                    src: '500:17:0',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage',
                      typeString: 'string storage ref',
                    },
                  },
                  id: 39,
                  nodeType: 'ExpressionStatement',
                  src: '500:17:0',
                },
                {
                  expression: {
                    id: 42,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      id: 40,
                      name: 'symbol',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 5,
                      src: '527:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_string_storage',
                        typeString: 'string storage ref',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '=',
                    rightHandSide: {
                      hexValue: '5553445446',
                      id: 41,
                      isConstant: false,
                      isLValue: false,
                      isPure: true,
                      kind: 'string',
                      lValueRequested: false,
                      nodeType: 'Literal',
                      src: '536:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_stringliteral_914f56a083e04d76229dde6b463d9a1c3628d3ff2807c5a6ff138cdf897f74ab',
                        typeString: 'literal_string "USDTF"',
                      },
                      value: 'USDTF',
                    },
                    src: '527:16:0',
                    typeDescriptions: {
                      typeIdentifier: 't_string_storage',
                      typeString: 'string storage ref',
                    },
                  },
                  id: 43,
                  nodeType: 'ExpressionStatement',
                  src: '527:16:0',
                },
                {
                  expression: {
                    id: 46,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      id: 44,
                      name: 'decimals',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 7,
                      src: '553:8:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint8',
                        typeString: 'uint8',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '=',
                    rightHandSide: {
                      hexValue: '36',
                      id: 45,
                      isConstant: false,
                      isLValue: false,
                      isPure: true,
                      kind: 'number',
                      lValueRequested: false,
                      nodeType: 'Literal',
                      src: '564:1:0',
                      typeDescriptions: {
                        typeIdentifier: 't_rational_6_by_1',
                        typeString: 'int_const 6',
                      },
                      value: '6',
                    },
                    src: '553:12:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint8',
                      typeString: 'uint8',
                    },
                  },
                  id: 47,
                  nodeType: 'ExpressionStatement',
                  src: '553:12:0',
                },
                {
                  expression: {
                    arguments: [
                      {
                        expression: {
                          id: 49,
                          name: 'msg',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 4294967281,
                          src: '580:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_magic_message',
                            typeString: 'msg',
                          },
                        },
                        id: 50,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: 'sender',
                        nodeType: 'MemberAccess',
                        src: '580:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        hexValue: '31303030303030303030',
                        id: 51,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'number',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '592:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_rational_1000000000_by_1',
                          typeString: 'int_const 1000000000',
                        },
                        value: '1000000000',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_rational_1000000000_by_1',
                          typeString: 'int_const 1000000000',
                        },
                      ],
                      id: 48,
                      name: 'mint',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 272,
                      src: '575:4:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$',
                        typeString: 'function (address,uint256) returns (bool)',
                      },
                    },
                    id: 52,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '575:28:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                  },
                  id: 53,
                  nodeType: 'ExpressionStatement',
                  src: '575:28:0',
                },
              ],
            },
            id: 55,
            implemented: true,
            kind: 'constructor',
            modifiers: [],
            name: '',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 34,
              nodeType: 'ParameterList',
              parameters: [],
              src: '487:2:0',
            },
            returnParameters: {
              id: 35,
              nodeType: 'ParameterList',
              parameters: [],
              src: '490:0:0',
            },
            scope: 273,
            src: '476:195:0',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 66,
              nodeType: 'Block',
              src: '742:40:0',
              statements: [
                {
                  expression: {
                    baseExpression: {
                      id: 62,
                      name: 'balances',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 11,
                      src: '759:8:0',
                      typeDescriptions: {
                        typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                        typeString: 'mapping(address => uint256)',
                      },
                    },
                    id: 64,
                    indexExpression: {
                      id: 63,
                      name: '_owner',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 57,
                      src: '768:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_address',
                        typeString: 'address',
                      },
                    },
                    isConstant: false,
                    isLValue: true,
                    isPure: false,
                    lValueRequested: false,
                    nodeType: 'IndexAccess',
                    src: '759:16:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  functionReturnParameters: 61,
                  id: 65,
                  nodeType: 'Return',
                  src: '752:23:0',
                },
              ],
            },
            functionSelector: '70a08231',
            id: 67,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'balanceOf',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 58,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 57,
                  mutability: 'mutable',
                  name: '_owner',
                  nodeType: 'VariableDeclaration',
                  scope: 67,
                  src: '696:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 56,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '696:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '695:16:0',
            },
            returnParameters: {
              id: 61,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 60,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 67,
                  src: '733:7:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 59,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '733:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '732:9:0',
            },
            scope: 273,
            src: '677:105:0',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 118,
              nodeType: 'Block',
              src: '857:288:0',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        id: 82,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 77,
                          name: '_to',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 69,
                          src: '875:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '!=',
                        rightExpression: {
                          arguments: [
                            {
                              hexValue: '30',
                              id: 80,
                              isConstant: false,
                              isLValue: false,
                              isPure: true,
                              kind: 'number',
                              lValueRequested: false,
                              nodeType: 'Literal',
                              src: '890:1:0',
                              typeDescriptions: {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                              value: '0',
                            },
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                            ],
                            id: 79,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            lValueRequested: false,
                            nodeType: 'ElementaryTypeNameExpression',
                            src: '882:7:0',
                            typeDescriptions: {
                              typeIdentifier: 't_type$_t_address_$',
                              typeString: 'type(address)',
                            },
                            typeName: {
                              id: 78,
                              name: 'address',
                              nodeType: 'ElementaryTypeName',
                              src: '882:7:0',
                              typeDescriptions: {},
                            },
                          },
                          id: 81,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          kind: 'typeConversion',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '882:10:0',
                          tryCall: false,
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        src: '875:17:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue:
                          '496e76616c696420726563697069656e742061646472657373',
                        id: 83,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '894:27:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                        value: 'Invalid recipient address',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                      ],
                      id: 76,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '867:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 84,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '867:55:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 85,
                  nodeType: 'ExpressionStatement',
                  src: '867:55:0',
                },
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        id: 92,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 87,
                          name: '_value',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 71,
                          src: '940:6:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '<=',
                        rightExpression: {
                          baseExpression: {
                            id: 88,
                            name: 'balances',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 11,
                            src: '950:8:0',
                            typeDescriptions: {
                              typeIdentifier:
                                't_mapping$_t_address_$_t_uint256_$',
                              typeString: 'mapping(address => uint256)',
                            },
                          },
                          id: 91,
                          indexExpression: {
                            expression: {
                              id: 89,
                              name: 'msg',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 4294967281,
                              src: '959:3:0',
                              typeDescriptions: {
                                typeIdentifier: 't_magic_message',
                                typeString: 'msg',
                              },
                            },
                            id: 90,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            lValueRequested: false,
                            memberName: 'sender',
                            nodeType: 'MemberAccess',
                            src: '959:10:0',
                            typeDescriptions: {
                              typeIdentifier: 't_address',
                              typeString: 'address',
                            },
                          },
                          isConstant: false,
                          isLValue: true,
                          isPure: false,
                          lValueRequested: false,
                          nodeType: 'IndexAccess',
                          src: '950:20:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        src: '940:30:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue: '496e73756666696369656e742062616c616e6365',
                        id: 93,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '972:22:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5',
                          typeString: 'literal_string "Insufficient balance"',
                        },
                        value: 'Insufficient balance',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5',
                          typeString: 'literal_string "Insufficient balance"',
                        },
                      ],
                      id: 86,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '932:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 94,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '932:63:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 95,
                  nodeType: 'ExpressionStatement',
                  src: '932:63:0',
                },
                {
                  expression: {
                    id: 101,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        id: 96,
                        name: 'balances',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 11,
                        src: '1006:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 99,
                      indexExpression: {
                        expression: {
                          id: 97,
                          name: 'msg',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 4294967281,
                          src: '1015:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_magic_message',
                            typeString: 'msg',
                          },
                        },
                        id: 98,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: 'sender',
                        nodeType: 'MemberAccess',
                        src: '1015:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1006:20:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '-=',
                    rightHandSide: {
                      id: 100,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 71,
                      src: '1030:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1006:30:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 102,
                  nodeType: 'ExpressionStatement',
                  src: '1006:30:0',
                },
                {
                  expression: {
                    id: 107,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        id: 103,
                        name: 'balances',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 11,
                        src: '1046:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 105,
                      indexExpression: {
                        id: 104,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 69,
                        src: '1055:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1046:13:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '+=',
                    rightHandSide: {
                      id: 106,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 71,
                      src: '1063:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1046:23:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 108,
                  nodeType: 'ExpressionStatement',
                  src: '1046:23:0',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        expression: {
                          id: 110,
                          name: 'msg',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 4294967281,
                          src: '1093:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_magic_message',
                            typeString: 'msg',
                          },
                        },
                        id: 111,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: 'sender',
                        nodeType: 'MemberAccess',
                        src: '1093:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 112,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 69,
                        src: '1105:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 113,
                        name: '_value',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 71,
                        src: '1110:6:0',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 109,
                      name: 'Transfer',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 25,
                      src: '1084:8:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)',
                      },
                    },
                    id: 114,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1084:33:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 115,
                  nodeType: 'EmitStatement',
                  src: '1079:38:0',
                },
                {
                  expression: {
                    hexValue: '74727565',
                    id: 116,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'bool',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '1134:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    value: 'true',
                  },
                  functionReturnParameters: 75,
                  id: 117,
                  nodeType: 'Return',
                  src: '1127:11:0',
                },
              ],
            },
            functionSelector: 'a9059cbb',
            id: 119,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'transfer',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 72,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 69,
                  mutability: 'mutable',
                  name: '_to',
                  nodeType: 'VariableDeclaration',
                  scope: 119,
                  src: '806:11:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 68,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '806:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 71,
                  mutability: 'mutable',
                  name: '_value',
                  nodeType: 'VariableDeclaration',
                  scope: 119,
                  src: '819:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 70,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '819:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '805:29:0',
            },
            returnParameters: {
              id: 75,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 74,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 119,
                  src: '851:4:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_bool',
                    typeString: 'bool',
                  },
                  typeName: {
                    id: 73,
                    name: 'bool',
                    nodeType: 'ElementaryTypeName',
                    src: '851:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '850:6:0',
            },
            scope: 273,
            src: '788:357:0',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 190,
              nodeType: 'Block',
              src: '1269:400:0',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        id: 136,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 131,
                          name: '_to',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 123,
                          src: '1287:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '!=',
                        rightExpression: {
                          arguments: [
                            {
                              hexValue: '30',
                              id: 134,
                              isConstant: false,
                              isLValue: false,
                              isPure: true,
                              kind: 'number',
                              lValueRequested: false,
                              nodeType: 'Literal',
                              src: '1302:1:0',
                              typeDescriptions: {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                              value: '0',
                            },
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                            ],
                            id: 133,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            lValueRequested: false,
                            nodeType: 'ElementaryTypeNameExpression',
                            src: '1294:7:0',
                            typeDescriptions: {
                              typeIdentifier: 't_type$_t_address_$',
                              typeString: 'type(address)',
                            },
                            typeName: {
                              id: 132,
                              name: 'address',
                              nodeType: 'ElementaryTypeName',
                              src: '1294:7:0',
                              typeDescriptions: {},
                            },
                          },
                          id: 135,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          kind: 'typeConversion',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '1294:10:0',
                          tryCall: false,
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        src: '1287:17:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue:
                          '496e76616c696420726563697069656e742061646472657373',
                        id: 137,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '1306:27:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                        value: 'Invalid recipient address',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                      ],
                      id: 130,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '1279:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 138,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1279:55:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 139,
                  nodeType: 'ExpressionStatement',
                  src: '1279:55:0',
                },
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        id: 145,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 141,
                          name: '_value',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 125,
                          src: '1352:6:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '<=',
                        rightExpression: {
                          baseExpression: {
                            id: 142,
                            name: 'balances',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 11,
                            src: '1362:8:0',
                            typeDescriptions: {
                              typeIdentifier:
                                't_mapping$_t_address_$_t_uint256_$',
                              typeString: 'mapping(address => uint256)',
                            },
                          },
                          id: 144,
                          indexExpression: {
                            id: 143,
                            name: '_from',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 121,
                            src: '1371:5:0',
                            typeDescriptions: {
                              typeIdentifier: 't_address',
                              typeString: 'address',
                            },
                          },
                          isConstant: false,
                          isLValue: true,
                          isPure: false,
                          lValueRequested: false,
                          nodeType: 'IndexAccess',
                          src: '1362:15:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        src: '1352:25:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue: '496e73756666696369656e742062616c616e6365',
                        id: 146,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '1379:22:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5',
                          typeString: 'literal_string "Insufficient balance"',
                        },
                        value: 'Insufficient balance',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_47533c3652efd02135ecc34b3fac8efc7b14bf0618b9392fd6e044a3d8a6eef5',
                          typeString: 'literal_string "Insufficient balance"',
                        },
                      ],
                      id: 140,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '1344:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 147,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1344:58:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 148,
                  nodeType: 'ExpressionStatement',
                  src: '1344:58:0',
                },
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                        id: 157,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 150,
                          name: '_value',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 125,
                          src: '1420:6:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '<=',
                        rightExpression: {
                          baseExpression: {
                            baseExpression: {
                              id: 151,
                              name: 'allowed',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 17,
                              src: '1430:7:0',
                              typeDescriptions: {
                                typeIdentifier:
                                  't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
                                typeString:
                                  'mapping(address => mapping(address => uint256))',
                              },
                            },
                            id: 153,
                            indexExpression: {
                              id: 152,
                              name: '_from',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 121,
                              src: '1438:5:0',
                              typeDescriptions: {
                                typeIdentifier: 't_address',
                                typeString: 'address',
                              },
                            },
                            isConstant: false,
                            isLValue: true,
                            isPure: false,
                            lValueRequested: false,
                            nodeType: 'IndexAccess',
                            src: '1430:14:0',
                            typeDescriptions: {
                              typeIdentifier:
                                't_mapping$_t_address_$_t_uint256_$',
                              typeString: 'mapping(address => uint256)',
                            },
                          },
                          id: 156,
                          indexExpression: {
                            expression: {
                              id: 154,
                              name: 'msg',
                              nodeType: 'Identifier',
                              overloadedDeclarations: [],
                              referencedDeclaration: 4294967281,
                              src: '1445:3:0',
                              typeDescriptions: {
                                typeIdentifier: 't_magic_message',
                                typeString: 'msg',
                              },
                            },
                            id: 155,
                            isConstant: false,
                            isLValue: false,
                            isPure: false,
                            lValueRequested: false,
                            memberName: 'sender',
                            nodeType: 'MemberAccess',
                            src: '1445:10:0',
                            typeDescriptions: {
                              typeIdentifier: 't_address',
                              typeString: 'address',
                            },
                          },
                          isConstant: false,
                          isLValue: true,
                          isPure: false,
                          lValueRequested: false,
                          nodeType: 'IndexAccess',
                          src: '1430:26:0',
                          typeDescriptions: {
                            typeIdentifier: 't_uint256',
                            typeString: 'uint256',
                          },
                        },
                        src: '1420:36:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue:
                          '496e73756666696369656e7420616c6c6f77616e6365',
                        id: 158,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '1458:24:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc',
                          typeString: 'literal_string "Insufficient allowance"',
                        },
                        value: 'Insufficient allowance',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_45e3d26e36c3151c7f92a1eee9add9658cbb8e14605ee2452ec007389b9744bc',
                          typeString: 'literal_string "Insufficient allowance"',
                        },
                      ],
                      id: 149,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '1412:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 159,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1412:71:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 160,
                  nodeType: 'ExpressionStatement',
                  src: '1412:71:0',
                },
                {
                  expression: {
                    id: 165,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        id: 161,
                        name: 'balances',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 11,
                        src: '1494:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 163,
                      indexExpression: {
                        id: 162,
                        name: '_from',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 121,
                        src: '1503:5:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1494:15:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '-=',
                    rightHandSide: {
                      id: 164,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 125,
                      src: '1513:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1494:25:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 166,
                  nodeType: 'ExpressionStatement',
                  src: '1494:25:0',
                },
                {
                  expression: {
                    id: 171,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        id: 167,
                        name: 'balances',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 11,
                        src: '1529:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 169,
                      indexExpression: {
                        id: 168,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 123,
                        src: '1538:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1529:13:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '+=',
                    rightHandSide: {
                      id: 170,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 125,
                      src: '1546:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1529:23:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 172,
                  nodeType: 'ExpressionStatement',
                  src: '1529:23:0',
                },
                {
                  expression: {
                    id: 180,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        baseExpression: {
                          id: 173,
                          name: 'allowed',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 17,
                          src: '1562:7:0',
                          typeDescriptions: {
                            typeIdentifier:
                              't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
                            typeString:
                              'mapping(address => mapping(address => uint256))',
                          },
                        },
                        id: 177,
                        indexExpression: {
                          id: 174,
                          name: '_from',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 121,
                          src: '1570:5:0',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        isConstant: false,
                        isLValue: true,
                        isPure: false,
                        lValueRequested: false,
                        nodeType: 'IndexAccess',
                        src: '1562:14:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 178,
                      indexExpression: {
                        expression: {
                          id: 175,
                          name: 'msg',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 4294967281,
                          src: '1577:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_magic_message',
                            typeString: 'msg',
                          },
                        },
                        id: 176,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: 'sender',
                        nodeType: 'MemberAccess',
                        src: '1577:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1562:26:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '-=',
                    rightHandSide: {
                      id: 179,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 125,
                      src: '1592:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1562:36:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 181,
                  nodeType: 'ExpressionStatement',
                  src: '1562:36:0',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        id: 183,
                        name: '_from',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 121,
                        src: '1622:5:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 184,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 123,
                        src: '1629:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 185,
                        name: '_value',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 125,
                        src: '1634:6:0',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 182,
                      name: 'Transfer',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 25,
                      src: '1613:8:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)',
                      },
                    },
                    id: 186,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1613:28:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 187,
                  nodeType: 'EmitStatement',
                  src: '1608:33:0',
                },
                {
                  expression: {
                    hexValue: '74727565',
                    id: 188,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'bool',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '1658:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    value: 'true',
                  },
                  functionReturnParameters: 129,
                  id: 189,
                  nodeType: 'Return',
                  src: '1651:11:0',
                },
              ],
            },
            functionSelector: '23b872dd',
            id: 191,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'transferFrom',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 126,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 121,
                  mutability: 'mutable',
                  name: '_from',
                  nodeType: 'VariableDeclaration',
                  scope: 191,
                  src: '1182:13:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 120,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '1182:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 123,
                  mutability: 'mutable',
                  name: '_to',
                  nodeType: 'VariableDeclaration',
                  scope: 191,
                  src: '1205:11:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 122,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '1205:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 125,
                  mutability: 'mutable',
                  name: '_value',
                  nodeType: 'VariableDeclaration',
                  scope: 191,
                  src: '1226:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 124,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1226:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1172:74:0',
            },
            returnParameters: {
              id: 129,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 128,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 191,
                  src: '1263:4:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_bool',
                    typeString: 'bool',
                  },
                  typeName: {
                    id: 127,
                    name: 'bool',
                    nodeType: 'ElementaryTypeName',
                    src: '1263:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1262:6:0',
            },
            scope: 273,
            src: '1151:518:0',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 218,
              nodeType: 'Block',
              src: '1748:129:0',
              statements: [
                {
                  expression: {
                    id: 207,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        baseExpression: {
                          id: 200,
                          name: 'allowed',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 17,
                          src: '1758:7:0',
                          typeDescriptions: {
                            typeIdentifier:
                              't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
                            typeString:
                              'mapping(address => mapping(address => uint256))',
                          },
                        },
                        id: 204,
                        indexExpression: {
                          expression: {
                            id: 201,
                            name: 'msg',
                            nodeType: 'Identifier',
                            overloadedDeclarations: [],
                            referencedDeclaration: 4294967281,
                            src: '1766:3:0',
                            typeDescriptions: {
                              typeIdentifier: 't_magic_message',
                              typeString: 'msg',
                            },
                          },
                          id: 202,
                          isConstant: false,
                          isLValue: false,
                          isPure: false,
                          lValueRequested: false,
                          memberName: 'sender',
                          nodeType: 'MemberAccess',
                          src: '1766:10:0',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        isConstant: false,
                        isLValue: true,
                        isPure: false,
                        lValueRequested: false,
                        nodeType: 'IndexAccess',
                        src: '1758:19:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 205,
                      indexExpression: {
                        id: 203,
                        name: '_spender',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 193,
                        src: '1778:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '1758:29:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '=',
                    rightHandSide: {
                      id: 206,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 195,
                      src: '1790:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '1758:38:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 208,
                  nodeType: 'ExpressionStatement',
                  src: '1758:38:0',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        expression: {
                          id: 210,
                          name: 'msg',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 4294967281,
                          src: '1820:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_magic_message',
                            typeString: 'msg',
                          },
                        },
                        id: 211,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: 'sender',
                        nodeType: 'MemberAccess',
                        src: '1820:10:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 212,
                        name: '_spender',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 193,
                        src: '1832:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 213,
                        name: '_value',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 195,
                        src: '1842:6:0',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 209,
                      name: 'Approval',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 33,
                      src: '1811:8:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)',
                      },
                    },
                    id: 214,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '1811:38:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 215,
                  nodeType: 'EmitStatement',
                  src: '1806:43:0',
                },
                {
                  expression: {
                    hexValue: '74727565',
                    id: 216,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'bool',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '1866:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    value: 'true',
                  },
                  functionReturnParameters: 199,
                  id: 217,
                  nodeType: 'Return',
                  src: '1859:11:0',
                },
              ],
            },
            functionSelector: '095ea7b3',
            id: 219,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'approve',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 196,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 193,
                  mutability: 'mutable',
                  name: '_spender',
                  nodeType: 'VariableDeclaration',
                  scope: 219,
                  src: '1692:16:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 192,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '1692:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 195,
                  mutability: 'mutable',
                  name: '_value',
                  nodeType: 'VariableDeclaration',
                  scope: 219,
                  src: '1710:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 194,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1710:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1691:34:0',
            },
            returnParameters: {
              id: 199,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 198,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 219,
                  src: '1742:4:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_bool',
                    typeString: 'bool',
                  },
                  typeName: {
                    id: 197,
                    name: 'bool',
                    nodeType: 'ElementaryTypeName',
                    src: '1742:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1741:6:0',
            },
            scope: 273,
            src: '1675:202:0',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 234,
              nodeType: 'Block',
              src: '1988:49:0',
              statements: [
                {
                  expression: {
                    baseExpression: {
                      baseExpression: {
                        id: 228,
                        name: 'allowed',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 17,
                        src: '2005:7:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$',
                          typeString:
                            'mapping(address => mapping(address => uint256))',
                        },
                      },
                      id: 230,
                      indexExpression: {
                        id: 229,
                        name: '_owner',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 221,
                        src: '2013:6:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: false,
                      nodeType: 'IndexAccess',
                      src: '2005:15:0',
                      typeDescriptions: {
                        typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                        typeString: 'mapping(address => uint256)',
                      },
                    },
                    id: 232,
                    indexExpression: {
                      id: 231,
                      name: '_spender',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 223,
                      src: '2021:8:0',
                      typeDescriptions: {
                        typeIdentifier: 't_address',
                        typeString: 'address',
                      },
                    },
                    isConstant: false,
                    isLValue: true,
                    isPure: false,
                    lValueRequested: false,
                    nodeType: 'IndexAccess',
                    src: '2005:25:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  functionReturnParameters: 227,
                  id: 233,
                  nodeType: 'Return',
                  src: '1998:32:0',
                },
              ],
            },
            functionSelector: 'dd62ed3e',
            id: 235,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'allowance',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 224,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 221,
                  mutability: 'mutable',
                  name: '_owner',
                  nodeType: 'VariableDeclaration',
                  scope: 235,
                  src: '1911:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 220,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '1911:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 223,
                  mutability: 'mutable',
                  name: '_spender',
                  nodeType: 'VariableDeclaration',
                  scope: 235,
                  src: '1935:16:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 222,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '1935:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1901:56:0',
            },
            returnParameters: {
              id: 227,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 226,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 235,
                  src: '1979:7:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 225,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '1979:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '1978:9:0',
            },
            scope: 273,
            src: '1883:154:0',
            stateMutability: 'view',
            virtual: false,
            visibility: 'public',
          },
          {
            body: {
              id: 271,
              nodeType: 'Block',
              src: '2108:174:0',
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        commonType: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        id: 250,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        leftExpression: {
                          id: 245,
                          name: '_to',
                          nodeType: 'Identifier',
                          overloadedDeclarations: [],
                          referencedDeclaration: 237,
                          src: '2126:3:0',
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        nodeType: 'BinaryOperation',
                        operator: '!=',
                        rightExpression: {
                          arguments: [
                            {
                              hexValue: '30',
                              id: 248,
                              isConstant: false,
                              isLValue: false,
                              isPure: true,
                              kind: 'number',
                              lValueRequested: false,
                              nodeType: 'Literal',
                              src: '2141:1:0',
                              typeDescriptions: {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                              value: '0',
                            },
                          ],
                          expression: {
                            argumentTypes: [
                              {
                                typeIdentifier: 't_rational_0_by_1',
                                typeString: 'int_const 0',
                              },
                            ],
                            id: 247,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            lValueRequested: false,
                            nodeType: 'ElementaryTypeNameExpression',
                            src: '2133:7:0',
                            typeDescriptions: {
                              typeIdentifier: 't_type$_t_address_$',
                              typeString: 'type(address)',
                            },
                            typeName: {
                              id: 246,
                              name: 'address',
                              nodeType: 'ElementaryTypeName',
                              src: '2133:7:0',
                              typeDescriptions: {},
                            },
                          },
                          id: 249,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          kind: 'typeConversion',
                          lValueRequested: false,
                          names: [],
                          nodeType: 'FunctionCall',
                          src: '2133:10:0',
                          tryCall: false,
                          typeDescriptions: {
                            typeIdentifier: 't_address',
                            typeString: 'address',
                          },
                        },
                        src: '2126:17:0',
                        typeDescriptions: {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                      },
                      {
                        hexValue:
                          '496e76616c696420726563697069656e742061646472657373',
                        id: 251,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'string',
                        lValueRequested: false,
                        nodeType: 'Literal',
                        src: '2145:27:0',
                        typeDescriptions: {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                        value: 'Invalid recipient address',
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_bool',
                          typeString: 'bool',
                        },
                        {
                          typeIdentifier:
                            't_stringliteral_9296ff0c00c9773aeb7dfef423d0c5484d831f800b943533b0cf1300a3d8e8df',
                          typeString:
                            'literal_string "Invalid recipient address"',
                        },
                      ],
                      id: 244,
                      name: 'require',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [4294967278, 4294967278],
                      referencedDeclaration: 4294967278,
                      src: '2118:7:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$',
                        typeString: 'function (bool,string memory) pure',
                      },
                    },
                    id: 252,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2118:55:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 253,
                  nodeType: 'ExpressionStatement',
                  src: '2118:55:0',
                },
                {
                  expression: {
                    id: 258,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      baseExpression: {
                        id: 254,
                        name: 'balances',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 11,
                        src: '2183:8:0',
                        typeDescriptions: {
                          typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
                          typeString: 'mapping(address => uint256)',
                        },
                      },
                      id: 256,
                      indexExpression: {
                        id: 255,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 237,
                        src: '2192:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      isConstant: false,
                      isLValue: true,
                      isPure: false,
                      lValueRequested: true,
                      nodeType: 'IndexAccess',
                      src: '2183:13:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    nodeType: 'Assignment',
                    operator: '+=',
                    rightHandSide: {
                      id: 257,
                      name: '_value',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 239,
                      src: '2200:6:0',
                      typeDescriptions: {
                        typeIdentifier: 't_uint256',
                        typeString: 'uint256',
                      },
                    },
                    src: '2183:23:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  id: 259,
                  nodeType: 'ExpressionStatement',
                  src: '2183:23:0',
                },
                {
                  eventCall: {
                    arguments: [
                      {
                        arguments: [
                          {
                            hexValue: '30',
                            id: 263,
                            isConstant: false,
                            isLValue: false,
                            isPure: true,
                            kind: 'number',
                            lValueRequested: false,
                            nodeType: 'Literal',
                            src: '2238:1:0',
                            typeDescriptions: {
                              typeIdentifier: 't_rational_0_by_1',
                              typeString: 'int_const 0',
                            },
                            value: '0',
                          },
                        ],
                        expression: {
                          argumentTypes: [
                            {
                              typeIdentifier: 't_rational_0_by_1',
                              typeString: 'int_const 0',
                            },
                          ],
                          id: 262,
                          isConstant: false,
                          isLValue: false,
                          isPure: true,
                          lValueRequested: false,
                          nodeType: 'ElementaryTypeNameExpression',
                          src: '2230:7:0',
                          typeDescriptions: {
                            typeIdentifier: 't_type$_t_address_$',
                            typeString: 'type(address)',
                          },
                          typeName: {
                            id: 261,
                            name: 'address',
                            nodeType: 'ElementaryTypeName',
                            src: '2230:7:0',
                            typeDescriptions: {},
                          },
                        },
                        id: 264,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: 'typeConversion',
                        lValueRequested: false,
                        names: [],
                        nodeType: 'FunctionCall',
                        src: '2230:10:0',
                        tryCall: false,
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 265,
                        name: '_to',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 237,
                        src: '2242:3:0',
                        typeDescriptions: {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                      },
                      {
                        id: 266,
                        name: '_value',
                        nodeType: 'Identifier',
                        overloadedDeclarations: [],
                        referencedDeclaration: 239,
                        src: '2247:6:0',
                        typeDescriptions: {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_address',
                          typeString: 'address',
                        },
                        {
                          typeIdentifier: 't_uint256',
                          typeString: 'uint256',
                        },
                      ],
                      id: 260,
                      name: 'Transfer',
                      nodeType: 'Identifier',
                      overloadedDeclarations: [],
                      referencedDeclaration: 25,
                      src: '2221:8:0',
                      typeDescriptions: {
                        typeIdentifier:
                          't_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$',
                        typeString: 'function (address,address,uint256)',
                      },
                    },
                    id: 267,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: 'functionCall',
                    lValueRequested: false,
                    names: [],
                    nodeType: 'FunctionCall',
                    src: '2221:33:0',
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: 't_tuple$__$',
                      typeString: 'tuple()',
                    },
                  },
                  id: 268,
                  nodeType: 'EmitStatement',
                  src: '2216:38:0',
                },
                {
                  expression: {
                    hexValue: '74727565',
                    id: 269,
                    isConstant: false,
                    isLValue: false,
                    isPure: true,
                    kind: 'bool',
                    lValueRequested: false,
                    nodeType: 'Literal',
                    src: '2271:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                    value: 'true',
                  },
                  functionReturnParameters: 243,
                  id: 270,
                  nodeType: 'Return',
                  src: '2264:11:0',
                },
              ],
            },
            functionSelector: '40c10f19',
            id: 272,
            implemented: true,
            kind: 'function',
            modifiers: [],
            name: 'mint',
            nodeType: 'FunctionDefinition',
            parameters: {
              id: 240,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 237,
                  mutability: 'mutable',
                  name: '_to',
                  nodeType: 'VariableDeclaration',
                  scope: 272,
                  src: '2057:11:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_address',
                    typeString: 'address',
                  },
                  typeName: {
                    id: 236,
                    name: 'address',
                    nodeType: 'ElementaryTypeName',
                    src: '2057:7:0',
                    stateMutability: 'nonpayable',
                    typeDescriptions: {
                      typeIdentifier: 't_address',
                      typeString: 'address',
                    },
                  },
                  visibility: 'internal',
                },
                {
                  constant: false,
                  id: 239,
                  mutability: 'mutable',
                  name: '_value',
                  nodeType: 'VariableDeclaration',
                  scope: 272,
                  src: '2070:14:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_uint256',
                    typeString: 'uint256',
                  },
                  typeName: {
                    id: 238,
                    name: 'uint256',
                    nodeType: 'ElementaryTypeName',
                    src: '2070:7:0',
                    typeDescriptions: {
                      typeIdentifier: 't_uint256',
                      typeString: 'uint256',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '2056:29:0',
            },
            returnParameters: {
              id: 243,
              nodeType: 'ParameterList',
              parameters: [
                {
                  constant: false,
                  id: 242,
                  mutability: 'mutable',
                  name: '',
                  nodeType: 'VariableDeclaration',
                  scope: 272,
                  src: '2102:4:0',
                  stateVariable: false,
                  storageLocation: 'default',
                  typeDescriptions: {
                    typeIdentifier: 't_bool',
                    typeString: 'bool',
                  },
                  typeName: {
                    id: 241,
                    name: 'bool',
                    nodeType: 'ElementaryTypeName',
                    src: '2102:4:0',
                    typeDescriptions: {
                      typeIdentifier: 't_bool',
                      typeString: 'bool',
                    },
                  },
                  visibility: 'internal',
                },
              ],
              src: '2101:6:0',
            },
            scope: 273,
            src: '2043:239:0',
            stateMutability: 'nonpayable',
            virtual: false,
            visibility: 'public',
          },
        ],
        scope: 274,
        src: '64:2220:0',
      },
    ],
    src: '39:2246:0',
  },
  compiler: {
    name: 'solc',
    version: '0.8.0+commit.c7dfd78e.Emscripten.clang',
  },
  networks: {
    '1689244387143': {
      events: {
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925': {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
      },
      links: {},
      address: '0x2C476656864BF9892aF44f81e27eC87Ce12CC231',
      transactionHash:
        '0x4abf36355feb55d52cfb8c12f0f8815cc78e9aca5011c442135e472e56800323',
    },
  },
  schemaVersion: '3.4.8',
  updatedAt: '2023-07-13T11:36:13.993Z',
  networkType: 'ethereum',
  devdoc: {
    kind: 'dev',
    methods: {},
    version: 1,
  },
  userdoc: {
    kind: 'user',
    methods: {},
    version: 1,
  },
};
