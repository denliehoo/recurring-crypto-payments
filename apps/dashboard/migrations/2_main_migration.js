const RecurringPayments = artifacts.require('RecurringPayments');
// const RecurringPaymentsVendor = artifacts.require('RecurringPaymentsVendor');
const FakeUSDT = artifacts.require('FakeUSDT');

module.exports = async (deployer, _network, _accounts) => {
  // const u1 = accounts[0];
  // const u2 = accounts[1];
  await deployer.deploy(FakeUSDT);
  await deployer.deploy(RecurringPayments);
};
