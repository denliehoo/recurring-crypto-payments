import { createSlice } from "@reduxjs/toolkit";

export interface Vendor {
  name?: string;
  email: string;
  password: string;
  apiKey: string;
  webhookUrl?: string;
  tokenAddress?: string;
  amount?: number;
  vendorContract?: string;
  plan?: string; // plan name
  id: string;
}

const vendorDetailsSlice = createSlice({
  name: "vendorDetails",
  initialState: {
    name: "",
    email: "",
    apiKey: "",
    plan: "",
    vendorContract: "",
    tokenAddress: "",
    id: ""
  },
  reducers: {
    addVendorDetails(state, action) {
      return { ...action.payload };
    },
    // todoToggled(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload)
    //   todo.completed = !todo.completed
    // },
  },
});

export const { addVendorDetails } = vendorDetailsSlice.actions;
export default vendorDetailsSlice.reducer;
