import axios from "axios";

/*
          {
            event: "XXXXX",
            timestamp: "USENEWDATEORSMTH",
            data: {
              // data1: "XXXX",
              // data2 : "YYY"
            }
          }
*/
export const sendWebHook = async (
  auth: string,
  url: string,
  event: string,
  data: any
) => {
  try {
    const headers = {
      Authorization: auth,
    };
    const bodyData = {
      timestamp: new Date(),
      event: event,
      data: data,
    };
    const res = await axios.post(url, bodyData, {
      headers,
    });
  } catch {
    return false;
  }
};
