import { create } from "zustand";

interface ModalState {
  modalIsOpen: boolean;
  modalData: any;
  modalOpen: () => void;
  modalClose: () => void;
  setModalData: <T = any>(data: T) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  modalIsOpen: false,
  modalData: {},
  modalOpen: () => set({ modalIsOpen: true }),
  modalClose: () => set({ modalIsOpen: false }),
  setModalData: (data) => set({ modalData: data }),
}));
