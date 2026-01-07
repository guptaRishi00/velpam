"use client";

import React from "react";

export default function DashboardStats() {
  return (
    <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-8 lg:p-10 shadow-sm">
      {/* Flex container wrapping items */}
      <div className="flex flex-wrap gap-y-8 w-full">
        {/* Item 1: Top Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="text-[#47010099] font-medium text-lg">
            Total Revenue (30d)
          </p>
          <p className="text-[#470100] font-bold text-2xl">£60.00</p>
        </div>

        {/* Item 2: Top Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 md:items-end">
          <p className="text-[#47010099] font-medium text-lg">
            New Providers (30d)
          </p>
          <p className="text-[#470100] font-bold text-2xl">1</p>
        </div>

        {/* Item 3: Bottom Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="text-[#47010099] font-medium text-lg">New Orders</p>
          <p className="text-[#470100] font-bold text-2xl">2</p>
        </div>

        {/* Item 4: Bottom Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 md:items-end">
          <p className="text-[#47010099] font-medium text-lg">
            Completed (24h)
          </p>
          <p className="text-[#470100] font-bold text-2xl">0</p>
        </div>
      </div>
    </div>
  );
}
