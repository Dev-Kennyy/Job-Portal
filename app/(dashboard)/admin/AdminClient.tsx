"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AdminOverview from "@/components/admin/AdminOverview";
import AllJobs from "@/components/admin/AllJobs";
import PostJobModal from "@/components/admin/PostJobModal";
import EditSalaryModal from "@/components/admin/EditSalaryModal";

export default function AdminClient() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleJobPosted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#020617] via-deep to-midnight">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0b143f",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />
      <PostJobModal onJobPosted={handleJobPosted} />
      <EditSalaryModal onJobUpdated={handleJobPosted} />

      <div className="mb-20">
        <AdminOverview />
      </div>

      <div className="py-5">
        <AllJobs key={refreshKey} />
        <p className="cursor-pointer pt-9 text-center text-primary hover:underline">
          See all Jobs
        </p>
      </div>
    </section>
  );
}
