"use client";

import { useEffect, useState, use } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { getCurrentUser } from "@/services/auth";
import { applyJob, getSingleJob } from "@/services/jobs";
import { useApplicationStore } from "@/store/application-store";
import SuccessModal from "@/components/ui/SuccessModal";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  description: string;
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const router = useRouter();
  const pathname = usePathname();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { hasApplied, loadAppliedJobs } = useApplicationStore();

  /* ---------------- Init ---------------- */
  useEffect(() => {
    async function init() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          sessionStorage.setItem("redirectAfterLogin", pathname);
          router.replace("/login");
          return;
        }

        await loadAppliedJobs();

        const jobData = await getSingleJob(id);
        setJob(jobData);
      } catch (err) {
        console.error("Failed to load job:", err);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [id, pathname, router, loadAppliedJobs]);

  /* ---------------- Apply ---------------- */
  const handleApply = async () => {
    if (!job || applying) return;

    if (hasApplied(job._id)) {
      toast("You have already applied to this job.");
      return;
    }

    setApplying(true);

    try {
      await applyJob(job._id);

      await loadAppliedJobs();

      setShowSuccessModal(true);
      toast.success("Application submitted successfully!");
    } catch (error: unknown) {
      let message = "Failed to apply for job.";

      if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (loading || !job) {
    return (
      <LoadingSpinner
        message="Loading job details..."
        minHeight="min-h-[60vh]"
        size="lg"
      />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link href="/" className="text-primary hover:underline">
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-white">
      <p className="text-sm text-primary mb-6">
        <Link href="/">← Back to jobs</Link>
      </p>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-bold">
            {job.company.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mt-1">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-primary">
                {job.type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
            Share
          </button>

          <button
            onClick={handleApply}
            disabled={applying || hasApplied(job._id)}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              hasApplied(job._id)
                ? "bg-green-600 text-white cursor-not-allowed"
                : applying
                ? "bg-primary/70 text-black cursor-not-allowed"
                : "bg-primary text-black hover:bg-primary/90"
            }`}
          >
            {applying ? (
              <div className="flex items-center gap-2">
                <FaSpinner className="h-4 w-4 animate-spin" />
                Applying...
              </div>
            ) : hasApplied(job._id) ? (
              "Already Applied"
            ) : (
              "Apply Now"
            )}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-10 pt-7 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">About the role</h2>
          <p className="text-white/70">{job.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 pt-3">
            {job.tags.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-white/10 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-lg mb-3">Job Details</h3>
          <div className="text-sm text-white/70 space-y-4">
            <p>
              <span className="text-white">Company:</span> {job.company}
            </p>
            <p>
              <span className="text-white">Location:</span> {job.location}
            </p>
            <p>
              <span className="text-white">Job Type:</span> {job.type}
            </p>
            <p>
              <span className="text-white">Salary:</span> {job.salary}
            </p>
          </div>
        </aside>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Submitted!"
        message="Your application has been successfully submitted. The employer will review your application and get back to you soon."
      />
    </section>
  );
}
