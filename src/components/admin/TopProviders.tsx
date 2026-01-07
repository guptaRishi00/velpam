"use client";

import React from "react";

const providers = [
  {
    name: "The Grand Hotel London",
    count: "45 Orders",
  },
  {
    name: "Le Bernardin",
    count: "24 Orders",
  },
  {
    name: "British Airways First Class",
    count: "12 Orders",
  },
];

export default function TopProviders() {
  return (
    <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm h-full">
      <h3 className="text-[#47010099] font-medium text-lg mb-6">
        Top Providers by volume
      </h3>

      <div className="flex flex-col gap-6">
        {providers.map((provider, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#FFEDED] flex items-center justify-center shrink-0">
              <span className="text-[#FE564B] font-bold text-sm">
                {index + 1}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#470100] font-bold text-lg leading-tight">
                {provider.name}
              </p>
              <p className="text-[#47010099] font-medium text-base">
                {provider.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
