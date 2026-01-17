"use client";

import React from "react";

export default function DashboardStats() {
  return (
    // Reduced padding (p-8 lg:p-10 -> p-4) and rounded corners (rounded-3xl -> rounded-2xl)
    <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm">
      {/* Reduced vertical gap (gap-y-8 -> gap-y-4) */}
      <div className="flex flex-wrap gap-y-4 w-full">
        {/* Item 1: Top Left */}
        {/* Reduced gap between label and value (gap-2 -> gap-1) */}
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          {/* Reduced text size (text-lg -> text-sm) */}
          <p className="text-[#47010099] font-medium text-sm">
            Total Revenue (30d)
          </p>
          {/* Reduced value size (text-2xl -> text-xl) */}
          <p className="text-[#470100] font-bold text-xl">£60.00</p>
        </div>

        {/* Item 2: Top Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-1 md:items-end">
          <p className="text-[#47010099] font-medium text-sm">
            New Providers (30d)
          </p>
          <p className="text-[#470100] font-bold text-xl">1</p>
        </div>

        {/* Item 3: Bottom Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <p className="text-[#47010099] font-medium text-sm">New Orders</p>
          <p className="text-[#470100] font-bold text-xl">2</p>
        </div>

        {/* Item 4: Bottom Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-1 md:items-end">
          <p className="text-[#47010099] font-medium text-sm">
            Completed (24h)
          </p>
          <p className="text-[#470100] font-bold text-xl">0</p>
        </div>
      </div>
    </div>
  );
}
