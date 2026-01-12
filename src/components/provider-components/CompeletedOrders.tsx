"use client";

import React, { useState, useMemo } from "react";
import { Calendar } from "lucide-react";

type Props = {
  orders: any[];
};

export default function CompletedOrders({ orders }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const dateOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    } as const;

    return new Intl.DateTimeFormat("en-GB", dateOptions).format(date);
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      if (!order.deliveryDate) return !startDate && !endDate;

      const orderDate = new Date(order.deliveryDate);
      orderDate.setHours(0, 0, 0, 0);

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) return false;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        if (orderDate > end) return false;
      }

      return true;
    });
  }, [orders, startDate, endDate]);

  return (
    <div className="space-y-8 mb-10">
      <h2 className="text-[#47010099] font-medium text-xl">Completed Orders</h2>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-[#470100] font-bold text-lg">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl pl-12 pr-4 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
            />
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47010060]"
              size={20}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-[#470100] font-bold text-lg">End date</label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl pl-12 pr-4 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
            />
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47010060]"
              size={20}
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-8 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="text-left border-b border-[#FE564B20]">
                <th className="pb-6 text-[#470100] font-bold text-lg">
                  Date Delivered
                </th>
                <th className="pb-6 text-[#470100] font-bold text-lg">
                  Recipient Name
                </th>
                <th className="pb-6 text-[#470100] font-bold text-lg">
                  Location
                </th>
                <th className="pb-6 text-[#470100] font-bold text-lg">
                  Delivered By
                </th>
                <th className="pb-6 text-[#470100] font-bold text-lg">
                  Order ID
                </th>
                <th className="pb-6 text-[#470100] font-bold text-lg text-center">
                  Proof
                </th>
              </tr>
            </thead>
            <tbody className="text-[#47010099] font-medium text-base">
              {filteredOrders && filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order.id || order._id || index}
                    className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                  >
                    <td className="py-6 text-[#47010080]">
                      {formatDate(order.deliveryDate)}
                    </td>
                    <td className="py-6 text-[#47010080]">
                      {order.recipientName}
                    </td>
                    <td className="py-6 text-[#47010080]">
                      {order.deliveryLocation}
                    </td>
                    <td className="py-6 text-[#47010080]">
                      {order.deliveredBy || "-"}
                    </td>
                    <td className="py-6 text-[#47010080]">
                      {order.id || order._id}
                    </td>
                    <td className="py-6 text-center">
                      <button className="underline underline-offset-4 decoration-1 text-[#47010099] hover:text-[#FE564B] transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-[#47010080]"
                  >
                    No completed orders found
                    {startDate || endDate ? " for the selected dates" : ""}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
