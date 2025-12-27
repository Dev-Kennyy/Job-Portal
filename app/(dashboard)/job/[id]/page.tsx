"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";
import { getSingleJob } from "@/services/jobs";
import Link from "next/link";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  description: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();

      // 🔐 Not logged in → save page + redirect
      if (!user) {
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.replace("/login");
        return;
      }

      // ✅ Logged in → fetch job
      const jobData = await getSingleJob(params.id);
      setJob(jobData);
      setLoading(false);
    }

    init();
  }, [params.id, pathname, router]);

  if (loading || !job) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-white">
      {/* Back */}
      <p className="text-sm text-primary mb-6">
        <Link href="/">← Back to jobs</Link>
      </p>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-bold">
            {job.company.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mt-1">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-primary">
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
            Share
          </button>
          <button className="px-5 py-2 rounded-lg bg-primary text-black font-medium cursor-pointer">
            Apply Now
          </button>
        </div>
      </div>

      {/* About */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">About the role</h2>
        <p className="text-white/70 leading-relaxed">{job.description}</p>
      </div>

      {/* Tech Stack */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {job.tags.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md bg-white/10 text-sm cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
