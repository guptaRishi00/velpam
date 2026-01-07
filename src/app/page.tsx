"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks/hooks";

export default function RootPage() {
  const router = useRouter();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user && isAuthenticated) return;

    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin-dashboard");
      } else if (user.role === "customer") {
        router.push("/home");
      } else {
        router.push("/login");
      }
    } else if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FE564B] border-t-transparent"></div>
    </div>
  );
}
