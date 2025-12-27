import { JobFormState } from "@/lib/jobs";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllJobs() {
  try {
    if (!baseURL) {
      throw new Error("API_BASE_URL is not defined");
    }

    const response = await fetch(`${baseURL}/jobs`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getAllJobs error:", error);
    throw error; // rethrow so the caller can handle it
  }
}

//!GET A SINGLE JOB
export async function getSingleJob(id: string) {
  try {
    if (!baseURL) {
      throw new Error("API_BASE_URL is not defined");
    }

    const response = await fetch(`${baseURL}/jobs/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getAllJobs error:", error);
    throw error; // rethrow so the caller can handle it
  }
}

//!POST A JOB

export async function postJob(jobDetails: JobFormState) {
  try {
    if (!baseURL) {
      throw new Error("API_BASE_URL is not defined");
    }

    const salary =
      jobDetails.salaryMin && jobDetails.salaryMax
        ? `$${jobDetails.salaryMin} – $${jobDetails.salaryMax} / ${jobDetails.salaryPeriod}`
        : "Not disclosed";

    const transformedJob = {
      title: jobDetails.title,
      company: jobDetails.company,
      location: jobDetails.location,
      type: jobDetails.type,
      salary,
      tags: jobDetails.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      description: jobDetails.description,
    };

    const res = await fetch(`${baseURL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transformedJob),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to post job");
    }

    return await res.json();
  } catch (error) {
    console.error("postJob error:", error);
    throw error;
  }
}
