"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks/hooks";

export default function RootPage() {
  const router = useRouter();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (user === null) {
    return null;
  }

  useEffect(() => {
    if (isAuthenticated && user.role === "customer") {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FE564B] border-t-transparent"></div>
    </div>
  );
}
