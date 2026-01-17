"use client";

import React, { useState, useEffect } from "react";
import { Eye, Plus, Loader2, AlertCircle } from "lucide-react";
import AddProviderModal from "@/components/admin/AddProviderModal";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/store/features/auth/authSlice";

interface ProviderData {
  _id: string;
  name: string;
  type: string;
  address: string;
  contactEmail: string;
  logoUrl: string;
  commissionRate: number;
  status: string;
  createdAt: string;
  __v: number;
}

export default function AdminProviders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  const fetchProviders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/providers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.ok) {
        setProviders(response.data.providers);
      }
    } catch (err: any) {
      console.error("Error fetching providers:", err);
      if (err.response && err.response.status === 401) {
        dispatch(logout());
        router.push("/login");
      } else {
        setError("Failed to fetch providers. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [token]);

  const handleRefresh = () => {
    fetchProviders();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          <h1 className="text-[#FE564B] font-medium text-lg">
            Service Provider Management
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#FE564B] hover:bg-[#e0453a] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md"
          >
            <Plus size={18} />
            Add New Provider
          </button>

          <AddProviderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleRefresh}
          />
        </div>

        <div className="w-full bg-white border border-[#FE564B40] rounded-2xl p-4 shadow-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="animate-spin text-[#FE564B]" size={32} />
              <p className="text-[#47010060] font-medium text-sm">
                Loading providers...
              </p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center py-10 text-red-500 font-medium text-sm gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          ) : providers.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center py-20 text-[#47010060] font-medium">
              No service providers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="text-left border-b border-[#FE564B20]">
                    <th className="pb-2 text-[#470100] font-bold text-sm w-1/4">
                      Provider Name
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Type
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Onboarding <br /> Date
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Total <br /> Orders
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-right">
                      Total <br /> Earned
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Status
                    </th>
                    <th className="pb-2 text-[#470100] font-bold text-sm text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#47010099] font-medium text-sm">
                  {providers.map((provider) => (
                    <tr
                      key={provider._id}
                      className="border-b border-[#FE564B10] last:border-none hover:bg-[#FE564B05] transition-colors"
                    >
                      <td className="py-2.5 text-[#470100] font-medium">
                        {provider.name}
                      </td>
                      <td className="py-2.5 text-center text-[#47010080] capitalize">
                        {provider.type}
                      </td>
                      <td className="py-2.5 text-center text-[#47010080]">
                        {formatDate(provider.createdAt)}
                      </td>
                      <td className="py-2.5 text-center text-[#47010080]">0</td>
                      <td className="py-2.5 text-right text-[#47010080]">
                        £0.00
                      </td>
                      <td className="py-2.5 text-center">
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-bold capitalize ${
                            provider.status === "active"
                              ? "bg-[#0E542B40] text-[#0E542BBF]"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {provider.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-center flex justify-center items-center">
                        <button className="text-[#47010099] hover:opacity-70 transition-opacity">
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
