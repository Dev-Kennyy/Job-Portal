import React from "react";
import JobCard from "./job-card";
import { jobs } from "@/data/jobs";
import Link from "next/link";

export default function Latestopening() {
  return (
    <div>
      <div className="flex justify-between px-6 py-6 items-center">
        <h2 className="text-xl text-white">Latest Openings</h2>
        <p className="text-primary">Showing 24 Jobs</p>
      </div>
      <div className=" p-9 flex flex-col gap-3">
        {jobs.map((job) => (
          <Link key={job.id} href={`/job/${job.id}`}>
            <JobCard key={job.id} job={job} />
          </Link>
        ))}
      </div>
      <p className="text-center text-primary cursor-pointer underline ">
        Latest Openings
      </p>
    </div>
  );
}
