import { BiBriefcase } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";

export default function AdminOverview() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#020617] via-deep to-midnight px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage job listings and verify applications.
            </p>
          </div>

          <button className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer">
            Post New Job
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            title="Active Jobs"
            value="24"
            icon={<BiBriefcase className="h-5 w-5 text-cyan-400" />}
          />

          <StatCard
            title="Total Applicants"
            value="1,203"
            icon={<FaUserSecret className="h-5 w-5 text-cyan-400" />}
          />

          <StatCard
            title="Pending Review"
            value="8"
            icon={<CgLock className="h-5 w-5 text-cyan-400" />}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-blue-500/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          {title}
        </span>
        {icon}
      </div>

      <h2 className="text-3xl font-semibold">{value}</h2>
    </div>
  );
}
