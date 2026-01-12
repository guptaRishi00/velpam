"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import Icons
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { login } from "@/lib/store/features/auth/authSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/home");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          role: "customer",
        }
      );
      setSuccess(true);
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
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Registration failed."
          : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md border border-[#FE564B40] rounded-2xl px-6 md:px-10 py-8 shadow-sm bg-white">
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="w-28 h-auto"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl text-[#470100] font-bold">
            Create Account
          </h1>
        </div>

        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-2.5 text-xs text-red-500 bg-red-50 rounded-lg border">
              {error}
            </div>
          )}
          {success && (
            <div className="p-2.5 text-xs text-green-600 bg-green-50 rounded-lg border">
              Success! Redirecting...
            </div>
          )}

          <div className="w-full">
            <label className="text-sm text-[#470100] font-semibold ml-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-3 mt-1.5 text-sm"
              placeholder="e.g., John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm text-[#470100] font-semibold ml-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-3 mt-1.5 text-sm"
              placeholder="e.g., John@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm text-[#470100] font-semibold ml-1">
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"} // Dynamic Type
                className="w-full border border-[#EE5B4A40] bg-[#FE564B0A] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FE564B] text-sm"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#47010060] hover:text-[#FE564B]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-[#FE564B] text-white text-base font-semibold py-3 rounded-xl hover:shadow-md transition-all"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
