import React from "react";
import { User } from "lucide-react";

type Props = {};

export default function AccountDetails({}: Props) {
  return (
    <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <User className="text-[#FE564B]" size={24} />
        <h2 className="text-2xl font-bold text-[#470100]">Account Details</h2>
      </div>

      {/* Fields Container */}
      <div className="flex flex-col gap-6">
        {/* Provider Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#470100] font-bold text-lg">
            Provider Name
          </label>
          <div className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl px-6 py-4 text-[#47010099] font-medium transition-all hover:border-[#FE564B40]">
            The Grand Hotel, London
          </div>
        </div>

        {/* Provider Type */}
        <div className="flex flex-col gap-2">
          <label className="text-[#470100] font-bold text-lg">
            Provider Type
          </label>
          <div className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl px-6 py-4 text-[#47010099] font-medium transition-all hover:border-[#FE564B40]">
            Hotel
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-[#470100] font-bold text-lg">Address</label>
          <div className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl px-6 py-4 text-[#47010099] font-medium transition-all hover:border-[#FE564B40]">
            1 Aldwych, London WC2B 4BZ
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[#470100] font-bold text-lg">Email</label>
          <div className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-2xl px-6 py-4 text-[#47010099] font-medium transition-all hover:border-[#FE564B40]">
            concierge@grandhotel.com
          </div>
        </div>
      </div>
    </div>
  );
}
