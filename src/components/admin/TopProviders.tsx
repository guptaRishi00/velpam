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
    // Reduced padding (p-8 -> p-4) and rounded corners (rounded-3xl -> rounded-2xl)
    <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm h-full">
      {/* Reduced header size (text-lg -> text-sm) and margin (mb-6 -> mb-4) */}
      <h3 className="text-[#47010099] font-medium text-sm mb-4">
        Top Providers by volume
      </h3>

      {/* Reduced vertical gap (gap-6 -> gap-4) */}
      <div className="flex flex-col gap-4">
        {providers.map((provider, index) => (
          // Reduced internal gap (gap-4 -> gap-3)
          <div key={index} className="flex items-start gap-3">
            {/* Reduced badge size (w-8 h-8 -> w-6 h-6) */}
            <div className="w-6 h-6 rounded-full bg-[#FFEDED] flex items-center justify-center shrink-0">
              {/* Reduced badge text (text-sm -> text-xs) */}
              <span className="text-[#FE564B] font-bold text-xs">
                {index + 1}
              </span>
            </div>
            {/* Tighter text spacing (gap-1 -> gap-0.5) */}
            <div className="flex flex-col gap-0.5">
              {/* Reduced name size (text-lg -> text-sm) */}
              <p className="text-[#470100] font-bold text-sm leading-tight">
                {provider.name}
              </p>
              {/* Reduced count size (text-base -> text-xs) */}
              <p className="text-[#47010099] font-medium text-xs">
                {provider.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
