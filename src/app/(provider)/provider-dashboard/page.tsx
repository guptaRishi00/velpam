"use client";
import NewOrders from "@/components/provider-components/NewOrders";
import { useState } from "react";

type Props = {};

export default function ProviderDashboard({}: Props) {
  const [activeTab, setActiveTab] = useState<
    "newOrders" | "completed" | "accountBilling"
  >("newOrders");

  return (
    <div className="px-10 space-y-5">
      {/* tabs */}
      <div className="px-10 py-10">
        <div className="w-full bg-[#FEF5EF] rounded-full h-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab("newOrders")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "newOrders"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            New Orders
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "completed"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab("accountBilling")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "accountBilling"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            Account & Billing
          </button>
        </div>
      </div>

      {activeTab === "newOrders" && <NewOrders />}
    </div>
  );
}
