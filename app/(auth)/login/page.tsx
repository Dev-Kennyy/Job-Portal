"use client";

import { loginUser } from "@/services/auth";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await loginUser(loginInfo);

      if (res.accessToken) {
        const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/";

        sessionStorage.removeItem("redirectAfterLogin");

        router.replace(redirectTo);
      }
    } catch (error) {
      let errorMessage = "Login failed";
      if (error instanceof Error) {
        // Clean up common error messages
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Invalid email or password";
        } else if (error.message.includes("User not found")) {
          errorMessage = "Account not found. Please check your email.";
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          errorMessage = "Network error. Please check your connection.";
        } else {
          errorMessage = error.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-white shadow-xl mt-36">
      <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
      <p className="mt-2 text-sm text-center text-slate-400">
        Enter your credentials to access your account.
      </p>

      <form className="space-y-4" onSubmit={handleClick}>
        <div>
          <label className="text-sm text-slate-300">Email address</label>
          <input
            type="email"
            placeholder="name@company.com"
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
            <p className="text-sm text-red-400 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer mt-2 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-indigo-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
