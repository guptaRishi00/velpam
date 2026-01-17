"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Ban, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";

// Define Interfaces based on Order API structure
interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  price: number;
  status: string;
  createdAt: string;
}

export default function AdminCustomers() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Fetch all orders to derive customer data
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
      setError("Failed to load customer data. Please try again.");
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

  const customersList = useMemo(() => {
    const customerMap: Record<string, any> = {};

    orders.forEach((order) => {
      const email = order.customerEmail.toLowerCase();
      if (!customerMap[email]) {
        customerMap[email] = {
          name: order.customerName,
          email: email,
          joinDate: new Date(order.createdAt),
          totalOrders: 0,
          totalSpent: 20, // Total spent now starts from 20
        };
      }

      customerMap[email].totalOrders += 1;

      // Adds the order price to the base of 20 if payment is successful
      if (order.status !== "PENDING_PAYMENT") {
        customerMap[email].totalSpent += order.price || 0;
      }

      const orderDate = new Date(order.createdAt);
      if (orderDate < customerMap[email].joinDate) {
        customerMap[email].joinDate = orderDate;
      }
    });

    return Object.values(customerMap);
  }, [orders]);

  const filteredCustomers = customersList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-[#FE564B] font-medium text-lg">
          Customer Management
        </h1>

        {/* --- Search Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#470100] font-bold text-sm">
              Search Customers
            </label>
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="text-[#FE564B]" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search by customer email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl pl-10 pr-3 py-2 text-sm text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-[#FE564B]" size={32} />
              <p className="text-[#47010060] text-sm">Loading customers...</p>
            </div>
          ) : error ? (
            <div className="w-full h-64 flex items-center justify-center text-red-500 text-sm gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="text-left border-b border-[#FE564B20]">
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/5">
                      Customer Name
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center w-1/4">
                      Email
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      First Order
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Total <br /> Orders
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Total <br /> Spent
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#47010099] font-medium text-sm">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                      >
                        <td className="py-2.5 text-[#470100] font-semibold">
                          {customer.name}
                        </td>
                        <td className="py-2.5 text-center text-[#47010080]">
                          {customer.email}
                        </td>
                        <td className="py-2.5 text-center text-[#47010080]">
                          {formatDate(customer.joinDate)}
                        </td>
                        <td className="py-2.5 text-center text-[#47010080]">
                          {customer.totalOrders}
                        </td>
                        <td className="py-2.5 text-center text-[#470100] font-bold">
                          £{customer.totalSpent.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-center flex justify-center items-center">
                          <button
                            className="text-[#FE564B] hover:text-[#d63d33] transition-colors p-1.5 rounded-full hover:bg-[#FE564B10]"
                            title="Block User"
                          >
                            <Ban size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-[#47010060]"
                      >
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
