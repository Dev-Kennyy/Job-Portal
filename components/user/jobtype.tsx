import React from "react";

export default function Jobtype() {
  return (
    <div className="px-6 pb-16 text-white w-full">
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-400">
        JOB TYPE
      </h3>

      <div className="flex flex-wrap gap-3">
        {["Remote", "Hybrid", "Onsite", "Full-Time"].map((type) => (
          <label
            key={type}
            className="
              inline-flex cursor-pointer items-center gap-2
              rounded-lg border border-white/10
              bg-white/5 px-4 py-2
              text-sm
              transition
              hover:border-blue-500/50
              hover:bg-white/10
            "
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-transparent text-blue-500 focus:ring-blue-500"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
