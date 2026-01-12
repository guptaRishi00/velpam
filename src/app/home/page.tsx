"use client";

import HeroSection from "@/components/homepage/HeroSection";
import HowVelpamWorks from "@/components/homepage/HowVelpamWorks";
import MoreThan from "@/components/homepage/MoreThan";
import PerfectForEvery from "@/components/homepage/PerfectForEvery";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";

const ProtectedRoute = dynamic(
  () => import("@/components/shared/ProtectedRoute"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#FE564B] border-t-transparent"></div>
        <p className="text-[#47010080] font-medium animate-pulse text-lg">
          Preparing your experience...
        </p>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="">
        <Header />
        <HeroSection />
        <HowVelpamWorks />
        <MoreThan />
        <PerfectForEvery />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
