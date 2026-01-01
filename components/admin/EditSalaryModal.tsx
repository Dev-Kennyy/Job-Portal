"use client";

import { updateJobSalary } from "@/services/jobs";
import { useModalStore } from "@/store/modal-store";
import React from "react";
import toast from "react-hot-toast";

interface EditSalaryModalProps {
  onJobUpdated?: () => void;
}

export default function EditSalaryModal({
  onJobUpdated,
}: EditSalaryModalProps) {
  const { isOpen, type, data: job, close } = useModalStore();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Parse current salary
  const parseSalary = (salary: string) => {
    if (salary === "Not disclosed") {
      return { min: "", max: "", period: "Year" };
    }
    const parts = salary.split(" / ");
    const period = parts[1] || "Year";
    const range = parts[0].replace(/\$/g, "").split(" – ");
    const min = range[0] || "";
    const max = range[1] || "";
    return { min, max, period };
  };

  const [salaryMin, setSalaryMin] = React.useState("");
  const [salaryMax, setSalaryMax] = React.useState("");
  const [salaryPeriod, setSalaryPeriod] = React.useState("Year");

  React.useEffect(() => {
    if (isOpen && type === "EDIT_SALARY" && job) {
      const parsed = parseSalary(job.salary);
      setSalaryMin(parsed.min);
      setSalaryMax(parsed.max);
      setSalaryPeriod(parsed.period);
    }
  }, [isOpen, type, job]);

  if (!isOpen || type !== "EDIT_SALARY" || !job) return null;

  const handleSubmit = async () => {
    if (!job) return;
    try {
      setLoading(true);
      setError(null);
      await updateJobSalary(job._id, salaryMin, salaryMax, salaryPeriod);
      toast.success("Salary updated successfully!");
      close();
      onJobUpdated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update salary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-6 text-white">
        <h2 className="mb-4 text-xl font-semibold">Edit Salary</h2>
        {error && <p className="mb-4 text-red-400">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Min Salary</label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Salary</label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              placeholder="e.g. 70000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Period</label>
            <select
              value={salaryPeriod}
              onChange={(e) => setSalaryPeriod(e.target.value)}
              className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            >
              <option value="Year">Year</option>
              <option value="Month">Month</option>
              <option value="Hour">Hour</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={close}
            className="rounded px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
