// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./IERC20.sol";
import "./RecurringPaymentsVendor.sol";

contract RecurringPayments {
    address public owner;
    mapping(address => address[]) public vendorContracts; // maps the vendor address to the vendor's contract

    event VendorContractCreated(address vendor, address contractAddress);

    constructor() {
        owner = msg.sender;
    }

    function createVendorContract(address _token) public returns (address) {
        // the msg.sender will be the owner of the new contract
        address newContract = address(
            new RecurringPaymentsVendor(_token, msg.sender)
        );
        vendorContracts[msg.sender].push(newContract);
        emit VendorContractCreated(msg.sender, newContract);
        return newContract;
    }

    function withdrawProfits(address _token, uint256 _amount) public onlyOwner {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function reduceUserBalance(
        address _vendor,
        address _user,
        uint256 _amount
    ) public onlyOwner {
        IRecurringPaymentsVendor(_vendor).reduceUserBalance(_user, _amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
}

interface IRecurringPaymentsVendor {
    function reduceUserBalance(address _user, uint256 _amount) external;
}

/*
    1. Increase allowance for this smart contract from the ERC20 token contract for the user calling
    2. Call the function (the server will call) to reduce user balance directly
*/
