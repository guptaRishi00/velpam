"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { logout } from "@/lib/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

type Props = {};

export default function ProviderHeader({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <header className="flex flex-row justify-between items-center px-6 py-4 lg:px-8 lg:py-6 z-9999">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Velpam Logo"
          width={200}
          height={200}
          className="w-32 lg:w-40 h-auto"
          priority
        />
      </Link>

      <Button onClick={handleLogout} text="Logout" />
    </header>
  );
}
