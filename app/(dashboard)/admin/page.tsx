import AdminOverview from "@/components/admin/AdminOverview";
import AllJobs from "@/components/admin/AllJobs";
import PostJobModal from "@/components/admin/PostJobModal";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#020617] via-deep to-midnight">
      <PostJobModal />

      <div className="mb-20">
        <AdminOverview />
      </div>

      <div className="py-5">
        <AllJobs />
        <p className="cursor-pointer pt-9 text-center text-primary hover:underline">
          See all Jobs
        </p>
      </div>
    </section>
  );
}
  