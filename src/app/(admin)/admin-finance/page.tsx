"use client";

import React, { useState } from "react";

// Mock Data for Transactions
const transactions = [
  {
    date: "28 OCT 2025",
    orderId: "VLPM-1003",
    customer: "john@smith.com",
    amount: "£20.00",
    status: "Paid",
  },
  {
    date: "28 OCT 2025",
    orderId: "VLPM-1003",
    customer: "sarah@johnson.com",
    amount: "£20.00",
    status: "Paid",
  },
  {
    date: "28 OCT 2025",
    orderId: "VLPM-1003",
    customer: "michael@brown.com",
    amount: "£20.00",
    status: "Paid",
  },
];

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState<"transactions" | "payouts">(
    "transactions"
  );

  return (
    // Reduced outer padding (p-6 lg:p-10 -> p-4)
    <div className="w-full min-h-screen p-4">
      {/* Reduced gap (gap-8 -> gap-4) */}
      <div className="flex flex-col gap-4 w-full">
        {/* Reduced header size (text-xl -> text-lg) */}
        <h1 className="text-[#FE564B] font-medium text-lg">
          Finance & Payments
        </h1>

        {/* --- Metrics Section --- */}
        {/* Reduced gap (gap-6 -> gap-4) */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Card 1 */}
          {/* Reduced padding (p-8 -> p-4) and rounded corners (rounded-3xl -> rounded-2xl) */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            {/* Reduced label size (text-lg -> text-sm) */}
            <p className="text-[#47010099] font-medium text-sm">
              Total Revenue (30d)
            </p>
            {/* Reduced value size (text-3xl -> text-2xl) */}
            <p className="text-[#470100] font-bold text-2xl">£60.00</p>
            {/* Reduced subtext size (text-sm -> text-xs) */}
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              3 Orders
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[#47010099] font-medium text-sm">
              Total Payouts (30%)
            </p>
            <p className="text-[#470100] font-bold text-2xl">£480.00</p>
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              To Providers
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[#47010099] font-medium text-sm">Net Revenue</p>
            <p className="text-[#470100] font-bold text-2xl">£420.00</p>
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              After Commission
            </p>
          </div>
        </div>

        {/* --- Tabs Section --- */}
        <div className="flex items-center gap-0 w-fit bg-[#FE564B10] rounded-full p-1">
          <button
            onClick={() => setActiveTab("transactions")}
            // Reduced padding (px-8 py-3 -> px-4 py-2) and text size (text-lg -> text-sm)
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === "transactions"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:opacity-80"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === "payouts"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:opacity-80"
            }`}
          >
            Provider Payouts
          </button>
        </div>

        {/* --- Dynamic Content Section --- */}
        {/* Reduced padding (p-6 lg:p-8 -> p-4) and rounded corners (rounded-3xl -> rounded-2xl) */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm overflow-hidden min-h-100">
          {/* CASE 1: Transactions Table */}
          {activeTab === "transactions" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="text-left border-b border-[#FE564B20]">
                    {/* Headers: Reduced font size (text-lg -> text-sm) and padding (pb-6 -> pb-2) */}
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/5 pl-2">
                      Date
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/5">
                      Order ID
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/4 text-center">
                      Customer
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/5 text-center">
                      Amount
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-right pr-2">
                      Status
                    </th>
                  </tr>
                </thead>
                {/* Body: Reduced font size (text-base -> text-sm) */}
                <tbody className="text-[#47010099] font-medium text-sm">
                  {transactions.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                    >
                      {/* Rows: Reduced vertical padding (py-6 -> py-2.5) */}
                      <td className="py-2.5 pl-2 text-[#47010080]">
                        {item.date}
                      </td>
                      <td className="py-2.5 text-[#47010080]">
                        {item.orderId}
                      </td>
                      <td className="py-2.5 text-center text-[#47010080]">
                        {item.customer}
                      </td>
                      <td className="py-2.5 text-center text-[#47010080]">
                        {item.amount}
                      </td>
                      <td className="py-2.5 text-right pr-2">
                        {/* Compact Badge */}
                        <span className="bg-[#9ABF80] bg-opacity-50 text-[#3A6B38] px-3 py-1 rounded-full text-xs font-bold">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CASE 2: Provider Payouts View */}
          {activeTab === "payouts" && (
            <div className="flex flex-col h-full">
              {/* Header Row */}
              {/* Reduced margin (mb-6 -> mb-4) */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  {/* Reduced header size (text-xl -> text-lg) */}
                  <h2 className="text-[#470100] font-bold text-lg">
                    Provider Payouts - Current Month
                  </h2>
                  {/* Reduced subtext size (text-sm -> text-xs) */}
                  <p className="text-[#47010080] font-medium text-xs mt-0.5">
                    November 2025
                  </p>
                </div>
                <button className="bg-[#FE564B] hover:bg-[#e0453a] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md">
                  Run Payout
                </button>
              </div>

              <div className="h-px w-full bg-[#FE564B20] mb-4"></div>

              {/* Table Headers */}
              <div className="grid grid-cols-3 w-full px-2 mb-2">
                <p className="text-[#470100] font-bold text-sm text-left">
                  Provider Name
                </p>
                <p className="text-[#470100] font-bold text-sm text-center">
                  Orders This Month
                </p>
                <p className="text-[#470100] font-bold text-sm text-right">
                  Payout Amount (30%)
                </p>
              </div>

              <div className="h-px w-full bg-[#FE564B20]"></div>

              {/* Content / Empty State */}
              <div className="flex-1 flex items-center justify-center min-h-32">
                <p className="text-[#47010080] font-medium text-sm">
                  No pending payouts for this month
                </p>
              </div>

              <div className="h-px w-full bg-[#FE564B20] my-4"></div>

              {/* Footer */}
              <div className="flex items-center justify-between px-2">
                <p className="text-[#470100] font-bold text-lg">
                  Total Payout Amount
                </p>
                <p className="text-[#470100] font-bold text-lg">£0.00</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
