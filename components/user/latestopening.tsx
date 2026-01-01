"use client";

import { getAllJobs } from "@/services/jobs";
import JobCard from "./job-card";
import Link from "next/link";
import { Job } from "@/lib/jobs";
import { useEffect, useState } from "react";

export default function Latestopening() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

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

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const visibleJobs = allJobs.slice(0, visibleCount);

  return (
    <div>
      <div className="flex justify-between px-6 py-6 items-center">
        <h2 className="text-xl text-white">Latest Openings</h2>
        <p className="text-primary">
          Showing {visibleJobs.length} of {allJobs.length} Jobs
        </p>
      </div>
      <div className=" p-9 flex flex-col gap-3">
        {visibleJobs.map((job: Job) => (
          <Link key={job._id} href={`/job/${job._id}`}>
            <JobCard key={job._id} job={job} />
          </Link>
        ))}
      </div>
      {visibleCount < allJobs.length && (
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
