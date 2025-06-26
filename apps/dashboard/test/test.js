const RecurringPayments = artifacts.require('RecurringPayments');
const RecurringPaymentsVendor = artifacts.require('RecurringPaymentsVendor');
const FakeUSDT = artifacts.require('FakeUSDT');

const { assert } = require('chai');

require('chai').use(require('chai-as-promised')).should();

contract('Test for contracts', (accounts) => {
  let master;
  let vendor;
  let usdt;
  const u1 = accounts[0];
  // const u2 = accounts[1];

  // const toWei = (num) => {
  //   return (num * 10 ** 18).toString();
  // };
  // // simulate waiting for next block
  // async function waitForNextBlock() {
  //   await web3.eth.sendTransaction({ from: u1, to: u1, value: 0 });
  // }

  before(async () => {
    // Load contracts
    master = await RecurringPayments.deployed();
    usdt = await FakeUSDT.deployed();
    await master.createVendorContract(usdt.address);
    const vendorContractAddress = await master.vendorContracts(u1, 0);
    vendor = await RecurringPaymentsVendor.at(vendorContractAddress);
  });

  describe('Checks for contract', async () => {
    it('Creation of Vendor contract should work', async () => {
      const vendorContractAddress = await master.vendorContracts(u1, 0);
      console.log(`vendor contract address is: ${vendorContractAddress}`);
      assert.equal(vendorContractAddress, vendor.address);

      const vendorOwner = await vendor.owner();
      const vendorToken = await vendor.token();
      const vendorMaster = await vendor.master();
      assert.equal(vendorOwner, u1);
      assert.equal(vendorToken, usdt.address);
      assert.equal(vendorMaster, master.address);
    });
    it('Deduction should work', async () => {
      await usdt.approve(vendor.address, '1000000000000000000000000');
      // 20,000,000 => 20 USDT
      await master.reduceUserBalance(vendor.address, u1, '20000000');
      const vendorProfitFromVendorContract = await vendor.balance();
      const vendorProfitFromTokenContract = await usdt.balanceOf(
        vendor.address,
      );
      assert.equal(
        vendorProfitFromTokenContract.toString(),
        vendorProfitFromVendorContract.toString(),
      );
      // 19,800,000 => 19.8 USDT
      assert.equal(vendorProfitFromTokenContract.toString(), '19800000');
      const masterProfit = await usdt.balanceOf(master.address);
      // 200,000 => 0.2 USDT
      assert.equal(masterProfit.toString(), '200000');
    });

    // it("XXX", async () => {
    // });
  });

  // add more describes where necessary
});
