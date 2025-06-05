import { createSlice } from '@reduxjs/toolkit';

const vendorDetailsSlice = createSlice({
  name: 'vendorDetails',
  initialState: {
    name: '',
    email: '',
    apiKey: '',
    plan: '',
    vendorContract: '',
    tokenAddress: '',
    id: '',
  },
  reducers: {
    addVendorDetails(state, action) {
      return { ...action.payload };
    },
  },
});

export const { addVendorDetails } = vendorDetailsSlice.actions;
export default vendorDetailsSlice.reducer;
