import axios from "axios";

type WebHookEvent =
  | "SUBSCRIPTION_BEGUN"
  | "SUBSCRIPTION_CANCELLED"
  | "SUBSCRIPTION_RENEWED"
  | "SUBSCRIPTION_ENDED"
  | "SUBSCRIPTION_CONTINUED"
  | "SUCCESSFUL_PAYMENT"
  | "FAILED_PAYMENT";

// find a way to refactor repeated parts(vendorId and client)
type WebHookEventData = {
  SUBSCRIPTION_BEGUN: {
    vendorId: string;
    vendorClientId: string;
    begun: Date;
    nextDate: Date;
  };
  SUBSCRIPTION_CANCELLED: {
    vendorId: string;
    vendorClientId: string;
    endDate: Date;
  };
  SUBSCRIPTION_RENEWED: {
    vendorId: string;
    vendorClientId: string;
    nextDate: Date;
  };
  SUBSCRIPTION_ENDED: {
    vendorId: string;
    vendorClientId: string;
  };
  SUBSCRIPTION_CONTINUED: {
    vendorId: string;
    vendorClientId: string;
    nextDate: Date;
  };
  SUCCESSFUL_PAYMENT: {
    vendorId: string;
    vendorClientId: string;
    vendorContract: string;
    userAddress: string;
    amount: number;
    tokenAddress: string;
    paymentDate: Date;
    hash: string;
  };
  FAILED_PAYMENT: {
    vendorId: string;
    vendorClientId: string;
  };
  // ... define data structures for other events
};

type EventPayload<T extends WebHookEvent> = {
  event: T;
  data: WebHookEventData[T];
};

export async function sendWebHook<T extends WebHookEvent>(
  auth: string,
  url: string,
  event: T,
  data: WebHookEventData[T]
): Promise<boolean> {
  try {
    const headers = {
      Authorization: auth,
    };
    const bodyData: EventPayload<T> = {
      event: event,
      data: data,
    };
    const res = await axios.post(url, bodyData, {
      headers,
    });
    if (res.status === 204 || res.status === 200) return true;
    return false;
  } catch {
    return false;
  }
}

// import axios from "axios";

// /*
//           {
//             event: "XXXXX",
//             timestamp: "USENEWDATEORSMTH",
//             data: {
//               // vendorId: "XXXX",
//               // vendorClientId : "YYY"
//               // rest...
//             }
//           }
// */
// type WebHookEvent =
//   | "SUBSCRIPTION_BEGUN"
//   | "SUBSCRIPTION_CANCELLED"
//   | "SUBSCRIPTION_RENEWED"
//   | "SUBSCRIPTION_ENDED"
//   | "SUBSCRIPTION_CONTINUED"
//   | "SUCCESSFUL_PAYMENT"
//   | "FAILED_PAYMENT";

// type WebHookData = {
//   vendorId: string;
//   vendorClientId: string;
//   [key: string]: any; // Allow additional properties of any type
// };

// export const sendWebHook = async (
//   auth: string,
//   url: string,
//   event: WebHookEvent,
//   data: WebHookData
// ) => {
//   try {
//     const headers = {
//       Authorization: auth,
//     };
//     const bodyData = {
//       timestamp: new Date(),
//       event: event,
//       data: data,
//     };
//     const res = await axios.post(url, bodyData, {
//       headers,
//     });
//     if (res.status === 204 || res.status === 200) return true;
//     return false;
//   } catch {
//     return false;
//   }
// };
