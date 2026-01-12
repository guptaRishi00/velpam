"use client";
import {
  User,
  PartyPopper,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  X,
} from "lucide-react";

type Props = {
  setViewDetailModal: (value: boolean) => void;
  modalOrder: any;
};

export default function OrderDetailsModal({
  setViewDetailModal,
  modalOrder,
}: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const dateOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    } as const;

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    } as const;

    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
      date
    );
    const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(
      date
    );

    return `${formattedDate} at ${formattedTime}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="relative w-full h-auto max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-5 bg-white">
          <h2 className="text-xl md:text-2xl font-bold text-[#470100]">
            Order Details
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <User className="text-[#FE564B] mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  To:
                </span>
                <span className="text-[#470100] font-bold text-base leading-tight">
                  {modalOrder?.recipientName}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PartyPopper
                className="text-[#FE564B] mt-0.5 shrink-0"
                size={18}
              />
              <div className="flex flex-col">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  Occasion:
                </span>
                <span className="text-[#470100] font-bold text-base leading-tight">
                  {modalOrder?.occasion}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-[#FE564B] mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  To:
                </span>
                <span className="text-[#470100] font-bold text-base leading-tight">
                  {modalOrder?.deliveryLocation}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-[#FE564B] mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  On:
                </span>
                <span className="text-[#470100] font-bold text-base leading-tight">
                  {formatDate(modalOrder?.deliveryDate)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare
                className="text-[#FE564B] mt-0.5 shrink-0"
                size={18}
              />
              <div className="flex flex-col gap-1">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  Message to Deliver:
                </span>
                <p className="text-[#470100] font-bold text-sm leading-relaxed">
                  {modalOrder?.message}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="text-[#FE564B] mt-0.5 shrink-0" size={18} />
              <div className="flex flex-col">
                <span className="text-[#47010099] font-medium text-sm leading-tight">
                  From:
                </span>
                <span className="text-[#470100] font-bold text-base leading-tight">
                  {modalOrder?.customerName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px lg:w-px lg:h-auto bg-[#FE564B20] mx-0 lg:my-6"></div>

        <div className="flex-1 p-6 md:p-8 flex flex-col relative bg-white">
          <button
            onClick={() => setViewDetailModal(false)}
            className="absolute top-4 right-4 p-1.5 text-[#470100] hover:text-[#FE564B] hover:bg-[#FE564B10] rounded-full transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl md:text-2xl font-bold text-[#470100] mb-6 pr-8">
            Staff Instructions
          </h2>

          <ol className="list-decimal list-outside ml-4 flex flex-col gap-4 text-[#47010099] font-medium text-sm">
            <li className="pl-1">
              Please transcribe the message above onto your official,
              watermarked stationery.
            </li>
            <li className="pl-1">
              Read the message aloud to the recipient at the specified time and
              location.
            </li>
            <li className="pl-1">
              Sign the message and present it to the recipient as a keepsake.
            </li>
            <li className="pl-1">
              After delivery, return to the dashboard and click "Mark as
              Delivered" for this order.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
