"use client";

import React from "react";
import { Eye, ChevronDown } from "lucide-react";

// Mock Data based on the image
const orders = [
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Smith",
    recipient: "Jacob",
    provider: "Room 312",
    status: "New",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "New",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "Delivered",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "Delivered",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "Delivered",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "Delivered",
    total: "£60.00",
    earning: "£12.00",
  },
  {
    id: "VLPM-1003",
    date: "28 Oct 2025",
    customer: "John Stevens",
    recipient: "David Chen",
    provider: "Room 312",
    status: "Delivered",
    total: "£60.00",
    earning: "£12.00",
  },
];

type Props = {};

export default function AdminOrders({}: Props) {
  return (
    <div className="w-full min-h-screen p-6 lg:p-10">
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-[#FE564B] font-medium text-xl">
          All Orders Management
        </h1>

        {/* --- Filters Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Search Input */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <label className="text-[#470100] font-bold text-lg">
                Recipient Name
              </label>
              <input
                type="text"
                placeholder="Order ID, Email, Recipient Name..."
                className="w-full bg-white border border-[#EE5B4A40] rounded-xl px-4 py-3 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
              />
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <label className="text-[#470100] font-bold text-lg">Status</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[#FE564B0A] border border-[#EE5B4A40] rounded-xl px-4 py-3 text-[#470100] focus:outline-none focus:ring-2 focus:ring-[#FE564B] cursor-pointer">
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="delivered">Delivered</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FE564B] pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* Provider Select */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <label className="text-[#470100] font-bold text-lg">
                Provider
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-[#FE564B0A] border border-[#EE5B4A40] rounded-xl px-4 py-3 text-[#470100] focus:outline-none focus:ring-2 focus:ring-[#FE564B] cursor-pointer">
                  <option value="">All Providers</option>
                  <option value="hotel">The Grand Hotel</option>
                  <option value="airline">British Airways</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FE564B] pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="text-left border-b border-[#FE564B20]">
                  <th className="pb-4 text-[#470100] font-bold text-lg">
                    Order ID
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg">
                    Date
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg">
                    Customer
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg">
                    Recipient
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg">
                    Provider
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Status
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-right">
                    Total
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-right">
                    Provider <br /> Earning
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#47010099] font-medium text-base">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                  >
                    <td className="py-5 text-[#47010080]">{order.id}</td>
                    <td className="py-5 text-[#47010080]">{order.date}</td>
                    <td className="py-5 text-[#47010080]">{order.customer}</td>
                    <td className="py-5 text-[#47010080]">{order.recipient}</td>
                    <td className="py-5 text-[#47010080]">{order.provider}</td>
                    <td className="py-5 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                          order.status === "New"
                            ? "bg-[#FFEDED] text-[#FE564B]" // Pinkish Red
                            : "bg-[#D8F2E1] text-[#1E8E3E]" // Light Green
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 text-right text-[#47010080]">
                      {order.total}
                    </td>
                    <td className="py-5 text-right text-[#47010080]">
                      {order.earning}
                    </td>
                    <td className="py-5 text-center flex justify-center items-center">
                      {order.status === "New" ? (
                        <button className="text-[#47010060] hover:text-[#FE564B] transition-colors">
                          <Eye size={22} />
                        </button>
                      ) : (
                        <button className="text-[#47010080] underline underline-offset-4 hover:text-[#FE564B] transition-colors font-semibold">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
