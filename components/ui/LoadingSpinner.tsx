"use client";

interface LoadingSpinnerProps {
  /** Optional message below the spinner */
  message?: string;
  /** Minimum height of the container (e.g. "min-h-[40vh]") */
  minHeight?: string;
  /** Size of the spinner: "sm" | "md" | "lg" */
  size?: "sm" | "md" | "lg";
  /** Use full-screen overlay (e.g. for route loading) */
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
};

export default function LoadingSpinner({
  message,
  minHeight = "min-h-[40vh]",
  size = "md",
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#020617]/95 backdrop-blur-sm"
    : `flex flex-col items-center justify-center gap-4 ${minHeight} ${className}`;

  return (
    <div className={containerClass}>
      <div
        className={`${sizeClasses[size]} rounded-full border-primary/30 border-t-primary animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-sm font-medium text-white/80 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
