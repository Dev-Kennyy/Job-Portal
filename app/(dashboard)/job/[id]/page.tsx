import { jobs } from "@/data/jobs";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return <p className="text-center text-white">Job not found</p>;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-white">
      {/* Back */}
      <p className="text-sm text-primary mb-6">
        <Link href="/">← Back to jobs</Link>
      </p>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-bold">
            {job.companyInitial}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mt-1">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-primary">
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
            Share
          </button>
          <button className="px-5 py-2 rounded-lg bg-primary text-black font-medium">
            Apply Now
          </button>
        </div>
      </div>

      {/* About */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">About the role</h2>
        {job.about.map((text, i) => (
          <p key={i} className="text-white/70 leading-relaxed">
            {text}
          </p>
        ))}
      </div>

      {/* Responsibilities */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Responsibilities</h2>
        <ul className="space-y-3 text-white/70">
          {job.responsibilities.map((item, i) => (
            <li key={i}>✔ {item}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <ul className="space-y-3 text-white/70">
          {job.requirements.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {job.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md bg-white/10 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
