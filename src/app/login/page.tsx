"use client";

import { login } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks"; //
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
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

      router.push("/home");
    } catch (err: any) {
      console.log("error: ", err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-20">
      <div className="w-full max-w-xl border border-[#FE564B40] rounded-3xl px-8 md:px-14 py-10 shadow-md bg-white">
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

        <form className="flex flex-col w-full gap-6" onSubmit={handleSubmit}>
          {/* Error Message Display */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FE564B] text-white text-lg font-medium cursor-pointer px-6 py-4 rounded-xl mt-4 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

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
