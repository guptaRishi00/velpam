"use client";

import { login } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.push("/admin-dashboard");
      } else if (user.role === "provider") {
        router.push("/provider-dashboard");
      } else {
        router.push("/home");
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        { email, password }
      );

      dispatch(
        login({
          user: {
            id: response.data.user.id,
            email: response.data.user.email,
            role: response.data.user.role,
          },
          token: response.data.token,
        })
      );
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    // Reduced vertical padding (py-12 -> py-8)
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Reduced max-width (max-w-xl -> max-w-md) and padding */}
      <div className="w-full max-w-md border border-[#FE564B40] rounded-2xl px-6 md:px-10 py-8 shadow-sm bg-white">
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Velpam Logo"
              width={120} // Slightly smaller logo
              height={40}
              className="w-28 h-auto"
            />
          </Link>
          <div>
            {/* Smaller headings (text-3xl/4xl -> text-2xl/3xl) */}
            <h1 className="text-2xl md:text-3xl text-[#470100] font-bold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-[#47010080] font-medium text-sm md:text-base mt-1">
              Sign in to continue creating memorable moments
            </p>
          </div>
        </div>

        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-2.5 text-xs text-red-500 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="w-full">
            {/* Reduced label size (text-xl -> text-sm) */}
            <label
              htmlFor="email"
              className="text-sm text-[#470100] font-semibold ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010060] text-sm transition-all"
              placeholder="e.g., John@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="text-sm text-[#470100] font-semibold ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:ring-2 focus:ring-[#FE564B] placeholder:text-[#47010060] text-sm transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end mt-1.5">
              <Link
                href="/forgot-password"
                className="text-[#FE564B] font-medium text-xs hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            // Reduced padding (py-4 -> py-3) and text size
            className="w-full bg-[#FE564B] text-white text-base font-semibold cursor-pointer px-6 py-3 rounded-xl mt-2 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#47010080] text-sm font-medium">
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
