import type { VendorClientSubscriptionDetails } from '@core/types';
import { create } from 'zustand';

interface ISubscriptionDetailState {
  details: VendorClientSubscriptionDetails | undefined;
  refreshData: boolean;
}
interface ISubscriptionDetailAction {
  setRefreshData: () => void;
  setDetails: (details: VendorClientSubscriptionDetails) => void;
}

export const useSubcriptionDetail = create<
  ISubscriptionDetailState & ISubscriptionDetailAction
>((set) => ({
  details: undefined,
  refreshData: false,
  setRefreshData: () =>
    set(({ refreshData }) => ({ refreshData: !refreshData })),
  setDetails: (details) => set(() => ({ details })),
}));
