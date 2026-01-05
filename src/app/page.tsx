import HeroSection from "@/components/homepage/HeroSection";
import HowVelpamWorks from "@/components/homepage/HowVelpamWorks";
import MoreThan from "@/components/homepage/MoreThan";
import PerfectForEvery from "@/components/homepage/PerfectForEvery";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <HowVelpamWorks />
      <MoreThan />
      <PerfectForEvery />
      <Footer />
    </div>
  );
}
