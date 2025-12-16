"use client";

import { ReactNode } from "react";
import { useModalStore } from "@/store/modal-store";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { isOpen, close } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-midnight p-6 text-white shadow-xl">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
