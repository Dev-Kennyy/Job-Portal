// import { jobs } from "@/data/jobs";
import { getAllJobs } from "@/services/jobs";
import JobCard from "./JobCard";
import { Job } from "@/lib/jobs";

export default async function AllJobs() {
  const jobs = await getAllJobs();
  return (
    <div className="text-white">
      <div className="flex justify-between items-center px-9">
        <h1 className="text-3xl">All Jobs</h1>
        <p className="text-primary ">Showing {jobs.data.length} Jobs</p>
      </div>
      <div>
        <div className="space-y-4 px-9 pt-5">
          {jobs.data.map((job: Job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
