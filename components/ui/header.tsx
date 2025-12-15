"use client";

import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-[#050B2E] via-[#070F3C] to-[#050B2E] fixed top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              ©
            </div>
            <span className="text-base font-semibold text-white sm:text-lg">
              Tech Career Hub
            </span>
          </div>

      

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white">
              Jobs
            </a>
            <a href="#" className="hover:text-white">
              Companies
            </a>
            <a href="#" className="hover:text-white">
              Salaries
            </a>

            <button className="relative">
              <FaBell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <BiUser className="h-4 w-4 text-white cursor-pointer" />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-4">
            {/* Role Toggle */}
            <div className="flex rounded-full bg-white/5 p-1 text-sm w-fit">
              <button className="rounded-full bg-white/10 px-4 py-1.5 text-white">
                User View
              </button>
              <button className="rounded-full px-4 py-1.5 text-gray-400 hover:text-white">
                Admin View
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-gray-300">
              <a href="#" className="hover:text-white">
                Jobs
              </a>
              <a href="#" className="hover:text-white">
                Companies
              </a>
              <a href="#" className="hover:text-white">
                Salaries
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="relative text-gray-300">
                <FaBell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
              </button>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <BiUser className="h-4 w-4 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
