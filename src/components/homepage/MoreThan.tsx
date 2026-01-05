import Image from "next/image";

const list = [
  {
    icon: "/check.svg",
    text: "Handwritten on premium stationery",
  },
  {
    icon: "/check.svg",
    text: "Personally read aloud to recipient",
  },
  {
    icon: "/check.svg",
    text: "Signed and presented as keepsake",
  },
  {
    icon: "/check.svg",
    text: "Delivery confirmation with photo proof",
  },
  {
    icon: "/check.svg",
    text: "Available at 500+ locations worldwide",
  },
];

export default function MoreThan() {
  return (
    <div className="bg-[#FE564B0A] w-full h-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 lg:py-16 gap-10 lg:gap-0">
      <div className="flex flex-col items-start gap-6 lg:gap-8 w-full lg:w-auto">
        <p className="text-[#470100] text-3xl md:text-4xl lg:text-5xl font-bold">
          More Than Just a Message
        </p>
        <p className="text-[#47010080] font-semibold max-w-lg text-sm md:text-base">
          Valpem creates unforgettable moments by combining the personal touch
          of handwritten notes with professional delivery service at the world's
          finest establishments.
        </p>
        <div className="flex flex-col items-start gap-6 lg:gap-8 px-0 lg:px-8">
          {list.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img src={item.icon} alt="check" className="shrink-0" />
              <p className="text-[#470100] font-medium text-sm md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-auto flex justify-center">
        <Image
          src="/moreThan.png"
          alt="more than just a message"
          width={600}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
