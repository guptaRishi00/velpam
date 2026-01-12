import React from "react";
import { CircleDollarSign } from "lucide-react";

export default function MyEarnings() {
  // Data for the statement history to make the list dynamic
  const statements = [
    { id: 1, label: "October 2025" },
    { id: 2, label: "September 2025" },
  ];

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6 bg-white font-sans border border-[#FE564B40] rounded-3xl shadow-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <CircleDollarSign className="w-6 h-6 text-[#FE564B]" />
          <h1 className="text-2xl font-bold text-[#470100]">My earnings</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-8 mb-8">
          {/* Row 1 */}
          <div className="flex flex-col">
            <span className="text-[#47010099] text-sm mb-1 font-medium">
              Total Earned (All Time)
            </span>
            <span className="text-xl font-medium text-[#470100]">£270.00</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#47010099] text-sm mb-1 font-medium">
              Total Orders Completed
            </span>
            <span className="text-xl font-medium text-[#470100]">45</span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col">
            <span className="text-[#47010099] text-sm mb-1 font-medium">
              Commission Rate
            </span>
            <span className="text-xl font-medium text-[#470100]">30%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#47010099] text-sm mb-1 font-medium">
              Next Payout On
            </span>
            <span className="text-xl font-medium text-[#470100]">
              1 December 2025
            </span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-8">
          <span className="text-[#47010099] text-sm mb-1 font-medium block">
            Payment Status
          </span>
          <span className="text-base font-bold text-[#470100]">
            Active - Automatic monthly payouts enabled
          </span>
        </div>

        {/* Divider */}
        <hr className="border-[#FE564B20] mb-8" />

        {/* Statement History */}
        <div>
          <h2 className="text-xl font-bold text-[#470100] mb-4">
            Statement History
          </h2>
          <div className="space-y-3">
            {statements.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#FE564B0A] px-6 py-4 rounded-xl border border-[#FE564B10]"
              >
                <span className="text-[#470100] font-medium text-base">
                  {item.label}
                </span>
                <button className="bg-[#FE564B] hover:bg-[#e0453a] text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors shadow-sm">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
