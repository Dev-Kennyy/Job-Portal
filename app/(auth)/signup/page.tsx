"use client";

import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const [registerInfo, setRegisterInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (registerInfo.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (registerInfo.password !== registerInfo.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ready to send to backend
    setIsLoading(true);
    try {
      await registerUser(registerInfo);
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-white shadow-xl mt-30">
      <h1 className="text-2xl font-semibold text-center">Create an account</h1>
      <p className="mt-2 text-sm text-center text-slate-400">
        Start your 30-day free trial. No credit card required.
      </p>

      {/* <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 py-2.5 text-sm transition">
          GitHub
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 py-2.5 text-sm transition">
          Google
        </button>
      </div> */}

      <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-white/10" />
        OR WITH EMAIL
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-slate-300">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="John"
            value={registerInfo.firstName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Doe"
            value={registerInfo.lastName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Email address</label>
          <input
            name="email"
            type="email"
            placeholder="name@company.com"
            value={registerInfo.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={registerInfo.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={registerInfo.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer mt-2 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

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
