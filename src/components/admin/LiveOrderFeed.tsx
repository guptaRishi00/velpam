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
    <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm h-full">
      <h3 className="text-[#47010099] font-medium text-lg mb-6">
        Live Order Feed
      </h3>

      <div className="flex flex-col gap-8">
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-3">
                <span className="text-[#470100] font-bold text-lg">
                  {order.id}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-[#47010099] text-sm font-medium">
                {order.date}
              </p>
            </div>
            <p className="text-[#47010099] text-base font-medium">
              {order.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
