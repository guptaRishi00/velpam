import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function Button({ text, href, className }: ButtonProps) {
  const defaultStyles =
    "inline-block w-fit h-fit bg-[#FE564B] text-white border-none text-base lg:text-lg font-medium cursor-pointer px-6 py-2 lg:px-10 lg:py-2.5 rounded-xl whitespace-nowrap transition-all";

  return (
    <Link href={href} className={cn(defaultStyles, className)}>
      {text}
    </Link>
  );
}
