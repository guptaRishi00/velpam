import Image from "next/image";

const cards = [
  {
    title: "Create Your Message",
    description:
      "Choose an occasion, write your heartfelt message, and tell us where to deliver it.",
    icon: "/message.svg",
    id: 1,
  },
  {
    title: "Schedule Delivery",
    description:
      "Pick the perfect date and time. We'll ensure your surprise arrives exactly when it's meant to.",
    icon: "/delivery.svg",
    id: 2,
  },
  {
    title: "Spread the Joy",
    description:
      "Watch as your personalized message creates a beautiful, lasting memory for your loved ones.",
    icon: "/boy.svg",
    id: 3,
  },
];

export default function HowVelpamWorks() {
  return (
    <div className="px-6 py-12 lg:px-16 lg:py-24 w-full flex flex-col items-center justify-center gap-12 lg:gap-20">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-3 lg:gap-5 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl text-[#470100] font-bold">
          How Valpem works
        </h2>
        <p className="text-[#47010080] text-base md:text-xl lg:text-2xl font-medium max-w-3xl">
          Three simple steps to create a moment they'll never forget
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-12 w-full max-w-7xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center justify-center w-full gap-4 lg:gap-6 bg-[#FE564B0A] border border-[#FE564B40] p-8 lg:p-10 rounded-2xl lg:rounded-3xl shadow-sm lg:shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-16 h-16 lg:w-16 lg:h-16">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-xl lg:text-2xl font-bold text-[#470100] text-center">
                {card.title}
              </p>
              <p className="text-center text-sm lg:text-lg lg:max-w-lg text-[#47010099] font-medium leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
