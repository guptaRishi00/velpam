"use client";

import Image from "next/image";
import Button from "../shared/Button";
import { useAppSelector } from "@/lib/store/hooks/hooks";

type Props = {};

export default function PreviewComponent({}: Props) {
  const { order } = useAppSelector((state) => state.order);

  console.log("Order from preview: ", order);

  return (
    <div className="px-10 my-10">
      <div className="w-full flex flex-col min-h-screen border border-[#FE564B40] rounded-3xl px-14 py-8 shadow-md">
        <p className="text-2xl text-[#470100] font-medium text-center">
          Your Message Preview
        </p>

        <div className="relative bg-[#FEF5EF] border border-[#FE564B20] w-full  h-130 rounded-3xl overflow-hidden flex flex-col items-center justify-center px-12 text-center mt-5">
          {/* Confetti Background - Positioned at top */}
          <div className="absolute top-0 left-0 w-full opacity-70">
            <Image
              src="/confetti.svg"
              alt="Preview Image"
              width={800}
              height={300}
              className="w-full object-cover"
            />
          </div>

          {/* Content Wrapper - Relative to sit above confetti */}
          <div className="relative z-10 flex flex-col items-center gap-20 -mt-20">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-[#FE564B] font-bold text-5xl">
                Happy {order?.ocassion}
              </h3>

              <Image
                src="/underline.svg"
                alt="Preview Image"
                width={800}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <p className="text-[#470100] font-bold italic text-2xl leading-relaxed max-w-2xl ">
              {order?.message || "No Message"}
            </p>
          </div>

          {/* Signature Section - Positioned Bottom Right */}
          <div className="absolute bottom-10 right-12 flex flex-col items-end gap-1">
            <p className="text-[#FE564B] font-semibold text-lg">With Love,</p>
            <p className="text-[#470100] font-bold text-xl">
              {order?.customerName}
            </p>

            {/* Signature Line */}
            <div className="w-32 h-px bg-[#47010020] my-1"></div>
            <p className="text-[#47010060] text-sm italic font-medium">
              Staff Signature
            </p>
          </div>
        </div>

        <div className="flex items-stretch bg-[#FEF5EF] border-l-4 border-[#470100] w-full rounded-r-2xl p-6 my-8 mx-auto">
          <p className="text-xl leading-relaxed max-w-6xl">
            <span className="font-bold text-[#470100]">Note:</span>{" "}
            <span className="text-[#47010099] font-medium">
              This is a preview of the stationery your recipient will receive.
              Your personal message will be transcribed onto this stationery by
              the service provider's staff.
            </span>
          </p>
        </div>

        <div className="h-0.5 w-full bg-[#47010040] my-16"></div>

        <div className="text-start flex items-start flex-col gap-8">
          <p className="text-2xl text-[#470100] font-semibold">Order Summary</p>

          <div className="flex items-start gap-6">
            <Image
              src="/person.svg"
              alt="Order Summary"
              width={200}
              height={200}
              className="w-5"
            />

            <div className="flex flex-col items-start">
              <p className="text-[#47010099] font-medium text-lg">To:</p>
              <p className="font-semibold text-xl text-[#470100]">
                {order?.recipientName}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image
              src="/person.svg"
              alt="Order Summary"
              width={200}
              height={200}
              className="w-5"
            />

            <div className="flex flex-col items-start">
              <p className="text-[#47010099] font-medium text-lg">At:</p>
              <p className="font-semibold text-xl text-[#470100]">
                {order?.deliveryLocation}
              </p>
              <p className="text-[#47010099] font-medium text-lg">
                {order?.deliveryLocation}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image
              src="/person.svg"
              alt="Order Summary"
              width={200}
              height={200}
              className="w-5"
            />

            <div className="flex flex-col items-start">
              <p className="text-[#47010099] font-medium text-lg">On:</p>
              <p className="font-semibold text-xl text-[#470100]">
                {order?.deliveryDate}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image
              src="/person.svg"
              alt="Order Summary"
              width={200}
              height={200}
              className="w-5"
            />

            <div className="flex flex-col items-start">
              <p className="text-[#47010099] font-medium text-lg">From:</p>
              <p className="font-semibold text-xl text-[#470100]">
                {order?.customerName}
              </p>
              <p className="text-[#47010099] font-medium text-lg">
                {order?.customerEmail}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full gap-8">
          <Button
            href="/create"
            text="Edit Details"
            className="w-full cursor-pointer bg-white border border-[#FE564B] text-[#FE564B] lg:py-5 rounded-xl mt-10 font-semibold text-xl text-center"
          />
          <Button
            href="/preview"
            text="Proceed to Payment"
            className="w-full cursor-pointer bg-[#FE564B] text-white lg:py-5 rounded-xl mt-10 font-semibold text-xl text-center"
          />
        </div>
      </div>
    </div>
  );
}
