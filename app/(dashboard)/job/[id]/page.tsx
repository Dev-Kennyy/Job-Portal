import Link from "next/link";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-white">
      {/* Back */}
      <p className="text-sm text-primary mb-6 cursor-pointer">
        <Link href="/">← Back to jobs</Link>
      </p>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white text-black flex items-center justify-center font-bold">
            V
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Senior Product Engineer</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mt-1">
              <span>Vercel</span>
              <span>•</span>
              <span>Remote (Worldwide)</span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-primary">
                $180k – $240k
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="cursor-pointer px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Share
          </button>
          <button className="px-5 py-2 rounded-lg bg-primary text-black font-medium cursor-pointer">
            Apply Now
          </button>
        </div>
      </div>

      {/* About */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">About the role</h2>
        <p className="text-white/70 leading-relaxed">
          We are looking for a Senior Product Engineer to help us build the
          future of the web. You will work closely with our product and design
          teams to ship high-quality software that millions of developers use
          every day.
        </p>
        <p className="text-white/70 leading-relaxed">
          In this role, you will be responsible for end-to-end feature
          development, from architectural design to deployment and monitoring.
          You will also mentor junior engineers and help drive technical
          decision-making.
        </p>
      </div>

      {/* Responsibilities */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Responsibilities</h2>
        <ul className="space-y-3 text-white/70">
          <li>
            ✔ Design and implement new features using React, Next.js, and
            TypeScript.
          </li>
          <li>✔ Collaborate with designers to ensure polished UI/UX.</li>
          <li>✔ Optimize application performance for scalability.</li>
        </ul>
      </div>

      {/* Requirements */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <ul className="space-y-3 text-white/70">
          <li>• 5+ years of experience building modern web applications.</li>
          <li>
            • Strong knowledge of JavaScript, TypeScript, React, and the DOM.
          </li>
          <li>• Experience with SSR and edge computing.</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {["React", "Next.js", "TypeScript", "Turborepo", "Tailwind"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-white/10 text-sm"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* Debug (optional) */}
      <p className="mt-12 text-xs text-white/40">Job ID: {id}</p>
    </section>
  );
}
