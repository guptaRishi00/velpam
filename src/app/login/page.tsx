import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-20">
      {/* Main Card Container matching the CreateForm style */}
      <div className="w-full max-w-xl border border-[#FE564B40] rounded-3xl px-8 md:px-14 py-10 shadow-md bg-white">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-10 text-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Velpam Logo"
              width={150}
              height={50}
              className="w-32 h-auto"
            />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl text-[#470100] font-bold">
              Welcome Back
            </h1>
            <p className="text-[#47010080] font-medium text-base md:text-lg mt-2">
              Sign in to continue creating memorable moments
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form className="flex flex-col w-full gap-6">
          {/* Email Input */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-xl text-[#470100] font-medium ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-6 py-4 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080] transition-all"
              placeholder="e.g., John@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="text-xl text-[#470100] font-medium ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-2xl px-6 py-4 mt-2 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010080] transition-all"
              placeholder="Enter your password"
            />
            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="text-[#FE564B] font-medium text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button - Styled to match shared/Button.tsx but as a button element */}
          <button
            type="submit"
            className="w-full bg-[#FE564B] text-white text-lg font-medium cursor-pointer px-6 py-4 rounded-xl mt-4 hover:shadow-lg transition-all"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[#47010080] font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#FE564B] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
