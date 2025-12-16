export default function Page() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-white shadow-xl mt-30">
      <h1 className="text-2xl font-semibold text-center">Create an account</h1>
      <p className="mt-2 text-sm text-center text-slate-400">
        Start your 30-day free trial. No credit card required.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 py-2.5 text-sm transition">
          GitHub
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 py-2.5 text-sm transition">
          Google
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-white/10" />
        OR WITH EMAIL
        <div className="h-px flex-1 bg-white/10" />
      </div>

        <form className="space-y-4">
        <div>
          <label className="text-sm text-slate-300">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Email address</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button className="mt-2 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-slate-200 transition">
          Create account
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-400 hover:underline">
          Log in
        </a>
      </p>

      <p className="mt-4 text-xs text-center text-slate-500">
        By signing up, you agree to our{" "}
        <a href="#" className="underline hover:text-white">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-white">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
