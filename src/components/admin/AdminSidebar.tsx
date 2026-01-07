"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { Mail, Heart, User, CircleDollarSign } from "lucide-react"; // Using Lucide for cleaner matches

const items = [
  {
    icon: MdOutlineDashboard,
    text: "Dashboard",
    href: "/admin-dashboard",
  },
  {
    icon: Mail,
    text: "All Orders",
    href: "/admin-orders",
  },
  {
    icon: Heart,
    text: "Service Providers",
    href: "/admin-providers",
  },
  {
    icon: User,
    text: "Customers",
    href: "/admin-customers",
  },
  {
    icon: CircleDollarSign,
    text: "Finance $ Payment",
    href: "/admin-finance",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6 lg:p-5">
      <div className="flex flex-col items-start gap-6">
        {items.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 w-full rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#FE564B] text-white"
                  : "text-[#470100] hover:bg-[#FE564B10]"
              }`}
            >
              <item.icon
                size={24}
                className={isActive ? "text-white" : "text-[#470100]"}
              />
              <p className="text-lg lg:text-xl font-medium whitespace-nowrap">
                {item.text}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
