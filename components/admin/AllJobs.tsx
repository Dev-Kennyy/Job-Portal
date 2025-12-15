import { jobs } from "@/data/jobs";
import JobCard from "./JobCard";

export default function AllJobs() {
  return (
    <div className="text-white">
      <div className="flex justify-between items-center px-9">
        <h1 className="text-3xl">All Jobs</h1>
        <p className="text-primary ">Showing {"24"} Jobs</p>
      </div>
      <div>
        <div className="space-y-4 px-9 pt-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
