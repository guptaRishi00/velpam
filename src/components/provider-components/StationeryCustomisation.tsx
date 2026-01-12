import React from "react";
import { User, Upload, Handshake } from "lucide-react";

type Props = {};

export default function StationeryCustomisation({}: Props) {
  return (
    <div className="w-full bg-white border border-[#FE564B40] rounded-3xl p-6 lg:p-8 shadow-md mb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <User className="text-[#FE564B]" size={24} />
        <h2 className="text-2xl font-bold text-[#470100]">
          Stationery Customisation
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Upload Section */}
        <div className="flex flex-col gap-3">
          <p className="text-[#470100] font-bold text-lg">
            Upload your logo to be watermarked on all valpems:
          </p>
          <label className="w-full cursor-pointer">
            <div className="w-full h-24 border border-dashed border-[#FE564B40] rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FE564B05] transition-colors bg-white">
              <Upload className="text-[#47010099]" size={20} />
              <span className="text-[#47010099] font-medium text-base">
                Click to upload logo
              </span>
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col gap-3">
          <p className="text-[#470100] font-bold text-lg">Logo Preview:</p>
          <div className="w-full h-48 bg-[#FFF5F5] rounded-2xl flex items-center justify-center">
            {/* Using Handshake icon to simulate the logo shown in your image */}
            <Handshake className="text-[#470100]" size={64} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
