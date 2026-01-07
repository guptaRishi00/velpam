"use client";

import React from "react";
import { Search, Ban } from "lucide-react";

// Mock Data based on the image
const customers = [
  {
    name: "John Smith",
    email: "john@smith.com",
    joinDate: "15 Oct 2025",
    totalOrders: "3",
    totalSpent: "£120.00",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@johnson.com",
    joinDate: "22 Oct 2025",
    totalOrders: "2",
    totalSpent: "£12.00",
  },
  {
    name: "Michael Brown",
    email: "michael@brown.com",
    joinDate: "30 Sept 2025",
    totalOrders: "5",
    totalSpent: "£60.00",
  },
];

type Props = {};

export default function AdminCustomers({}: Props) {
  return (
    <div className="w-full min-h-screen p-6 lg:p-10">
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-[#FE564B] font-medium text-xl">
          Customer Management
        </h1>

        {/* --- Search Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col gap-4 w-full">
            <label className="text-[#470100] font-bold text-lg">
              Search Customers
            </label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="text-[#FE564B]" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by customer email or name..."
                className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl pl-12 pr-4 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left border-b border-[#FE564B20]">
                  <th className="pb-4 text-[#470100] font-bold text-lg w-1/5">
                    Customer Name
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center w-1/4">
                    Email
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Join Date
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Total <br /> Orders
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Total <br /> Spent
                  </th>
                  <th className="pb-4 text-[#470100] font-bold text-lg text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#47010099] font-medium text-base">
                {customers.map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                  >
                    <td className="py-6 text-[#47010080] font-medium">
                      {customer.name}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {customer.email}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {customer.joinDate}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {customer.totalOrders}
                    </td>
                    <td className="py-6 text-center text-[#47010080]">
                      {customer.totalSpent}
                    </td>
                    <td className="py-6 text-center flex justify-center items-center">
                      <button
                        className="text-[#FE564B] hover:text-[#d63d33] transition-colors p-2 rounded-full hover:bg-[#FE564B10]"
                        title="Block User"
                      >
                        <Ban size={22} />
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
