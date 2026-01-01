import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]">
      <FaSpinner className="h-12 w-12 animate-spin text-blue-500" />
    </div>
  );
}
