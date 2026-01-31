"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/store/modal-store";
import { getAdminStats } from "@/services/jobs";
import { BiBriefcase } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface AdminStats {
  totalJobs: number;
  totalApplications: number;
  pendingReview: number;
}

export default function AdminOverview() {
  const open = useModalStore((state) => state.open);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) return;

        const data = await getAdminStats();
        setStats({
          totalJobs: data.totalJobs,
          totalApplications: data.totalApplications,
          pendingReview: data.totalApplications, // adjust if backend differs
        });
        console.log("Admin stats fetched:", data);
      } catch (error) {
        console.error("Admin stats error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading dashboard..."
        minHeight="min-h-[50vh]"
        size="lg"
      />
    );
  }

  if (!stats) {
    return (
      <p className="text-center text-red-400">
        Failed to load admin statistics
      </p>
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#020617] via-deep to-midnight px-6 py-16 text-white">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

          <button
            onClick={() => open("POST_JOB")}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-700"
          >
            Post New Job
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            title="Active Jobs"
            value={String(stats.totalJobs)}
            icon={<BiBriefcase className="h-5 w-5 text-cyan-400" />}
          />

          <StatCard
            title="Total Applicants"
            value={String(stats.totalApplications)}
            icon={<FaUserSecret className="h-5 w-5 text-cyan-400" />}
          />

          <StatCard
            title="Pending Review"
            value={String(stats.pendingReview)}
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
      {" "}
      <div className="mb-4 flex items-center justify-between">
        {" "}
        <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          {" "}
          {title}{" "}
        </span>{" "}
        {icon}{" "}
      </div>{" "}
      <h2 className="text-3xl font-semibold">{value}</h2>{" "}
    </div>
  );
}
