import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps {
  text: string;
  className?: string;

  href?: string;

  onClick?: () => void;

  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  text,
  href,
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const defaultStyles =
    "inline-block w-fit h-fit bg-[#FE564B] text-white border-none text-base lg:text-lg font-medium cursor-pointer px-6 py-2 lg:px-10 lg:py-2.5 rounded-xl whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  if (href) {
    return (
      <Link href={href} className={cn(defaultStyles, className)}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(defaultStyles, className)}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
