"use client";

import { useEffect, useState } from "react";
import { getAllJobs } from "@/services/jobs";
import JobCard from "./JobCard";
import { Job } from "@/lib/jobs";
import { FaSpinner } from "react-icons/fa";

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getAllJobs();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // ✅ THIS IS THE KEY PART
  function handleDeleteJob(id: string) {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 5);
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-white">
        <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="flex justify-between items-center px-9">
        <h1 className="text-3xl">All Jobs</h1>
        <p className="text-primary">
          Showing {Math.min(visibleCount, jobs.length)} of {jobs.length} Jobs
        </p>
      </div>

      <div className="space-y-4 px-9 pt-5">
        {jobs.slice(0, visibleCount).map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={handleDeleteJob} // ✅ pass handler
          />
        ))}
      </div>
      {visibleCount < jobs.length && (
        <p
          className="text-center text-primary cursor-pointer underline mt-4"
          onClick={handleShowMore}
        >
          Show more
        </p>
      )}
    </div>
  );
}
