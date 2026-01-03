"use client";

import { useState, useEffect, useRef } from "react";
import { BiUser } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize login status from sessionStorage
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken");
      return !!token;
    }
    return false;
  });
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop =
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(target);
      const isOutsideMobile =
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for storage changes (login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logoutUser();
    checkLoginStatus(); // Update login status
    setDropdownOpen(false);
    setOpen(false); // Close mobile menu if open
    router.push("/login");
  };

  const handleLogin = () => {
    setDropdownOpen(false);
    setOpen(false); // Close mobile menu if open
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-full border-b border-white/10 bg-linear-to-r from-[#050B2E] via-[#070F3C] to-[#050B2E] fixed top-0 z-50 backdrop-blur-md">
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
            {/* <a href="#" className="hover:text-white">
              Jobs
            </a>
            <a href="#" className="hover:text-white">
              Companies
            </a>
            <a href="#" className="hover:text-white">
              Salaries
            </a> */}

            {/* <button className="relative">
              <FaBell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
            </button> */}

            <div className="relative" ref={desktopDropdownRef}>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 cursor-pointer"
                onClick={toggleDropdown}
              >
                <BiUser className="h-4 w-4 text-white" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
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
            {/* <nav className="flex flex-col gap-4 text-gray-300">
              <a href="#" className="hover:text-white">
                Jobs
              </a>
              <a href="#" className="hover:text-white">
                Companies
              </a>
              <a href="#" className="hover:text-white">
                Salaries
              </a>
            </nav> */}

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* <button className="relative text-gray-300">
                <FaBell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
              </button> */}

              <div className="relative" ref={mobileDropdownRef}>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <BiUser className="h-4 w-4 text-white" />
                </div>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg py-1 z-50">
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                      >
                        Login
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
