import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center">
      {/* CTA Section - The Red Box */}
      <div className="bg-[#FE564B] w-[90%] lg:w-[90%] min-h-[40vh] rounded-xl lg:rounded-xl p-8 md:p-12 lg:p-16 flex flex-col items-center text-center justify-center gap-10 relative z-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-5xl leading-tight">
          Ready to Create a Memorable Moment?
        </h2>
        <p className="text-[#E2E4D6] font-medium text-base md:text-2xl max-w-2xl">
          Join thousands of people who have made their loved ones feel special
          with Valpem
        </p>
        <Button
          href="/contact-us"
          text="Start Your Valpem Now"
          className="bg-white text-[#FE564B] px-8 py-3 transition-all font-bold"
        />
      </div>

      <div className="relative bg-[#470100] text-white w-full px-6 pt-32 pb-12 md:px-16 lg:px-24 mt-[-10vh] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            {/* Column 1: Brand/Logo (Takes 2 spans on large screens) */}
            <div className="flex flex-col items-start gap-6 lg:col-span-2">
              <Image
                src="/whiteLogo.svg"
                alt="Valpem Logo"
                width={50}
                height={50}
                className="h-auto"
              />
              <p className="text-sm md:text-base max-w-80 leading-relaxed opacity-80">
                Making moments memorable, one message at a time.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-medium">Quick Links</h3>
              <nav className="flex flex-col gap-4 text-sm opacity-90">
                <Link
                  href="/how-it-works"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  How it works
                </Link>
                <Link
                  href="/create"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  Create your Valpem
                </Link>
              </nav>
            </div>

            {/* Column 3: Partners */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-medium">Partners</h3>
              <nav className="flex flex-col gap-4 text-sm opacity-90">
                <Link
                  href="/provider-portal"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  Provider Portal
                </Link>
                <Link
                  href="/become-partner"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  Become a Partner
                </Link>
                <Link
                  href="/terms"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="hover:underline underline-offset-4 font-medium"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>

            {/* Column 4: Contact Us */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-medium">Contact Us</h3>
              <div className="flex flex-col gap-4 text-sm opacity-90">
                <a
                  href="mailto:info@valpem.co.uk"
                  className="flex items-center gap-3 font-medium hover:text-[#FE564B] transition-colors"
                >
                  <Image src="/mail.svg" alt="Email" width={16} height={16} />
                  info@valpem.co.uk
                </a>
                <div className="flex items-center gap-3">
                  <Image src="/call.svg" alt="Phone" width={16} height={16} />
                  <span className="font-medium">+44 94857908843</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-medium">Follow</span>
                  <Link
                    href="#"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/facebook.svg"
                      alt="Facebook"
                      width={10}
                      height={10}
                      className="w-2.5"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={16}
                      height={16}
                      className="w-4"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs md:text-sm font-medium opacity-60">
              © {new Date().getFullYear()} Valpem. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
