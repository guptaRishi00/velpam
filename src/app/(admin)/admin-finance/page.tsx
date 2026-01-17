"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";

interface Provider {
  _id: string;
  name: string;
  type: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerEmail: string;
  status: string;
  price: number;
  providerEarning: number;
  createdAt: string;
  provider: Provider;
}

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState<"transactions" | "payouts">(
    "transactions"
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.ok) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        dispatch(logout());
        router.push("/login");
        return;
      }
      setError("Failed to load financial data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Filter orders to only show DELIVERED ones
  const deliveredOrders = useMemo(() => {
    return orders.filter((order) => order.status === "DELIVERED");
  }, [orders]);

  // Dynamic Metrics Calculation
  const metrics = useMemo(() => {
    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + (order.price || 0),
      0
    );
    const totalPayouts = deliveredOrders.reduce(
      (sum, order) => sum + (order.providerEarning || 0),
      0
    );
    const netRevenue = totalRevenue - totalPayouts;

    return {
      totalRevenue,
      totalPayouts,
      netRevenue,
      orderCount: deliveredOrders.length,
    };
  }, [deliveredOrders]);

  // Aggregate payouts by provider
  const providerPayouts = useMemo(() => {
    const payoutMap: Record<
      string,
      { name: string; count: number; total: number }
    > = {};

    deliveredOrders.forEach((order) => {
      const providerId = order.provider?._id;
      if (!providerId) return;

      if (!payoutMap[providerId]) {
        payoutMap[providerId] = {
          name: order.provider.name,
          count: 0,
          total: 0,
        };
      }
      payoutMap[providerId].count += 1;
      payoutMap[providerId].total += order.providerEarning || 0;
    });

    return Object.values(payoutMap);
  }, [deliveredOrders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-[#FE564B] font-medium text-lg">
          Finance & Payments
        </h1>

        {/* --- Metrics Section --- */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[#47010099] font-medium text-sm">
              Total Revenue (All Time)
            </p>
            <p className="text-[#470100] font-bold text-2xl">
              £{metrics.totalRevenue.toFixed(2)}
            </p>
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              {metrics.orderCount} Delivered Orders
            </p>
          </div>

          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[#47010099] font-medium text-sm">
              Total Payouts
            </p>
            <p className="text-[#470100] font-bold text-2xl">
              £{metrics.totalPayouts.toFixed(2)}
            </p>
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              To Providers
            </p>
          </div>

          <div className="w-full lg:w-1/3 bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm flex flex-col gap-1">
            <p className="text-[#47010099] font-medium text-sm">Net Revenue</p>
            <p className="text-[#470100] font-bold text-2xl">
              £{metrics.netRevenue.toFixed(2)}
            </p>
            <p className="text-[#47010080] text-xs font-medium mt-0.5">
              After Commission
            </p>
          </div>
        </div>

        {/* --- Tabs Section --- */}
        <div className="flex items-center gap-0 w-fit bg-[#FE564B10] rounded-full p-1">
          <button
            onClick={() => setActiveTab("transactions")}
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
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm overflow-hidden min-h-100">
          {loading ? (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-[#FE564B]" size={32} />
              <p className="text-[#47010060] text-sm">
                Loading financial data...
              </p>
            </div>
          ) : error ? (
            <div className="w-full h-64 flex items-center justify-center text-red-500 text-sm gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          ) : (
            <>
              {activeTab === "transactions" && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-200">
                    <thead>
                      <tr className="text-left border-b border-[#FE564B20]">
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
                    <tbody className="text-[#47010099] font-medium text-sm">
                      {deliveredOrders.length > 0 ? (
                        deliveredOrders.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                          >
                            <td className="py-2.5 pl-2 text-[#47010080]">
                              {formatDate(item.createdAt)}
                            </td>
                            <td className="py-2.5 text-[#47010080]">
                              {item.orderId}
                            </td>
                            <td className="py-2.5 text-center text-[#47010080]">
                              {item.customerEmail}
                            </td>
                            <td className="py-2.5 text-center text-[#47010080]">
                              £{item.price.toFixed(2)}
                            </td>
                            <td className="py-2.5 text-right pr-2">
                              <span className="bg-[#9ABF80] bg-opacity-50 text-[#3A6B38] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-10 text-center text-[#47010080]"
                          >
                            No delivered orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "payouts" && (
                <div className="flex flex-col h-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <h2 className="text-[#470100] font-bold text-lg">
                      Provider Payouts - Current Summary
                    </h2>
                    <button className="bg-[#FE564B] hover:bg-[#e0453a] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md">
                      Run Payout
                    </button>
                  </div>
                  <div className="h-px w-full bg-[#FE564B20] mb-4"></div>
                  <div className="grid grid-cols-3 w-full px-2 mb-2">
                    <p className="text-[#470100] font-bold text-sm text-left">
                      Provider Name
                    </p>
                    <p className="text-[#470100] font-bold text-sm text-center">
                      Orders Delivered
                    </p>
                    <p className="text-[#470100] font-bold text-sm text-right">
                      Payout Amount
                    </p>
                  </div>
                  <div className="h-px w-full bg-[#FE564B20]"></div>
                  <div className="flex-1">
                    {providerPayouts.length > 0 ? (
                      providerPayouts.map((payout, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 w-full px-2 py-3 border-b border-[#FE564B10]"
                        >
                          <p className="text-[#47010080] text-sm text-left font-medium">
                            {payout.name}
                          </p>
                          <p className="text-[#47010080] text-sm text-center font-medium">
                            {payout.count}
                          </p>
                          <p className="text-[#470100] text-sm text-right font-bold">
                            £{payout.total.toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center min-h-32">
                        <p className="text-[#47010080] font-medium text-sm">
                          No pending payouts found.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="h-px w-full bg-[#FE564B20] my-4"></div>
                  <div className="flex items-center justify-between px-2">
                    <p className="text-[#470100] font-bold text-lg">
                      Total Payout Amount
                    </p>
                    <p className="text-[#470100] font-bold text-lg">
                      £{metrics.totalPayouts.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
