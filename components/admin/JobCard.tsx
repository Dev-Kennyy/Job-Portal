import { Job } from "@/data/jobs";
import { BiPencil } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

export default function JobCard({ job }: { job: Job }) {
  const typeStyles = {
    Remote: "bg-emerald-500/10 text-emerald-400",
    Hybrid: "bg-amber-500/10 text-amber-400",
    Onsite: "bg-blue-500/10 text-blue-400",
  };

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
            {job.techStack.map((tag) => (
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

        <button className="text-slate-400 transition hover:text-blue-400 cursor-pointer">
          <BiPencil size={16} />
        </button>

        <button className="text-slate-400 transition hover:text-red-400 cursor-pointer">
          <BsTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
