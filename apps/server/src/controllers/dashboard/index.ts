// import { DashboardChartData } from '@core/types';
// import models from '@src/models';
// import { CustomRequest, IDecodedAuthToken } from '@src/types/requests';
// import { findVendorById } from '@src/utility/findFromDb';
// import RecurringPaymentsVendor from '@src/contractABIs/RecurringPaymentsVendor.json';
// import type { Response } from 'express';

// import Web3 from 'web3';

// const { CompletedPayment } = models;

// export const getDashboard = async (
//   req: CustomRequest<IDecodedAuthToken>,
//   res: Response,
// ) => {
//   const { vendorId } = req.decoded;
//   const { utc } = req.query;
//   const timezone = Number.parseInt(utc as string);

//   let totalDaily = 0;

//   const vendor = await findVendorById(vendorId);

//   if (!vendor?.vendorContract) return res.status(204).end();

//   type PaymentData = {
//     paymentDate: string;
//     amount: number;
//   };

//   const transformData = (data: PaymentData[], timezoneOffset: number) => {
//     const amounts: DashboardChartData[] = [
//       { time: '00:00', amount: 0 },
//       { time: '03:00', amount: 0 },
//       { time: '06:00', amount: 0 },
//       { time: '09:00', amount: 0 },
//       { time: '12:00', amount: 0 },
//       { time: '15:00', amount: 0 },
//       { time: '18:00', amount: 0 },
//       { time: '21:00', amount: 0 },
//       { time: '24:00', amount: 0 },
//     ];

//     for (const d of data) {
//       const date = new Date(d.paymentDate);
//       date.setHours(date.getHours() + timezoneOffset); // Apply the timezone offset
//       let indx = Math.ceil(date.getHours() / 3);
//       if (indx === 0) indx = 1;
//       amounts[indx]!.amount! += d.amount! / 10 ** 6;
//     }

//     let currentHourIndex = Math.ceil(new Date().getHours() / 3);
//     currentHourIndex = (currentHourIndex + Math.floor(timezoneOffset / 3)) % 8;
//     if (currentHourIndex < 0) currentHourIndex += 8;

//     for (let i = 1; i < currentHourIndex + 1; i++) {
//       const current = amounts[i];
//       const previous = amounts[i - 1];

//       if (current && previous && current.amount && previous.amount) {
//         current.amount += previous.amount;
//       }
//     }
//     if (currentHourIndex === 8) return amounts;
//     for (let i = currentHourIndex + 1; i < amounts.length; i++) {
//       amounts[i].amount = undefined;
//     }

//     totalDaily = amounts[currentHourIndex].amount || 0;

//     return amounts;
//   };

//   const serverTimeZone = Math.abs(new Date().getTimezoneOffset() / 60);

//   // because UTC time received is in serverTimeZone.
//   // Hence, need to - it to be UTC0. Then + timezone (for the client)
//   const now = new Date();
//   const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
//   todayStart.setHours(todayStart.getHours() + timezone - serverTimeZone);

//   let dailyCompletedPayments;
//   try {
//     dailyCompletedPayments = await CompletedPayment.find({
//       status: 'paid',
//       paymentDate: {
//         $gte: todayStart,
//         $lte: new Date(), // curent time now
//       },
//     });
//   } catch {
//     return res
//       .status(500)
//       .json({ error: 'Error in fetching daily completed payments' });
//   }

//   // const data = generateSampleData();
//   const data = dailyCompletedPayments.map((d: any) => ({
//     paymentDate: d.paymentDate,
//     amount: d.amount,
//   }));
//   const transformed = transformData(data, timezone - serverTimeZone);

//   let recentCompletedPayments;
//   try {
//     recentCompletedPayments = await CompletedPayment.find({ vendorId })
//       .sort({ paymentDate: -1 }) // Sort by paymentDate in descending order (most recent first)
//       .limit(5); // Limit the result to 5 documents
//   } catch {
//     return res
//       .status(500)
//       .json({ error: 'Error in fetching recent completed payments' });
//   }

//   let pendingBalance;
//   try {
//     const web3 = new Web3(process.env.WEB3_PROVIDER!);
//     if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
//     const contract = new web3.eth.Contract(
//       RecurringPaymentsVendor.abi as any,
//       vendor.vendorContract,
//     );

//     pendingBalance = await contract.methods.balance().call();
//   } catch {
//     return res
//       .status(500)
//       .json({ error: 'Error in fetching pending balance from contract' });
//   }
//   return res.send({
//     chartData: transformed,
//     recentPayments: recentCompletedPayments,
//     totalDaily: totalDaily,
//     pendingBalance: Number.parseInt(pendingBalance),
//   });
// };

// // helpers

// // const generateSampleData = () => {
// //   let data = [];
// //   const generateRandomDate = () => {
// //     const now = new Date();
// //     const todayStart = new Date(
// //       now.getFullYear(),
// //       now.getMonth(),
// //       now.getDate()
// //     ); // Midnight today
// //     const randomTime = Math.floor(
// //       Math.random() * (now.getTime() - todayStart.getTime())
// //     );
// //     const randomDate = new Date(todayStart.getTime() + randomTime);
// //     return randomDate.toISOString();
// //   };

// //   for (let i = 0; i < 10; i++) {
// //     data.push({
// //       paymentDate: generateRandomDate(),
// //       amount: 15000000,
// //     });
// //   }
// //   data.sort((a, b) => Date.parse(a.paymentDate) - Date.parse(b.paymentDate));
// //   return data;
// // };

