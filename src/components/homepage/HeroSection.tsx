import Image from "next/image";
import Button from "../shared/Button";

export default function HeroSection() {
  return (
    <div className="px-6 py-10 lg:px-16 lg:py-16 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
      <div className="w-full flex flex-col items-start text-left gap-4 lg:gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#470100] leading-tight">
            Send Heartfelt Messages
          </h1>
          <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#FE564B] leading-tight">
            Wherever They Are
          </p>
        </div>

        <p className="text-[#47010099] font-semibold text-lg lg:text-xl">
          Personalized Messages Delivered Anywhere
        </p>

        <p className="text-[#47010080] text-base lg:text-xl font-medium max-w-2xl">
          Valpem delivers handwritten, personally read messages to your loved
          ones at hotels, restaurants, flights, and cruises worldwide. Make
          every occasion unforgettable.
        </p>

        <Button
          href="/create"
          text="Create your Valpem"
          className="lg:px-3 lg:text-md"
        />
      </div>

      <div className="w-full lg:w-fit flex justify-center">
        <Image
          src="/heroimage.png"
          alt="Hero Image"
          width={500}
          height={500}
          className="w-full max-w-87.5 md:max-w-112.5 lg:max-w-none lg:w-125 h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
