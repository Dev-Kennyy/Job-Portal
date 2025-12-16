import { create } from "zustand";

type ModalType = "POST_JOB" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}));
