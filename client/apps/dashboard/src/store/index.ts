// import { configureStore } from "@reduxjs/toolkit";
// import vendorDetailsReducer from "../slices/vendorDetailsSlice";

// export const store = configureStore({
//   reducer: {
//     vendorDetails: vendorDetailsReducer,
//     // filters: filtersReducer
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage or session storage
import vendorDetailsReducer from "../slices/vendorDetailsSlice";

const persistConfig = {
  key: "root", // Key to be used in local storage or session storage
  storage,
};

const persistedVendorDetailsReducer = persistReducer(
  persistConfig,
  vendorDetailsReducer
);

export const store = configureStore({
  reducer: {
    vendorDetails: persistedVendorDetailsReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
