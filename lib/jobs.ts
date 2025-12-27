export type JobType = "Remote" | "Hybrid" | "Onsite" | "Full-time";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  tags: string[];
  description: string;
  applicants: string[];
}
export interface JobFormState  {
    title: string;
    company: string;
    location: string;
    type: JobType;
    salaryMin: string;
    salaryMax: string;
    salaryPeriod: string;
    tags: string;
    description: string;
  };