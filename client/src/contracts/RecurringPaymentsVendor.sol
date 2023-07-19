// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./IERC20.sol";

contract RecurringPaymentsVendor {
    address public owner;
    address public token;
    address public master;
    uint256 public balance;

    event SuccessfulPayment(
        address user,
        address contractAddress,
        uint256 amount
    );
    event VendorWithdraw(uint256 amount, address contractAddress);

    constructor(address _token, address _owner) {
        owner = _owner; // the vendor
        token = _token; // this is the token that will be used for payments
        master = msg.sender;
    }

    function reduceUserBalance(
        address _user,
        uint256 _amount
    ) public onlyMaster {
        IERC20(token).transferFrom(_user, address(this), _amount);
        // 1% of payment transferred to master contract
        IERC20(token).transfer(master, _amount / 100);
        emit SuccessfulPayment(_user, address(this), _amount);
        balance += (_amount * 99) / 100;
    }

    function withdraw() public onlyOwner {
        require(balance > 0, "Can only with if balance > 0");
        IERC20(token).transfer(msg.sender, balance);
        emit VendorWithdraw(balance, address(this));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
    modifier onlyMaster() {
        require(msg.sender == master, "Only master contract can call");
        _;
    }
}
