import models from '@src/models';
import { hashPassword } from './credentials';
import mongoose from 'mongoose';

const seedDataBase = async () => {
  const testPassword = await hashPassword('Testing1234!');
  const testApiKeys =
    'sk-ac469da4-37bf-4930-9750-38e36d209877d20b4e27-dac5-4959-ad54-42940bf05f7e3a0cda4a-dd1b-4c04-802b-7676ea76ed2b';
  const testVendor = new models.Vendor({
    name: 'Test Company',
    email: 'denliehoo.dev@gmail.com',
    isVerified: true,
    password: testPassword,
    apiKey: testApiKeys,
    tokenAddress: '0xc9606fea595ed3a94b4c8548ca0c2252c7856e89',
    vendorContract: '0x6f4E72BF6F989656a9B9C4F4271ce1d47CCDb9A4',
    amount: 15000000, // 15 USDT
    plan: 'Testing Company Premium Plan',
    webhookUrl: 'http://localhost:3001/payments/recurcrypt/webhook',
    returnUrl: 'http://localhost:3000/billing',
  });

  await testVendor.save();

  const vendorClient = new models.VendorClient({
    vendor: testVendor._id.toString(),
  });
  await vendorClient.save();

  // const scheduledPaymentDetails = {
  //   vendorContract: testVendor.vendorContract,
  //   userAddress: "0x760E626813d005F7a418508135E6948D32dB333E", // temp hard code - client address who is paying to the vendor
  //   amount: testVendor.amount,
  //   tokenAddress: testVendor.tokenAddress,
  //   vendorId: testVendor._id.toString(),
  //   vendorClientId: vendorClient._id.toString(),
  // };
  // const scheduledPayment1 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(),
  // });
  // const scheduledPayment2 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(Date.now() + 5 * 60000), // 5 minutes from now
  // });
  // // this shouldnt be inside when calling the CRON API since its >60mins
  // const scheduledPayment3 = new models.ScheduledPayment({
  //   ...scheduledPaymentDetails,
  //   paymentDate: new Date(Date.now() + 60 * 24 * 60000), // 1 day from now
  // });
  // scheduledPayment1.save();
  // scheduledPayment2.save();
  // scheduledPayment3.save();

  console.log('Successfully re-seeded')

};

const dropAllCollections = async () => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);

    // Drop each collection
    for (const collectionName of collectionNames) {
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    }

    console.log('All collections dropped successfully');
  } catch (error) {
    console.error('Error dropping collections:', error);
  }
};

export const reSeedDatabase = async () => {
  // biome-ignore lint/correctness/noConstantCondition: <Change to false if want to re-seed DB>
  if (true) {
    return;
  }
  if (process.env.ENV === 'DEV') {
    console.log('Re-seeding database!');
    // drops all collection
    await dropAllCollections();

    // clear database
    await Promise.all([
      models.Vendor.deleteMany({}),
      models.VendorClient.deleteMany({}),
      models.CompletedPayment.deleteMany({}),
      models.ScheduledPayment.deleteMany({}),
      models.Payout.deleteMany({}),
      models.PendingEndSubscription.deleteMany({})
    ]);
    await seedDataBase();
  } else if (process.env.ENV === 'PROD') {
    console.log(
      "You're attempting to re-seed production database. If you are sure, you can change the if statement at the top to change from DEV to PROD",
    );
  }
};
