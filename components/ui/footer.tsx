import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#020617] text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
                ©
              </div>
              <span className="text-lg font-semibold text-white">
                Tech Career
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Discover verified tech jobs from world-class companies. Find your
              next career move with confidence.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Jobs</li>
              <li className="hover:text-white cursor-pointer">Companies</li>
              <li className="hover:text-white cursor-pointer">Salaries</li>
              <li className="hover:text-white cursor-pointer">Remote</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="http://github.com/Dev-Kennyy/"
                className="rounded-lg border border-white/10 p-2 transition hover:border-blue-500/50 hover:bg-white/5"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-white/10 p-2 transition hover:border-blue-500/50 hover:bg-white/5"
              >
                <LiaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-white/10 p-2 transition hover:border-blue-500/50 hover:bg-white/5"
              >
                <BsTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Tech Career. All rights reserved.
          </span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
