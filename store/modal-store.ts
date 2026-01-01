import { create } from "zustand";
import { Job } from "@/lib/jobs";

type ModalType = "POST_JOB" | "EDIT_SALARY" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  data: Job | null;
  open: (type: ModalType, data?: Job | null) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  open: (type, data = null) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null, data: null }),
}));
