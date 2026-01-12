import { LuRefreshCcw } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

export default function NewOrders({
  setViewDetailModal,
  setConfirmDelivery,
  order,
  setModalOrder,
  setMarkAsDelivered,
}: any) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not available";

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
    <div className="space-y-10">
      <div className="w-full rounded-3xl h-auto p-8 shadow-md border border-[#FE564B40] space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[#47010099] font-medium text-xl flex items-center gap-2">
            {order?.recipientName}
            <span className="text-sm rounded-md text-[#470100BF] bg-[#FE564B40] px-2 py-1">
              {order?.occasion}
            </span>
          </p>

          <button
            onClick={() => {
              setModalOrder(order);
              setViewDetailModal(true);
            }}
            className="border border-[#47010099] rounded-xl px-13 py-1.5 cursor-pointer"
          >
            View Details
          </button>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GrLocation color="#FE564B" />
            <p className="text-[#47010099] font-medium text-lg">
              {order?.deliveryLocation}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CiCalendarDate color="#FE564B " size={20} />
            <p className="text-[#47010099] font-medium text-lg">
              {formatDate(order?.deliveryDate)}
            </p>
          </div>

          <button
            onClick={() => {
              setMarkAsDelivered(order);
              setConfirmDelivery(true);
            }}
            className="bg-[#FE564B] text-white rounded-xl px-8 py-1.5 cursor-pointer"
          >
            Mark as Delivered
          </button>
        </div>
      </div>
    </div>
  );
}
