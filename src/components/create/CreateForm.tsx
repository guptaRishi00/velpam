"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "../shared/Button";

const ocassions = [
  {
    icon: "/cake.svg",
    title: "Birthday",
  },
  {
    icon: "/cake.svg",
    title: "Anniversary",
  },
  {
    icon: "/cake.svg",
    title: "Thankyou",
  },
  {
    icon: "/cake.svg",
    title: "Recognition",
  },
  {
    icon: "/cake.svg",
    title: "Congratulations",
  },
  {
    icon: "/cake.svg",
    title: "Get Well Soon",
  },
  {
    icon: "/cake.svg",
    title: "Apology",
  },
  {
    icon: "/cake.svg",
    title: "Others",
  },
];

const providers = [
  {
    icon: "/cake.svg",
    title: "Hotel",
  },
  {
    icon: "/cake.svg",
    title: "Restaurant",
  },
  {
    icon: "/cake.svg",
    title: "Airline",
  },
  {
    icon: "/cake.svg",
    title: "Cruise",
  },
];

export default function CreateForm({}: any) {
  const [ocassionState, setOcassionState] = useState<any>(null);
  const [providerState, setProviderState] = useState<any>(null);

  console.log(ocassionState);

  return (
    <div className="px-10 my-10">
      <div className="w-full min-h-screen border border-[#FE564B40] rounded-3xl px-14 py-8 shadow-md">
        <div className="flex flex-col items-start gap-13">
          <div className="flex flex-col items-start w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Choose an Occassion*
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 w-full mt-4">
              {ocassions.map((ocassion, index) => (
                <div
                  key={index}
                  onClick={() => setOcassionState(ocassion)}
                  className={`${
                    ocassionState === ocassion
                      ? "border border-[#FE564B] bg-[#FE564B40]"
                      : ""
                  }  cursor-pointer flex flex-col items-start justify-center gap-4 bg-[#FE564B0A] border border-[#FE564B40] p-6 md:p-8 lg:px-10 lg:py-5 rounded-2xl lg:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-10 lg:h-10">
                    <Image
                      src={ocassion.icon}
                      alt={ocassion.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[#FE564B] font-medium text-sm md:text-base lg:text-lg">
                    {ocassion.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Recipient’s Name*
            </p>

            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="e.g., Jacob"
            />
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Recipient’s Contact*
            </p>

            <input
              type="number"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="+44 37467359847"
            />
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Your personal Message*
            </p>

            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="write your heartfelt message here..."
            />
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#47010040] my-16"></div>

        <div className="flex flex-col items-start gap-13">
          <div className="flex items-center gap-4">
            <Image
              src="/location.svg"
              alt={"Delivery Details"}
              width={200}
              height={200}
              className="w-8"
            />
            <p className="text-4xl text-[#470100] font-semibold">
              Delivery Details
            </p>
          </div>

          <div className="flex flex-col items-start w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Provider Type*
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 w-full mt-4">
              {providers.map((provider, index) => (
                <div
                  key={index}
                  onClick={() => setProviderState(provider)}
                  className={`${
                    providerState === provider
                      ? "border border-[#FE564B] bg-[#FE564B40]"
                      : ""
                  }  cursor-pointer flex flex-col items-start justify-center gap-4 bg-[#FE564B0A] border border-[#FE564B40] p-6 md:p-8 lg:px-10 lg:py-5 rounded-2xl lg:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-10 lg:h-10">
                    <Image
                      src={provider.icon}
                      alt={provider.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[#FE564B] font-medium text-sm md:text-base lg:text-lg">
                    {provider.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Provider Name*
            </p>

            {/* 1. Relative container to hold the select and icon */}
            <div className="relative w-full mt-2">
              <select
                className="w-full appearance-none border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 focus:outline-none focus:ring-2 focus:ring-[#FE564B] text-[#470100] cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a provider
                </option>
                <option value="jacob">Jacob</option>
                <option value="valpem">Valpem Partner</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <ChevronDown className="text-[#FE564B]" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Delivery Location*
            </p>

            <input
              type="number"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="+44 37467359847"
            />
          </div>
          <div className="flex items-centers justify-between w-full gap-10">
            <div className="w-full">
              <p className="text-2xl text-[#470100] font-medium">
                Delivery Date*
              </p>

              <input
                type="date"
                className="w-full text-[#47010080] border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
                placeholder="write your heartfelt message here..."
              />
            </div>
            <div className="w-full">
              <p className="text-2xl text-[#470100] font-medium">
                Delivery Time (Optional)
              </p>

              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
                placeholder="write your heartfelt message here..."
              />
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#47010040] my-16"></div>

        <div className="flex flex-col items-start gap-13">
          <div className="flex items-center gap-4">
            <Image
              src="/person.svg"
              alt={"Delivery Details"}
              width={200}
              height={200}
              className="w-8"
            />
            <p className="text-4xl text-[#470100] font-semibold">
              Your Details
            </p>
          </div>

          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Your Name (as Sender)*
            </p>

            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">Your Contact*</p>

            <input
              type="number"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="+22 747027-54757"
            />
          </div>
          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Your Email (for Confirmation)*
            </p>

            <input
              type="email"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="e.g., John@example.com"
            />
          </div>
        </div>

        <Button
          href="/preview"
          text="Preview Your Valpam"
          className="w-full cursor-pointer bg-[#FE564B] text-white lg:py-5 rounded-xl mt-10 font-semibold text-xl text-center"
        />
      </div>
    </div>
  );
}
