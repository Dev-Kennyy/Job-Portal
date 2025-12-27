import AdminOverview from "@/components/admin/AdminOverview";
import AllJobs from "@/components/admin/AllJobs";
import PostJobModal from "@/components/admin/PostJobModal";
// import { getCurrentUser } from "@/lib/auth";
// import { redirect } from "next/navigation";

export default async function Page() {
  // const user = await getCurrentUser()
  // if (!user) redirect('/login')
  // if (user.role !== "admin") redirect('/dashboard')
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
  