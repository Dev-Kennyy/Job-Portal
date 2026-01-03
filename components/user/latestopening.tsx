"use client";

import { getAllJobs } from "@/services/jobs";
import JobCard from "./job-card";
import JobCardSkeleton from "./JobCardSkeleton";
import Link from "next/link";
import { Job } from "@/lib/jobs";
import { useEffect, useState } from "react";
import { useApplicationStore } from "@/store/application-store";

interface LatestopeningProps {
  searchQuery: string;
}

export default function Latestopening({ searchQuery }: LatestopeningProps) {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  const { hasApplied } = useApplicationStore();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setAllJobs(data.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    setVisibleCount(5); // Reset visible count when search changes
  }, [searchQuery]);

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return (
      <div className="p-9 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
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

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  return (
    <div>
      <div className="flex justify-between px-6 py-6 items-center">
        <h2 className="text-xl text-white">Latest Openings</h2>
        <p className="text-primary">
          Showing {visibleJobs.length} of {filteredJobs.length} Jobs
        </p>
      </div>
      <div className=" p-9 flex flex-col gap-3">
        {visibleJobs.map((job: Job) => (
          <Link key={job._id} href={`/job/${job._id}`}>
            <JobCard key={job._id} job={job} hasApplied={hasApplied(job._id)} />
          </Link>
        ))}
      </div>
      {visibleCount < filteredJobs.length && (
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
