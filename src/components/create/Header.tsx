import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-6 py-4 lg:px-6 lg:py-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Velpam Logo"
          width={200}
          height={200}
          className="w-32 lg:w-34 h-auto"
          priority
        />
      </Link>

      <Button
        href="/contact-us"
        text="Create your Valpem"
        className="lg:px-4 lg:text-sm"
      />
    </header>
  );
}