import { DashboardChartData } from '@core/types';
import models from '@src/models';
import { CustomRequest, IDecodedAuthToken } from '@src/types/requests';
import { findVendorById } from '@src/utility/findFromDb';
import RecurringPaymentsVendor from '@src/contractABIs/RecurringPaymentsVendor.json';
import type { Response } from 'express';

import Web3 from 'web3';
import { ICompletedPayment } from '@src/models/completedPayment';

const { CompletedPayment } = models;

export const getDashboard = async (
  req: CustomRequest<IDecodedAuthToken>,
  res: Response,
) => {
  const { vendorId } = req.decoded;
  const { utc } = req.query;
  const timezone = Number.parseInt(utc as string);

  const vendor = await findVendorById(vendorId);

  if (!vendor?.vendorContract) return res.status(204).end();

  const serverTimeZone = Math.abs(new Date().getTimezoneOffset() / 60);

  // because UTC time received is in serverTimeZone.
  // Hence, need to - it to be UTC0. Then + timezone (for the client)
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
  todayStart.setHours(todayStart.getHours() + timezone - serverTimeZone);

  let dailyCompletedPayments: ICompletedPayment[];
  try {
    dailyCompletedPayments = await CompletedPayment.find({
      status: 'paid',
      paymentDate: {
        $gte: todayStart,
        $lte: new Date(), // curent time now
      },
    });
  } catch {
    return res
      .status(500)
      .json({ error: 'Error in fetching daily completed payments' });
  }

  // const data = generateSampleData();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const data: any = dailyCompletedPayments.map((d) => ({
    paymentDate: d.paymentDate,
    amount: d.amount,
  }));
  const { chartData, totalDaily } = getTransformedData(
    data,
    timezone - serverTimeZone,
  );

  let recentCompletedPayments: ICompletedPayment[];
  try {
    recentCompletedPayments = await CompletedPayment.find({ vendorId })
      .sort({ paymentDate: -1 }) // Sort by paymentDate in descending order (most recent first)
      .limit(5); // Limit the result to 5 documents
  } catch {
    return res
      .status(500)
      .json({ error: 'Error in fetching recent completed payments' });
  }

  let pendingBalance: string;
  try {
    const web3 = new Web3(process.env.WEB3_PROVIDER || '');
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    const contract = new web3.eth.Contract(
      // biome-ignore lint/suspicious/noExplicitAny: <TO set proper typing>
      RecurringPaymentsVendor.abi as any,
      vendor.vendorContract,
    );

    pendingBalance = await contract.methods.balance().call();
  } catch {
    return res
      .status(500)
      .json({ error: 'Error in fetching pending balance from contract' });
  }
  return res.send({
    chartData,
    recentPayments: recentCompletedPayments,
    totalDaily: totalDaily,
    pendingBalance: Number.parseInt(pendingBalance),
  });
};

// helpers

interface IPaymentData {
  paymentDate: string;
  amount: number;
}

// TODO: Check on dashboard logic

const getTransformedData = (data: IPaymentData[], timezoneOffset: number) => {
  const amounts: DashboardChartData[] = [
    { time: '00:00', amount: 0 },
    { time: '03:00', amount: 0 },
    { time: '06:00', amount: 0 },
    { time: '09:00', amount: 0 },
    { time: '12:00', amount: 0 },
    { time: '15:00', amount: 0 },
    { time: '18:00', amount: 0 },
    { time: '21:00', amount: 0 },
    { time: '24:00', amount: 0 },
  ];

  for (const d of data) {
    const date = new Date(d.paymentDate);
    date.setHours(date.getHours() + timezoneOffset); // Apply the timezone offset
    let indx = Math.ceil(date.getHours() / 3);
    if (indx === 0) {
      indx = 1;
    }
    amounts[indx].amount = (amounts[indx]?.amount || 0) + d.amount / 10 ** 6;
  }

  let currentHourIndex = Math.ceil(new Date().getHours() / 3);
  currentHourIndex = (currentHourIndex + Math.floor(timezoneOffset / 3)) % 8;
  if (currentHourIndex < 0) currentHourIndex += 8;

  for (let i = 1; i < currentHourIndex + 1; i++) {
    const current = amounts[i];
    const previous = amounts[i - 1];

    if (current && previous && current.amount && previous.amount) {
      current.amount += previous.amount;
    }
  }
  if (currentHourIndex === 8) {
    const totalDaily = amounts[currentHourIndex].amount || 0;

    return { chartData: amounts, totalDaily };
  }
  for (let i = currentHourIndex + 1; i < amounts.length; i++) {
    amounts[i].amount = undefined;
  }

  const totalDaily = amounts[currentHourIndex].amount || 0;

  return { chartData: amounts, totalDaily };
};

// const generateSampleData = () => {
//   let data = [];
//   const generateRandomDate = () => {
//     const now = new Date();
//     const todayStart = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate()
//     ); // Midnight today
//     const randomTime = Math.floor(
//       Math.random() * (now.getTime() - todayStart.getTime())
//     );
//     const randomDate = new Date(todayStart.getTime() + randomTime);
//     return randomDate.toISOString();
//   };

//   for (let i = 0; i < 10; i++) {
//     data.push({
//       paymentDate: generateRandomDate(),
//       amount: 15000000,
//     });
//   }
//   data.sort((a, b) => Date.parse(a.paymentDate) - Date.parse(b.paymentDate));
//   return data;
// };
