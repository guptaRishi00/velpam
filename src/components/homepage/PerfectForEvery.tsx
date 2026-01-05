import Image from "next/image";

const cards = [
  { icon: "/cake.svg", title: "Birthday" },
  { icon: "/anniversary.svg", title: "Anniversary" },
  { icon: "/thank.svg", title: "Thank You" },
  { icon: "/recognition.svg", title: "Recognition" },
  { icon: "/congratulation.svg", title: "Congratulations" },
  { icon: "/getwell.svg", title: "Get Well Soon" },
  { icon: "/apology.svg", title: "Apology" },
  { icon: "/others.svg", title: "Others" },
];

export default function PerfectForEvery() {
  return (
    <section className="text-center flex flex-col items-center gap-6 px-4 py-12 md:px-12 lg:px-20 lg:py-16">
      {/* Heading: Smaller on mobile, large on desktop */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#470100] font-bold leading-tight">
        Perfect For Every Occasion
      </h2>

      <p className="text-[#47010080] font-medium text-base md:text-lg max-w-2xl">
        Whatever the moment, Valpem helps you make it special
      </p>

      {/* Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 w-full mt-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 bg-[#FE564B0A] border border-[#FE564B40] p-6 md:p-8 lg:px-10 lg:py-5 rounded-2xl lg:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-14 lg:h-14">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#470100] font-semibold text-sm md:text-base lg:text-lg">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
