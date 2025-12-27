import { getAllJobs } from "@/services/jobs";
import JobCard from "./job-card";
import Link from "next/link";
import { Job } from "@/lib/jobs";

export default async function Latestopening() {
  const allJobs = await getAllJobs();
  console.log(allJobs);
  return (
    <div>
      <div className="flex justify-between px-6 py-6 items-center">
        <h2 className="text-xl text-white">Latest Openings</h2>
        <p className="text-primary">Showing 24 Jobs</p>
      </div>
      <div className=" p-9 flex flex-col gap-3">
        {allJobs.data.map((job: Job) => (
          <Link key={job._id} href={`/job/${job._id}`}>
            <JobCard key={job._id} job={job} />
          </Link>
        ))}
      </div>
      <p className="text-center text-primary cursor-pointer underline ">
        Latest Openings
      </p>
    </div>
  );
}
