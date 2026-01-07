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
    loading: () => <p>Loading...</p>,
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
