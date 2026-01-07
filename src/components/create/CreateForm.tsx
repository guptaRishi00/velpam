"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { addOrder } from "@/lib/store/features/order/orderSlice";

const ocassions = [
  { icon: "/cake.svg", title: "Birthday" },
  { icon: "/cake.svg", title: "Anniversary" },
  { icon: "/cake.svg", title: "Thankyou" },
  { icon: "/cake.svg", title: "Recognition" },
  { icon: "/cake.svg", title: "Congratulations" },
  { icon: "/cake.svg", title: "Get Well Soon" },
  { icon: "/cake.svg", title: "Apology" },
  { icon: "/cake.svg", title: "Others" },
];

const providers = [
  { icon: "/cake.svg", title: "Hotel" },
  { icon: "/cake.svg", title: "Restaurant" },
  { icon: "/cake.svg", title: "Airline" },
  { icon: "/cake.svg", title: "Cruise" },
];

export default function CreateForm({}: any) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { order } = useAppSelector((state) => state.order);

  const initialOcassion = order?.ocassion
    ? ocassions.find((o) => o.title === order.ocassion)
    : null;

  const initialProvider = order?.providerType
    ? providers.find((p) => p.title === order.providerType)
    : null;

  const [ocassionState, setOcassionState] = useState<any>(initialOcassion);
  const [providerState, setProviderState] = useState<any>(initialProvider);

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

  if (!user) {
    return <div className="p-10 text-center">Please Login to continue.</div>;
  }

  const handleSubmit = () => {
    if (
      !ocassionState ||
      !providerState ||
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

    const orderData = {
      id: order?.id || Date.now().toString(),
      providerId: user.id,
      ocassion: ocassionState.title,
      recipientName: recipientName,
      recipientContact: recipientContact,
      message: personalMessage,
      providerType: providerState.title,
      providerName: providerName,
      deliveryLocation: deliveryLocation,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      customerName: senderName,
      customerEmail: senderEmail,
      customerContact: senderContact,
    };

    dispatch(addOrder(orderData));
    router.push("/preview");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user) {
    return <div className="p-10 text-center">Please Login to continue.</div>;
  }

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
                    ocassionState?.title === ocassion.title
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
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">
              Recipient’s Contact*
            </p>
            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="+44 37467359847"
              value={recipientContact}
              onChange={(e) => setRecipientContact(e.target.value)}
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
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
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
                    providerState?.title === provider.title
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
            <div className="relative w-full mt-2">
              <select
                className="w-full appearance-none border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 focus:outline-none focus:ring-2 focus:ring-[#FE564B] text-[#470100] cursor-pointer"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
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
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="e.g. 123 Main St, London"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
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
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p className="text-2xl text-[#470100] font-medium">
                Delivery Time (Optional)
              </p>
              <input
                type="text"
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
                placeholder="e.g. 14:00"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
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
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <p className="text-2xl text-[#470100] font-medium">Your Contact*</p>
            <input
              type="number"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-4 py-5 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080]"
              placeholder="+22 747027-54757"
              value={senderContact}
              onChange={(e) => setSenderContact(e.target.value)}
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
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          text="Preview Your Valpam"
          className="w-full cursor-pointer bg-[#FE564B] text-white lg:py-5 rounded-xl mt-10 font-semibold text-xl text-center"
        />
      </div>
    </div>
  );
}
