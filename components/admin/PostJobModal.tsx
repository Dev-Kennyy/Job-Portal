"use client";

import { useModalStore } from "@/store/modal-store";

export default function PostJobModal() {
  const { isOpen, type, close } = useModalStore();

  if (!isOpen || type !== "POST_JOB") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b143f] p-8 text-white shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Post a new position</h2>
            <p className="text-sm text-slate-400">
              Reach thousands of developers worldwide.
            </p>
          </div>

          <button onClick={close} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Salary */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <input
            placeholder="$ Min"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            placeholder="$ Max"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            placeholder="/ Year"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="mb-2 block text-xs uppercase text-slate-400">
            Skills & Tech Stack
          </label>
          <input
            placeholder="React, TypeScript, Node.js"
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="mb-2 block text-xs uppercase text-slate-400">
            Job Description
          </label>
          <textarea
            rows={5}
            placeholder="Describe the role, responsibilities, and requirements..."
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={close}
            className="text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium hover:bg-indigo-700">
            Publish Position →
          </button>
        </div>
      </div>
    </div>
  );
}
