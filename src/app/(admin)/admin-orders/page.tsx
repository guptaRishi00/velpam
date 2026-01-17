"use client";

import React, { useEffect, useState } from "react";
import { Eye, ChevronDown, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";

interface Provider {
  _id: string;
  name: string;
  type: string;
  address: string;
  contactEmail: string;
  commissionRate: number;
  status: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  occasion: string;
  recipientName: string;
  message: string;
  deliveryLocation: string;
  deliveryDate: string;
  status: string;
  price: number;
  providerEarning: number;
  createdAt: string;
  provider: Provider;
  deliveredBy?: string;
  deliveryConfirmedAt?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterProvider, setFilterProvider] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
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
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus === "PENDING_PAYMENT" || normalizedStatus === "NEW") {
      return "bg-[#FFF0F0] text-[#FE564B] border border-[#FE564B20]";
    } else if (normalizedStatus === "DELIVERED") {
      return "bg-[#E6F8EB] text-[#1E8E3E] border border-[#1E8E3E20]";
    }
    return "bg-gray-50 text-gray-600 border border-gray-200";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    const matchesProvider = filterProvider
      ? order.provider.type === filterProvider
      : true;

    return matchesSearch && matchesStatus && matchesProvider;
  });

  return (
    // Reduced outer padding: p-6 lg:p-10 -> p-4
    <div className="w-full min-h-screen p-4">
      {/* Reduced gap: gap-6 -> gap-4 */}
      <div className="flex flex-col gap-4 w-full max-w-[1600px] mx-auto">
        {/* Smaller header text: text-xl -> text-lg */}
        <h1 className="text-[#FE564B] font-medium text-lg">
          All Orders Management
        </h1>

        {/* Filter Section: Reduced padding, rounded corners, and spacing */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-1.5 w-full md:w-1/3">
              {/* Smaller labels: text-lg -> text-sm */}
              <label className="text-[#470100] font-semibold text-sm">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Order ID, Email, Recipient Name..."
                // Compact input: px-4 py-3 -> px-3 py-2
                className="w-full bg-white border border-[#EE5B4A40] rounded-lg px-3 py-2 text-sm text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-1/3">
              <label className="text-[#470100] font-semibold text-sm">
                Status
              </label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  // Compact select
                  className="w-full appearance-none bg-[#FE564B0A] border border-[#EE5B4A40] rounded-lg px-3 py-2 text-sm text-[#470100] focus:outline-none focus:ring-2 focus:ring-[#FE564B] cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING_PAYMENT">Pending Payment</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FE564B] pointer-events-none w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full md:w-1/3">
              <label className="text-[#470100] font-semibold text-sm">
                Provider Type
              </label>
              <div className="relative">
                <select
                  value={filterProvider}
                  onChange={(e) => setFilterProvider(e.target.value)}
                  // Compact select
                  className="w-full appearance-none bg-[#FE564B0A] border border-[#EE5B4A40] rounded-lg px-3 py-2 text-sm text-[#470100] focus:outline-none focus:ring-2 focus:ring-[#FE564B] cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="hotel">Hotel</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="airline">Airline</option>
                  <option value="cruise">Cruise</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FE564B] pointer-events-none w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section: Compact view */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#FE564B]" size={32} />
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center py-10 text-red-500 font-medium text-sm">
              {error}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center py-10 text-[#47010080] font-medium text-sm">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] table-fixed">
                <thead>
                  <tr className="text-left border-b border-[#FE564B20]">
                    {/* Headers: Reduced font size and padding (pb-4 -> pb-2) */}
                    <th className="pb-2 pl-2 text-[#470100] font-bold text-sm w-[12%]">
                      Order ID
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-[10%]">
                      Date
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-[20%]">
                      Customer
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-[12%]">
                      Recipient
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm w-[20%]">
                      Provider
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center w-[12%]">
                      Status
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-right w-[6%]">
                      Total
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-right w-[6%]">
                      Earning
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center w-[5%] pr-2">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#47010099] font-medium text-sm">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      // Rows: Reduced vertical padding (py-4 -> py-2.5)
                      className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors group"
                    >
                      <td className="py-2.5 pl-2 text-[#470100] font-semibold align-middle break-words">
                        {order.orderId}
                      </td>
                      <td className="py-2.5 text-[#47010080] align-middle">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-2.5 align-middle pr-4">
                        <div className="flex flex-col max-w-full">
                          <span
                            className="text-[#470100] font-medium truncate"
                            title={order.customerName}
                          >
                            {order.customerName}
                          </span>
                          <span
                            className="text-xs text-[#47010060] truncate"
                            title={order.customerEmail}
                          >
                            {order.customerEmail}
                          </span>
                        </div>
                      </td>
                      <td
                        className="py-2.5 text-[#47010080] align-middle truncate"
                        title={order.recipientName}
                      >
                        {order.recipientName}
                      </td>
                      <td className="py-2.5 align-middle pr-4">
                        <div className="flex flex-col max-w-full">
                          <span
                            className="text-[#470100] font-medium truncate"
                            title={order.provider?.name}
                          >
                            {order.provider?.name || "Unknown"}
                          </span>
                          {order.provider?.type && (
                            <span className="text-xs text-[#47010060] capitalize">
                              {order.provider.type}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 text-center align-middle">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status === "PENDING_PAYMENT"
                            ? "Pending"
                            : order.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-[#470100] font-medium align-middle">
                        £{order.price?.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-right text-[#47010080] align-middle">
                        £{order.providerEarning?.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-center align-middle pr-2">
                        <button className="text-[#47010040] hover:text-[#FE564B] transition-colors p-1.5 rounded-full hover:bg-[#FE564B10]">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
