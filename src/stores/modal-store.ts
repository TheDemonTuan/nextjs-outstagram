import { create } from "zustand";

interface ModalState {
  modalKey: string;
  modalData: any;
  modalOpen: (key: string) => void;
  modalClose: () => void;
  setModalData: <T = any>(data: T) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  modalData: {},
  modalKey: "",
  modalOpen: (key: string) => set({ modalKey: key }),
  modalClose: () => set({ modalKey: "", modalData: {} }),
  setModalData: (data) => set({ modalData: data }),
}));
