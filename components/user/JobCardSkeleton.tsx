import SkeletonLoader from "../ui/SkeletonLoader";

export default function JobCardSkeleton() {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <SkeletonLoader height="h-5" width="w-3/4" className="mb-2" />
          <SkeletonLoader height="h-4" width="w-1/2" className="mb-2" />
          <SkeletonLoader height="h-4" width="w-2/3" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <SkeletonLoader height="h-6" width="w-16" className="rounded-full" />
          <SkeletonLoader height="h-8" width="w-16" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
