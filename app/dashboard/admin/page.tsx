import AdminOverview from "@/components/admin/AdminOverview";
import AllJobs from "@/components/admin/AllJobs";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#020617] via-deep to-midnight">
      <div className="mb-20">
        <AdminOverview />
      </div>
      <div className="py-5">
              <AllJobs />
              <p className="text-center text-primary pt-9 cursor-pointer hover:underline">See all Jobs</p>
      </div>
    </section>
  );
}
