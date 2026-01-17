"use client";

import React from "react";

const orders = [
  {
    id: "VLPM-1003",
    status: "New",
    date: "2 Nov, 16:45",
    description: "James Wilson at Le Bernardin",
    statusColor: "bg-[#FFEDED] text-[#FE564B]", // Pinkish badge
  },
  {
    id: "VLPM-1002",
    status: "New",
    date: "2 Nov, 12:25",
    description: "Sarah Johnson at Le Bernardin",
    statusColor: "bg-[#FFEDED] text-[#FE564B]",
  },
  {
    id: "VLPM-1001",
    status: "Delivered",
    date: "30 Oct, 19:30",
    description: "David Chen at The Grand Hotel London",
    statusColor: "bg-[#E6F4EA] text-[#1E8E3E]", // Green badge
  },
];

export default function LiveOrderFeed() {
  return (
    // Reduced padding (p-8 -> p-4) and rounded corners (rounded-3xl -> rounded-2xl)
    <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm h-full">
      {/* Reduced header size (text-lg -> text-sm) and margin (mb-6 -> mb-4) */}
      <h3 className="text-[#47010099] font-medium text-sm mb-4">
        Live Order Feed
      </h3>

      {/* Reduced gap between items (gap-8 -> gap-4) */}
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-start w-full">
              {/* Reduced gap (gap-3 -> gap-2) */}
              <div className="flex items-center gap-2">
                {/* Reduced ID text size (text-lg -> text-sm) */}
                <span className="text-[#470100] font-bold text-sm">
                  {order.id}
                </span>
                {/* Compact badge: smaller padding and text */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>
              {/* Reduced date text size (text-sm -> text-xs) */}
              <p className="text-[#47010099] text-xs font-medium">
                {order.date}
              </p>
            </div>
            {/* Reduced description text size (text-base -> text-sm) */}
            <p className="text-[#47010099] text-sm font-medium">
              {order.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
