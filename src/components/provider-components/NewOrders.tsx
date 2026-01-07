import { LuRefreshCcw } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";

type Props = {};

export default function NewOrders({}: Props) {
  return (
    <div className="space-y-10">
      <div className="w-full flex items-center justify-between">
        <p className="text-[#47010080] font-medium text-lg">
          1 order pending delivery
        </p>
        <button className="flex items-center gap-2 bg-[#FE564B40] rounded-xl py-2 px-3">
          <LuRefreshCcw color="#FE564B" />
          <span className="text-[#470100BF] font-medium cursor-pointer">
            Refresh
          </span>
        </button>
      </div>

      <div className="w-full rounded-3xl h-auto p-8 shadow-md border border-[#FE564B40] space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[#47010099] font-medium text-xl flex items-center gap-2">
            Jacob Mark
            <span className="text-sm rounded-md text-[#470100BF] bg-[#FE564B40] px-2 py-1">
              Birthday
            </span>
          </p>

          <button className="border border-[#47010099] rounded-xl px-13 py-1.5 cursor-pointer">
            View Details
          </button>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GrLocation color="#FE564B" />
            <p className="text-[#47010099] font-medium text-lg">Room 205</p>
          </div>

          <div className="flex items-center gap-2">
            <CiCalendarDate color="#FE564B " size={20} />
            <p className="text-[#47010099] font-medium text-lg">
              Friday 6 March 2026 at 05:36
            </p>
          </div>

          <button className="bg-[#FE564B] text-white rounded-xl px-8 py-1.5 cursor-pointer">
            Mark as Delivered
          </button>
        </div>
      </div>
    </div>
  );
}
