"use client";

import React, { useState } from "react";

export default function SalaryRange() {
  const [salary, setSalary] = useState(100);

  return (
    <div className="px-6 pb-16 text-white max-w-sm w-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wider text-slate-400">
          SALARY RANGE
        </h3>
        <span className="text-sm text-blue-400 font-medium">${salary}k+</span>
      </div>

      <input
        type="range"
        min={50}
        max={300}
        step={10}
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className="w-full accent-blue-500"
      />

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>$50k</span>
        <span>$300k+</span>
      </div>
    </div>
  );
}
