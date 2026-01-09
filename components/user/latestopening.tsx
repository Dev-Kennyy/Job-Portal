"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getAllJobs } from "@/services/jobs";
import { Job } from "@/lib/jobs";
import { useApplicationStore } from "@/store/application-store";

import JobCard from "./job-card";
import JobCardSkeleton from "./JobCardSkeleton";

interface LatestopeningProps {
  searchQuery: string;
}

const DEFAULT_VISIBLE_COUNT = 5;

export default function Latestopening({ searchQuery }: LatestopeningProps) {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const [loading, setLoading] = useState(true);

  const { hasApplied, loadAppliedJobs } = useApplicationStore();

  /* ---------------- Load applied jobs ---------------- */
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accessToken")
        : null;

    if (token) {
      loadAppliedJobs();
    }
  }, [loadAppliedJobs]);

  /* ---------------- Fetch all jobs ---------------- */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await getAllJobs();

        /**
         * ✅ SAFETY CHECK
         * Adjust based on how your API responds
         */
        const jobs: Job[] = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.jobs)
          ? response.jobs
          : [];

        setAllJobs(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setAllJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ---------------- Filter jobs ---------------- */
  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  /* ---------------- Visible jobs (derived state) ---------------- */
  const visibleJobs = filteredJobs.slice(
    0,
    searchQuery ? DEFAULT_VISIBLE_COUNT : visibleCount
  );

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + DEFAULT_VISIBLE_COUNT);
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="p-9 flex flex-col gap-3">
        {Array.from({ length: DEFAULT_VISIBLE_COUNT }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (allJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No Jobs Available
        </h3>
        <p className="text-slate-400">
          There are no job listings at the moment. Check back later!
        </p>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No Matching Jobs
        </h3>
        <p className="text-slate-400">
          No jobs match your search criteria. Try different keywords.
        </p>
      </div>
    );
  }

  /* ---------------- MAIN RENDER ---------------- */
  return (
    <div>
      <div className="flex justify-between px-6 py-6 items-center">
        <h2 className="text-xl text-white">Latest Openings</h2>
        <p className="text-primary">
          Showing {visibleJobs.length} of {filteredJobs.length} Jobs
        </p>
      </div>

      <div className="p-9 flex flex-col gap-3">
        {visibleJobs.map((job) => (
          <Link key={job._id} href={`/job/${job._id}`}>
            <JobCard job={job} hasApplied={hasApplied(job._id)} />
          </Link>
        ))}
      </div>

      {!searchQuery && visibleCount < filteredJobs.length && (
        <p
          className="text-center text-primary cursor-pointer underline"
          onClick={handleShowMore}
        >
          Show more
        </p>
      )}
    </div>
  );
}
