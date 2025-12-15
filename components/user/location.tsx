"use client";

import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const LOCATIONS = [
  "Remote",
  "Nigeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Europe",
];

export default function LocationDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("Select location");

  return (
    <div className="relative px-6 pb-16 text-white max-w-sm w-full">
      <h3 className="mb-3 text-sm font-semibold tracking-wider text-slate-400">
        LOCATION
      </h3>

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-blue-500/50 hover:bg-white/10"
      >
        <span
          className={
            selected === "Select location" ? "text-slate-400" : "text-white"
          }
        >
          {selected}
        </span>
        <BiChevronDown
          className={`h-4 w-4 transition ${
            open ? "rotate-180 text-blue-400" : "text-slate-400"
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-white/10 bg-[#050b2e] shadow-xl">
          {LOCATIONS.map((location) => (
            <button
              key={location}
              onClick={() => {
                setSelected(location);
                setOpen(false);
              }}
              className="block w-full px-4 py-2.5 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
