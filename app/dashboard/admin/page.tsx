
import Latestopening from "@/components/user/latestopening";
import AdminOverview from "@/components/admin/AdminOverview";
import AllJobs from "@/components/admin/AllJobs";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#050b2e] to-[#0b143f]">
      <div className="mb-20">
        <AdminOverview />
      </div>
          <div className="py-5">
              <AllJobs />
      </div>
    </section>
  );
}
