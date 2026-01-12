"use client";

import { useState } from "react";
import { GoLock } from "react-icons/go";
import { FaPaypal } from "react-icons/fa";
import {
  CreditCard,
  Calendar,
  Lock,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import axios from "axios";

type Props = {};

export default function SecurePayment({}: Props) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const { order } = useAppSelector((state) => state.order);
  const { token } = useAppSelector((state) => state.auth);

  const handleCreateOrder = async () => {
    console.log("create order from card");

    try {
      if (!order || !token) {
        alert("Missing order details or user session");
        return;
      }

      const payload = {
        providerId: order.providerId,
        occasion: order.ocassion,
        recipientName: order.recipientName,
        message: order.message,
        deliveryLocation: order.deliveryLocation,
        deliveryDate: order.deliveryDate,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/preview`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { ok, order: createdOrder, paymentClientSecret } = response.data;

      if (ok) {
        console.log("Order Created:", createdOrder);
        console.log("Client Secret:", paymentClientSecret);

        // TODO: Store clientSecret in state to pass to Stripe Elements
        // setClientSecret(paymentClientSecret);
      }
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data);
      alert(error.response?.data?.error || "Payment failed");
    }
  };

  const handlePaypal = () => {
    console.log("pay with paypal");
  };

  return (
    <div className="px-10 my-10">
      <div className="w-full h-auto border border-[#FE564B] rounded-3xl px-14 space-y-5 py-8 shadow-md">
        <div className="border-2 border-[#0E542B80] bg-[#EFFDF4] rounded-xl flex items-center justify-center gap-5 p-5 w-full h-auto">
          <GoLock className="text-[#0E542BBF] text-4xl" />
          <p className="text-[#0E542BBF] font-semibold text-2xl">
            Secure Payment - SSL Encrypted
          </p>
        </div>

        <div className="flex items-center w-full bg-[#FFF5F5] rounded-full p-1 mt-6">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 py-3 rounded-full flex items-center justify-center gap-3 font-medium cursor-pointer transition-all ${
              paymentMethod === "card"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:bg-[#FE564B0A]"
            }`}
          >
            <CreditCard size={20} />
            Credit/Debit card
          </button>

          <button
            onClick={() => setPaymentMethod("paypal")}
            className={`flex-1 py-3 rounded-full flex items-center justify-center gap-3 font-medium cursor-pointer transition-all ${
              paymentMethod === "paypal"
                ? "bg-[#FE564B] text-white shadow-md"
                : "text-[#FE564B] hover:bg-[#FE564B0A]"
            }`}
          >
            <FaPaypal size={20} />
            Paypal
          </button>
        </div>

        <div className="mt-8 min-h-75">
          {paymentMethod === "card" ? (
            /* --- Card Form --- */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-[#470100] font-bold text-lg">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl px-5 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#470100] font-bold text-lg">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl px-5 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <label className="text-[#470100] font-bold text-lg">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/yyyy"
                      className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl px-5 py-4 pl-12 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
                    />
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#47010060]"
                      size={20}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <label className="text-[#470100] font-bold text-lg">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full bg-[#FFF5F5] border border-[#FE564B20] rounded-xl px-5 py-4 text-[#470100] placeholder:text-[#47010060] focus:outline-none focus:ring-2 focus:ring-[#FE564B] transition-all"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* --- PayPal Content --- */
            <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-24 h-24 bg-[#0030870A] rounded-full flex items-center justify-center">
                <FaPaypal className="text-[#003087] text-5xl" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-[#470100] font-bold text-2xl">
                  Pay with PayPal
                </h3>
                <p className="text-[#47010080] font-medium text-lg">
                  You will be redirected to PayPal's secure website to complete
                  your payment.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#FFF5F5] px-4 py-2 rounded-lg border border-[#FE564B20]">
                <p className="text-[#470100] font-medium text-sm">
                  Total to pay:
                </p>
                <p className="text-[#FE564B] font-bold text-lg">£20.00</p>
              </div>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-[#00000010] my-10"></div>

        <div className="flex w-full flex-wrap items-center justify-center gap-6 md:gap-10 text-[#0E542B] text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <Lock size={18} /> 256-bit SSL
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} /> PCI Compliant
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} /> 100% Secure
          </div>
        </div>

        <button
          onClick={paymentMethod === "card" ? handleCreateOrder : handlePaypal}
          className="w-full bg-[#FE564B] text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#e0453a] transition-all mt-6 cursor-pointer flex items-center justify-center gap-3"
        >
          {paymentMethod === "card" ? "Pay £20.00 Now" : "Proceed to PayPal"}
        </button>

        <p className="text-center text-[#47010080] text-sm font-medium mt-2">
          By completing this purchase, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
