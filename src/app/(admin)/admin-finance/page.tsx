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
    <div className="w-full min-h-screen p-6 lg:p-10">
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-[#FE564B] font-medium text-xl">
          Finance & Payments
        </h1>

        {/* --- Metrics Section --- */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Card 1 */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm flex flex-col gap-2">
            <p className="text-[#47010099] font-medium text-lg">
              Total Revenue (30d)
            </p>
            <p className="text-[#470100] font-bold text-3xl">£60.00</p>
            <p className="text-[#47010080] text-sm font-medium mt-1">
              3 Orders
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm flex flex-col gap-2">
            <p className="text-[#47010099] font-medium text-lg">
              Total Payouts (30%)
            </p>
            <p className="text-[#470100] font-bold text-3xl">£480.00</p>
            <p className="text-[#47010080] text-sm font-medium mt-1">
              To Providers
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm flex flex-col gap-2">
            <p className="text-[#47010099] font-medium text-lg">Net Revenue</p>
            <p className="text-[#470100] font-bold text-3xl">£420.00</p>
            <p className="text-[#47010080] text-sm font-medium mt-1">
              After Commission
            </p>
          </div>
        </div>

        {/* --- Tabs Section --- */}
        <div className="flex items-center gap-0 w-fit bg-[#FE564B10] rounded-full p-1">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-8 py-3 rounded-full font-medium text-lg transition-all ${
              activeTab === "transactions"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:opacity-80"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`px-8 py-3 rounded-full font-medium text-lg transition-all ${
              activeTab === "payouts"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:opacity-80"
            }`}
          >
            Provider Payouts
          </button>
        </div>

        {/* --- Dynamic Content Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-sm overflow-hidden min-h-100">
          {/* CASE 1: Transactions Table */}
          {activeTab === "transactions" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="text-left border-b border-[#FE564B20]">
                    <th className="pb-6 text-[#470100] font-bold text-lg w-1/5 pl-4">
                      Date
                    </th>
                    <th className="pb-6 text-[#470100] font-bold text-lg w-1/5">
                      Order ID
                    </th>
                    <th className="pb-6 text-[#470100] font-bold text-lg w-1/4 text-center">
                      Customer
                    </th>
                    <th className="pb-6 text-[#470100] font-bold text-lg w-1/5 text-center">
                      Amount
                    </th>
                    <th className="pb-6 text-[#470100] font-bold text-lg text-right pr-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#47010099] font-medium text-base">
                  {transactions.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                    >
                      <td className="py-6 pl-4 text-[#47010080]">
                        {item.date}
                      </td>
                      <td className="py-6 text-[#47010080]">{item.orderId}</td>
                      <td className="py-6 text-center text-[#47010080]">
                        {item.customer}
                      </td>
                      <td className="py-6 text-center text-[#47010080]">
                        {item.amount}
                      </td>
                      <td className="py-6 text-right pr-4">
                        <span className="bg-[#9ABF80] bg-opacity-50 text-[#3A6B38] px-6 py-1.5 rounded-full text-sm font-bold">
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-[#470100] font-bold text-xl">
                    Provider Payouts - Current Month
                  </h2>
                  <p className="text-[#47010080] font-medium text-sm mt-1">
                    November 2025
                  </p>
                </div>
                <button className="bg-[#FE564B] hover:bg-[#e0453a] text-white px-8 py-2.5 rounded-xl font-medium transition-all shadow-md">
                  Run Payout
                </button>
              </div>

              <div className="h-px w-full bg-[#FE564B20] mb-6"></div>

              {/* Table Headers */}
              <div className="grid grid-cols-3 w-full px-4 mb-4">
                <p className="text-[#470100] font-bold text-lg text-left">
                  Provider Name
                </p>
                <p className="text-[#470100] font-bold text-lg text-center">
                  Orders This Month
                </p>
                <p className="text-[#470100] font-bold text-lg text-right">
                  Payout Amount (30%)
                </p>
              </div>

              <div className="h-px w-full bg-[#FE564B20]"></div>

              {/* Content / Empty State */}
              <div className="flex-1 flex items-center justify-center min-h-50">
                <p className="text-[#47010080] font-medium text-lg">
                  No pending payouts for this month
                </p>
              </div>

              <div className="h-px w-full bg-[#FE564B20] my-6"></div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4">
                <p className="text-[#470100] font-bold text-xl">
                  Total Payout Amount
                </p>
                <p className="text-[#470100] font-bold text-xl">£0.00</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
