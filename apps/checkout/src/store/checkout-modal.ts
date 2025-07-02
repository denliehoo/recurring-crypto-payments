import { create } from 'zustand';

export enum ECheckoutModal {
  ADD_ALLOWANCE = 'ADD_ALLOWANCE',
  CANCEL_PLAN = 'CANCEL_PLAN',
  CONFIGURE_PLAN = 'CONFIGURE_PLAN',
  UPDATE_BILLING = 'UPDATE_BILLING',
}

interface ICheckoutModalState {
  modal: ECheckoutModal | undefined;
}
interface ICheckoutModalAction {
  setModal: (modal: ECheckoutModal | undefined) => void;
}

export const useCheckoutModal = create<
  ICheckoutModalState & ICheckoutModalAction
>((set) => ({
  modal: undefined,
  setModal: (modal) => set(() => ({ modal })),
}));
