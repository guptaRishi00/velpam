import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-6 py-4 lg:px-10 lg:py-6">
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

      <Button href="/contact-us" text="Contact Us" />
    </header>
  );
}
