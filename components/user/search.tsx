import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center gap-2 rounded-xl border border-[--color-border-subtle] bg-[--color-glass] px-4 py-3 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.15)]">
        {/* Search Icon */}
        <FiSearch className="text-white text-lg" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search by title, stack, or company..."
          className="flex-1 bg-transparent text-sm text-white outline-none"
        />

        {/* Button */}
        <button className="cursor-pointer rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white hover:bg-[--color-primary-soft] transition">
          Search
        </button>
      </div>
    </div>
  );
}
