"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "../shared/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { addOrder } from "@/lib/store/features/order/orderSlice";

const OCCASIONS = [
  { icon: "/cake.svg", title: "Birthday" },
  { icon: "/cake.svg", title: "Anniversary" },
  { icon: "/cake.svg", title: "Thankyou" },
  { icon: "/cake.svg", title: "Recognition" },
  { icon: "/cake.svg", title: "Congratulations" },
  { icon: "/cake.svg", title: "Get Well Soon" },
  { icon: "/cake.svg", title: "Apology" },
  { icon: "/cake.svg", title: "Others" },
];

const PROVIDER_TYPES = [
  { icon: "/cake.svg", title: "Hotel" },
  { icon: "/cake.svg", title: "Restaurant" },
  { icon: "/cake.svg", title: "Airline" },
  { icon: "/cake.svg", title: "Cruise" },
];

interface ProviderData {
  _id: string;
  name: string;
  type: string;
}

export default function CreateForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { order } = useAppSelector((state) => state.order);

  const initialOccasion = order?.ocassion
    ? OCCASIONS.find((o) => o.title === order.ocassion)
    : null;

  const initialType = order?.providerType
    ? PROVIDER_TYPES.find(
        (p) => p.title.toLowerCase() === order.providerType.toLowerCase()
      )
    : null;

  const [ocassionState, setOcassionState] = useState<any>(initialOccasion);
  const [providerTypeState, setProviderTypeState] = useState<any>(initialType);

  const [recipientName, setRecipientName] = useState(
    order?.recipientName || ""
  );
  const [recipientContact, setRecipientContact] = useState(
    order?.recipientContact || ""
  );
  const [personalMessage, setPersonalMessage] = useState(order?.message || "");

  const [providerName, setProviderName] = useState(order?.providerName || "");
  const [deliveryLocation, setDeliveryLocation] = useState(
    order?.deliveryLocation || ""
  );
  const [deliveryDate, setDeliveryDate] = useState(order?.deliveryDate || "");
  const [deliveryTime, setDeliveryTime] = useState(order?.deliveryTime || "");

  const [senderName, setSenderName] = useState(order?.customerName || "");
  const [senderContact, setSenderContact] = useState(
    order?.customerContact || ""
  );
  const [senderEmail, setSenderEmail] = useState(order?.customerEmail || "");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`
        );
        if (response.data && response.data.ok) {
          setProviders(response.data.providers);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
    setIsMounted(true);
  }, []);

  const filteredProviders = useMemo(() => {
    if (!providerTypeState) return [];
    return providers.filter(
      (p) => p.type.toLowerCase() === providerTypeState.title.toLowerCase()
    );
  }, [providerTypeState, providers]);

  if (!isMounted || !user) {
    return <div className="p-10 text-center">Please Login to continue.</div>;
  }

  const handleSubmit = () => {
    if (
      !ocassionState ||
      !providerTypeState ||
      !recipientName ||
      !personalMessage ||
      !providerName ||
      !deliveryLocation ||
      !deliveryDate ||
      !senderName ||
      !senderEmail
    ) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    // Find the provider object that matches the selected name
    const selectedProvider = providers.find((p) => p.name === providerName);

    // Ensure we have a valid provider ID
    if (!selectedProvider) {
      alert("Please select a valid provider from the list.");
      return;
    }

    const orderData = {
      id: order?.id || Date.now().toString(),
      providerId: selectedProvider._id, // This is the ID of the hotel/restaurant
      ocassion: ocassionState.title,
      recipientName,
      recipientContact,
      message: personalMessage,
      providerType: providerTypeState.title,
      providerName,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      customerName: senderName,
      customerEmail: senderEmail,
      customerContact: senderContact,
    };

    dispatch(addOrder(orderData));
    router.push("/preview");
  };

  return (
    <div className="px-10 my-10">
      <div className="w-full min-h-screen border border-[#FE564B40] rounded-3xl px-14 py-8 shadow-md">
        <div className="flex flex-col items-start gap-10">
          <div className="flex flex-col items-start w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Choose an Occasion*
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
              {OCCASIONS.map((occ, index) => (
                <div
                  key={index}
                  onClick={() => setOcassionState(occ)}
                  className={`${
                    ocassionState?.title === occ.title
                      ? "border-[#FE564B] bg-[#FE564B40]"
                      : "border-[#FE564B40]"
                  } cursor-pointer flex flex-col items-start gap-4 bg-[#FE564B0A] border p-6 rounded-2xl shadow-sm transition-all`}
                >
                  <Image
                    src={occ.icon}
                    alt={occ.title}
                    width={40}
                    height={40}
                  />
                  <p className="text-[#FE564B] font-medium">{occ.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full space-y-8">
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Recipient Details*
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="Recipient’s Name*"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Recipient’s Contact*
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="+44 37467359847"
                value={recipientContact}
                onChange={(e) => setRecipientContact(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Your personal Message*
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="Your personal Message*"
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#47010040] my-16"></div>

        <div className="flex flex-col items-start gap-10">
          <div className="flex items-center gap-4">
            <Image src="/location.svg" alt="Location" width={32} height={32} />
            <p className="text-4xl text-[#470100] font-semibold">
              Delivery Details
            </p>
          </div>

          <div className="w-full space-y-5">
            <p className="text-2xl text-[#470100] font-medium">
              Provider Type*
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {PROVIDER_TYPES.map((type, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setProviderTypeState(type);
                    setProviderName("");
                  }}
                  className={`${
                    providerTypeState?.title === type.title
                      ? "border-[#FE564B] bg-[#FE564B40]"
                      : "border-[#FE564B40]"
                  } cursor-pointer flex flex-col items-start p-6 bg-[#FE564B0A] border rounded-2xl transition-all`}
                >
                  <Image
                    src={type.icon}
                    alt={type.title}
                    width={40}
                    height={40}
                  />
                  <p className="text-[#FE564B] font-medium mt-2">
                    {type.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Provider Name*
            </p>
            <div className="relative w-full mt-2">
              <select
                className="w-full appearance-none border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none cursor-pointer"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              >
                <option value="">
                  {providerTypeState
                    ? "Select a provider"
                    : "Select Type first"}
                </option>
                {filteredProviders.map((p) => (
                  <option key={p._id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="text-[#FE564B]" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-5 flex-col w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Delivery Location*
            </p>
            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
              placeholder="Delivery Location*"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
            />
          </div>

          <div className="flex gap-10 w-full">
            <div className="flex-1">
              <p className="text-2xl text-[#470100] font-medium mb-2">
                Delivery Date*
              </p>
              <input
                type="date"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-1 outline-none"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <p className="text-2xl text-[#470100] font-medium mb-2">
                Delivery Time (Optional)
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-1 outline-none"
                placeholder="e.g. 14:00"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full bg-[#47010040] my-16"></div>

        <div className="flex flex-col items-start gap-10">
          <div className="flex items-center gap-4">
            <Image src="/person.svg" alt="Person" width={32} height={32} />
            <p className="text-4xl text-[#470100] font-semibold">
              Your Details
            </p>
          </div>
          <div className="w-full space-y-6">
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Your Name (as Sender)*
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="Your Name (as Sender)*"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Your Contact*
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="Your Contact*"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-5 flex-col">
              <p className="text-2xl text-[#470100] font-medium">
                Your Email (for Confirmation)*
              </p>
              <input
                type="email"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 outline-none"
                placeholder="Your Email*"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          text="Preview Your Valpam"
          className="w-full bg-[#FE564B] text-white py-5 rounded-xl mt-10 font-semibold text-xl"
        />
      </div>
    </div>
  );
}
