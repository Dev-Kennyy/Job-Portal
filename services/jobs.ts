import { Job, JobFormState } from "@/lib/jobs";

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

    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Not authenticated");
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ THIS FIXES IT
      },
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

//?!DELETE A JOB

export async function deleteJob(id: string) {
  try {
    if (!baseURL) {
      throw new Error("API_BASE_URL is not defined");
    }
    const token = sessionStorage.getItem("accessToken");

    const res = await fetch(`${baseURL}/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete job: ${res.statusText}`);
    }

    return await res.json(); // or return true if API sends no body
  } catch (error) {
    console.error("Delete job error:", error);
    throw error;
  }
}

//? Update a job
export async function updateJob(id: string, updatedData: Partial<Job>) {
  try {
    if (!baseURL) {
      throw new Error("API_BASE_URL is not defined");
    }
    const token = sessionStorage.getItem("accessToken");

    const res = await fetch(`${baseURL}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update job: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Update job error:", error);
    throw error;
  }
}

//? Update salary specifically
export async function updateJobSalary(
  id: string,
  salaryMin: string,
  salaryMax: string,
  salaryPeriod: string
) {
  const salary =
    salaryMin && salaryMax
      ? `$${salaryMin} – $${salaryMax} / ${salaryPeriod}`
      : "Not disclosed";
  return updateJob(id, { salary });
}
