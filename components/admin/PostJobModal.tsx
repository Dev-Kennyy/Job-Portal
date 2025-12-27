"use client";

import { JobFormState } from "@/lib/jobs";
import { postJob } from "@/services/jobs";
import { useModalStore } from "@/store/modal-store";
import React from "react";

export default function PostJobModal() {
  const { isOpen, type, close } = useModalStore();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [jobDetails, setJobDetails] = React.useState<JobFormState>({
    title: "",
    company: "",
    location: "",
    type: "Remote",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "Year",
    tags: "",
    description: "",
  });

  if (!isOpen || type !== "POST_JOB") return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await postJob(jobDetails);
      close();
    } catch (err) {
      setError("Failed to publish job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

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

        {/* Job Info */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
            placeholder="Company"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            placeholder="Location"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <select
            name="type"
            value={jobDetails.type}
            onChange={handleChange}
            className="rounded-lg border border-white/10 bg-black p-3 text-sm outline-none "
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

        {/* Salary */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <input
            name="salaryMin"
            value={jobDetails.salaryMin}
            onChange={handleChange}
            placeholder="$ Min"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            name="salaryMax"
            value={jobDetails.salaryMax}
            onChange={handleChange}
            placeholder="$ Max"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
          <input
            name="salaryPeriod"
            value={jobDetails.salaryPeriod}
            onChange={handleChange}
            placeholder="/ Year"
            className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="mb-2 block text-xs uppercase text-slate-400">
            Skills & Tech Stack
          </label>
          <input
            name="tags"
            value={jobDetails.tags}
            onChange={handleChange}
            placeholder="React, TypeScript, Tailwind"
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="mb-2 block text-xs uppercase text-slate-400">
            Job Description
          </label>
          <textarea
            name="description"
            value={jobDetails.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the role..."
            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-400 text-right">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={close}
            className="text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Position →"}
          </button>
        </div>
      </div>
    </div>
  );
}
