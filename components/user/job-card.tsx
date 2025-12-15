import { Job } from "@/data/jobs";

const typeStyles: Record<Job["type"], { bg: string; text: string }> = {
  Remote: {
    bg: "bg-green-500/10",
    text: "text-green-400",
  },
  Hybrid: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
  },
  Onsite: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
};

export default function JobCard({ job }: { job: Job }) {
  const badge = typeStyles[job.type];

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6 text-white transition hover:border-blue-500/40 hover:bg-white/10 cursor-pointer">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-slate-400">{job.company}</p>
          <p className="mt-2 text-sm text-slate-300">
            {job.location} • {job.salary}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.text}`}
          >
            {job.type}
          </span>

          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 cursor-pointer">
            Apply
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/10 px-2 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
