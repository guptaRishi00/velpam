"use client";

import { useAppSelector } from "@/lib/store/hooks/hooks";

type Props = {};

export default function OrderSummary({}: Props) {
  const { order } = useAppSelector((state) => state.order);

  return (
    <div className="px-10 mt-10">
      <div className="w-full h-auto border border-[#FE564B] rounded-3xl px-14 space-y-5 py-8 shadow-md">
        <p className="font-bold text-2xl text-[#470100]">Order Summary</p>

        <div className="w-full flex items-center justify-between mt-10">
          <p className="text-[#47010099] font-medium text-2xl">Item</p>
          <p className="text-[#470100] font-semibold text-2xl">
            Personalised Valpem
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-[#47010099] font-medium text-2xl">Recipient</p>
          <p className="text-[#470100] font-semibold text-2xl">
            {order?.recipientName}
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-[#47010099] font-medium text-2xl">Occassion</p>
          <p className="text-[#470100] font-semibold text-2xl">
            {order?.ocassion}
          </p>
        </div>

        <div className="bg-[#47010040] h-px mt-10"></div>

        <div className="w-full flex items-center justify-between">
          <p className="text-[#470100] font-semibold text-2xl">Total</p>
          <p className="text-[#FE564B] font-semibold text-2xl">£20</p>
        </div>
      </div>
    </div>
  );
}
