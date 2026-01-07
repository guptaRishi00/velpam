"use client";

import { X, Upload } from "lucide-react";

type Props = {
  onClose?: () => void;
};

export default function ConfirmDelivery({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-[#470100]">
            Mark as Delivered
          </h2>
          <button
            onClick={onClose}
            className="text-[#470100] hover:text-[#FE564B] transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-[#47010099] font-medium text-lg leading-tight">
          Are you sure you have delivered this Valpem to{" "}
          <span className="font-bold text-[#470100]">Jacob Mark</span>?
        </p>

        <div className="flex flex-col gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[#470100] font-bold text-lg">
              Delivered by(your name)*
            </label>
            <input
              type="text"
              placeholder="e.g., Ray Mathew"
              className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl px-5 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#470100] font-bold text-lg">
              Add a photo of the delivered Valpem:
            </label>
            <label className="w-full h-24 flex flex-col items-center justify-center gap-2 border border-dashed border-[#FE564B40] bg-[#FFF5F5] rounded-xl cursor-pointer hover:bg-[#FE564B10] transition-colors">
              <div className="flex items-center gap-2 text-[#47010060]">
                <Upload size={20} />
                <span className="font-medium text-base">
                  Click to upload image
                </span>
              </div>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[#FE564B] text-[#FE564B] font-bold text-lg hover:bg-[#FE564B0A] transition-all"
          >
            Cancel
          </button>
          <button className="flex-1 py-3.5 rounded-xl bg-[#FE564B] text-white font-bold text-lg shadow-md hover:shadow-lg hover:bg-[#e0453a] transition-all">
            Confirm Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
