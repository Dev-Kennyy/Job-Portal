import SearchBar from "@/components/user/search";
import React from "react";
import Jobtype from "@/components/user/jobtype";
import SalaryRange from "@/components/user/salary";
import LocationFilter from "@/components/user/location";
import Latestopening from "@/components/user/latestopening";
import AdminOverview from "@/components/admin/AdminOverview";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#050b2e] to-[#0b143f]">
      <div className="mb-20">
        <AdminOverview />
      </div>
      {/* FILTERS */}
      {/* <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Jobtype />
          <SalaryRange />
          <LocationFilter />
        </div>
      </div> */}
      <div className="py-5">
        <Latestopening />
      </div>
    </section>
  );
}
