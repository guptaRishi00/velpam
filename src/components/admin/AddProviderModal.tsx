"use client";

import React, { useState } from "react";
import axios from "axios";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddProviderModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "hotel",
    address: "",
    contactEmail: "",
    logoUrl: "",
    commissionRate: 0.3,
    adminPassword: "", // Added password field for the User account
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/providers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.ok) {
        setIsSuccess(true);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create provider");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalClose = () => {
    setIsSuccess(false);
    setFormData({
      name: "",
      type: "hotel",
      address: "",
      contactEmail: "",
      logoUrl: "",
      commissionRate: 0.3,
      adminPassword: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-[#FE564B40] relative">
        <button
          onClick={handleFinalClose}
          className="absolute right-4 top-4 text-[#47010060] hover:text-[#FE564B] transition-colors z-10"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="p-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#470100] mb-2">
              Provider Created!
            </h2>
            <p className="text-[#47010080] mb-8">
              {formData.name} and its Admin account have been successfully
              added.
            </p>
            <button
              onClick={handleFinalClose}
              className="w-full bg-[#FE564B] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Close Message
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-[#FE564B20]">
              <h2 className="text-xl font-bold text-[#470100]">
                Add New Provider
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-[#470100] ml-1">
                    Business Name
                  </label>
                  <input
                    required
                    className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2.5 mt-1 text-sm focus:ring-2 focus:ring-[#FE564B] outline-none"
                    placeholder="e.g. Grand Valpem Hotel"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#470100] ml-1">
                    Type
                  </label>
                  <select
                    className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="hotel">Hotel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="airline">Airline</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#470100] ml-1">
                    Commission (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    value={formData.commissionRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commissionRate: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#470100] ml-1">
                  Contact Email (Login Username)
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                  placeholder="manager@hotel.com"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                />
              </div>

              {/* Password Field for User Creation */}
              <div>
                <label className="text-sm font-semibold text-[#470100] ml-1">
                  Admin Login Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                  placeholder="Set initial password"
                  value={formData.adminPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, adminPassword: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#470100] ml-1">
                  Physical Address
                </label>
                <textarea
                  className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-2 mt-1 text-sm focus:outline-none h-20 resize-none"
                  placeholder="Full street address..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FE564B] text-white font-semibold py-3 mt-4 rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                  </>
                ) : (
                  "Create Provider & Admin"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
