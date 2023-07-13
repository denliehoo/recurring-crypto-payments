const RecurringPayments = artifacts.require("RecurringPayments");

module.exports = async function (deployer, network, accounts) {
  const u1 = accounts[0];
  await deployer.deploy(RecurringPayments);
  const instance = await RecurringPayments.deployed();

  let test = await instance.test();
  console.log(`Test is currently ${test.toString()}`);
  await instance.increment();
  test = await instance.test();
  console.log(`Test is currently ${test.toString()}`);
};
