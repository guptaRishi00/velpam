"use client";

import React from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import LiveOrderFeed from "@/components/admin/LiveOrderFeed";
import TopProviders from "@/components/admin/TopProviders";

export default function AdminDashboard() {
  return (
    <div className="w-full min-h-screen p-6 lg:p-10">
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-[#FE564B] font-medium text-xl">
          Dashboard Overview
        </h1>

        {/* Top Stats Section - Now spans full width */}
        <DashboardStats />

        {/* Bottom Section - Spans full width */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <LiveOrderFeed />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <TopProviders />
          </div>
        </div>
      </div>
    </div>
  );
}
