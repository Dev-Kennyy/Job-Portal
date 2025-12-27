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

  async function handleClick(e: React.FormEvent) {
    e.preventDefault(); // 🔴 THIS WAS MISSING
    setIsLoading(true);

    const res = await loginUser(loginInfo);

    if (res.ok) {
      const redirectPath = sessionStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        sessionStorage.removeItem("redirectAfterLogin");
        router.replace(redirectPath);
      } else {
        router.replace("/dashboard"); // ✅ default
      }
    }

    setIsLoading(false);
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
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black"
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
