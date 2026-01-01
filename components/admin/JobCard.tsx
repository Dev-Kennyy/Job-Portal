"use client";

import { Job } from "@/lib/jobs";
import { deleteJob } from "@/services/jobs";
import { useModalStore } from "@/store/modal-store";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
};

export default function JobCard({ job, onDelete }: JobCardProps) {
  const { open } = useModalStore();
  const typeStyles: Record<string, string> = {
    Remote: "bg-emerald-500/10 text-emerald-400",
    Hybrid: "bg-amber-500/10 text-amber-400",
    Onsite: "bg-blue-500/10 text-blue-400",
    "Full-time": "bg-blue-500/10 text-blue-400",
  };

  async function handleDelete() {
    try {
      await deleteJob(job._id);
      onDelete(job._id); // ✅ instant UI update
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-blue-500/40 hover:bg-white/10">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-lg font-bold text-black">
          {job.company.charAt(0)}
        </div>

        <div>
          <h3 className="text-base font-semibold">{job.title}</h3>

          <p className="text-sm text-slate-400">
            {job.company} · {job.location} · {job.salary}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-black/30 px-2 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            typeStyles[job.type]
          }`}
        >
          {job.type}
        </span>

        <button
          onClick={() => open("EDIT_SALARY", job)}
          className="text-slate-400 transition hover:text-blue-400 cursor-pointer"
        >
          <BiPencil size={16} />
        </button>

        <button
          onClick={handleDelete}
          className="text-slate-400 transition hover:text-red-400 cursor-pointer"
        >
          <BsTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
