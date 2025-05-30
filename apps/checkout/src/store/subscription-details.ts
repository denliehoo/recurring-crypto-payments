import { VendorClientSubscriptionDetails } from 'core';
import { create } from 'zustand';

interface ISubscriptionDetailState {
  details: VendorClientSubscriptionDetails | undefined;
  refreshData: boolean;
  authToken: string;
}
interface ISubscriptionDetailAction {
  setRefreshData: () => void;
  setDetails: (details: VendorClientSubscriptionDetails) => void;
  setAuthToken: (authToken: string) => void;
}

export const useSubcriptionDetail = create<ISubscriptionDetailState & ISubscriptionDetailAction>(
  (set) => ({
    details: undefined,
    refreshData: false,
    authToken: '',
    setRefreshData: () => set(({ refreshData }) => ({ refreshData: !refreshData })),
    setDetails: (details) => set(() => ({ details })),
    setAuthToken: (authToken) => set(() => ({ authToken })),
  })
);
