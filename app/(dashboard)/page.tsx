import SearchBar from "@/components/user/search";
import Jobtype from "@/components/user/jobtype";
import SalaryRange from "@/components/user/salary";
import LocationFilter from "@/components/user/location";
import Latestopening from "@/components/user/latestopening";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#020617] via-deep to-midnight">
      <div className="relative flex min-h-[70vh] items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative w-full max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Find your next{" "}
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Tech
            </span>{" "}
            role.
          </h1>

          <p className="mb-10 text-sm text-slate-300 sm:text-base">
            Join the best teams at world-class companies. Verified listings
            only.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Jobtype />
          <SalaryRange />
          <LocationFilter />
        </div>
      </div>
      <div className="py-5">
        <Latestopening />
      </div>
    </section>
  );
}
