"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "@/services/auth";
import AdminClient from "./AdminClient";
import { FaSpinner } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();

      if (!user) {
        sessionStorage.setItem("redirectAfterLogin", pathname);
        router.replace("/login");
        return;
      }

      if (user.role !== "admin") {
        router.replace("/");
        return;
      }

      setIsAuthorized(true);
      setLoading(false);
    }

    init();
  }, [pathname, router]);

  if (loading || !isAuthorized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <FaSpinner className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return <AdminClient />;
}
