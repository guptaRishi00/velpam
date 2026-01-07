"use client";

import React from "react";
import { Eye, Plus } from "lucide-react";

// Mock Data based on the image
const providers = [
  {
    name: "The Grand Hotel London",
    type: "Hotel",
    onboardingDate: "15 Sept 2025",
    totalOrders: "45",
    totalEarned: "£120.00",
    status: "Active",
  },
  {
    name: "Le Bernardin",
    type: "Restaurant",
    onboardingDate: "28 Oct 2025",
    totalOrders: "24",
    totalEarned: "£12.00",
    status: "Active",
  },
  {
    name: "British Airways First Class",
    type: "Airline",
    onboardingDate: "01 Oct 2025",
    totalOrders: "12",
    totalEarned: "£60.00",
    status: "Active",
  },
];

type Props = {};

export default function AdminProviders({}: Props) {
  return (
    <div className="w-full min-h-screen p-6 lg:p-10">
      <div className="flex flex-col gap-8 w-full">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          <h1 className="text-[#FE564B] font-medium text-xl">
            Service Provider Management
          </h1>

          <button className="flex items-center gap-2 bg-[#FE564B] hover:bg-[#e0453a] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md">
            <Plus size={20} />
            Add New Provider
          </button>
        </div>

        {/* --- Table Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="text-left border-b border-[#FE564B20]">
                  <th className="pb-4 text-[#470100] font-bold text-lg w-1/4">
                    Provider Name
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Type
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Onboarding <br /> Date
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Total <br /> Orders
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-right">
                    Total <br /> Earned
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Status
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#47010099] font-medium text-base">
                {providers.map((provider, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                  >
                    <td className="py-6 text-[#470100] font-medium">
                      {provider.name}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {provider.type}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {provider.onboardingDate}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {provider.totalOrders}
                    </td>
                    <td className="py-6 text-right text-[#47010080]">
                      {provider.totalEarned}
                    </td>
                    <td className="py-6 text-center">
                      <span className="bg-[#0E542B40] text-[#0E542BBF] px-6 py-1.5 rounded-lg text-sm font-bold">
                        {provider.status}
                      </span>
                    </td>
                    <td className="py-6 text-center flex justify-center items-center">
                      <button className="text-[#47010099] hover:opacity-70 transition-opacity">
                        <Eye size={22} />
                      </button>
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
