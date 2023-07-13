// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract RecurringPayments {
    uint256 public test;

    constructor() {
        test = 0;
    }

    function increment() public returns (uint256) {
        test++;
        return test;
    }
}
