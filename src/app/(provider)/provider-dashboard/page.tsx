"use client";
import AccountDetails from "@/components/provider-components/AccountDetails";
import CompletedOrders from "@/components/provider-components/CompeletedOrders"; // Note: Typo in filename matches your provided file
import ConfirmDelivery from "@/components/provider-components/ConfirmDelivery";
import MyEarnings from "@/components/provider-components/MyEarnings";
import NewOrders from "@/components/provider-components/NewOrders";
import OrderDetailsModal from "@/components/provider-components/OrderDetailsModal";
import StationeryCustomisation from "@/components/provider-components/StationeryCustomisation";
import axios from "axios";
import { logout } from "@/lib/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";

import { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";

type Props = {};

export default function ProviderDashboard({}: Props) {
  const [activeTab, setActiveTab] = useState<
    "newOrders" | "completed" | "accountBilling"
  >("newOrders");

  const [viewDetailModal, setViewDetailModal] = useState(false);
  const [confirmDelivery, setConfirmDelivery] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [markAsDelivered, setMarkAsDelivered] = useState<any>(null);
  const [completedOrders, setCompletedOrders] = useState<any>([]);

  const [orders, setOrders] = useState<any>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  const fetchOrder = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/provider/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.ok) {
        const pendingOrders = response.data.orders.filter(
          (order: any) => order.status === "PENDING_PAYMENT"
        );
        setOrders(pendingOrders);

        const deliveredOrders = response.data.orders.filter(
          (order: any) => order.status === "DELIVERED"
        );

        console.log("deliveredOrders: ", response.data.orders);

        setCompletedOrders(deliveredOrders);
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [token, dispatch, router]);

  return (
    <div className="px-10 space-y-5">
      {/* tabs */}
      <div className="px-10 py-10">
        <div className="w-full bg-[#FEF5EF] rounded-full h-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab("newOrders")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "newOrders"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            New Orders
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "completed"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab("accountBilling")}
            className={`w-full cursor-pointer px-8 py-4 rounded-full transition-colors duration-300 ease-in-out font-medium text-[#FE564B] ${
              activeTab === "accountBilling"
                ? "bg-[#FE564B] text-white"
                : " hover:bg-[#ffeae0]"
            }`}
          >
            Account & Billing
          </button>
        </div>
      </div>

      {activeTab === "newOrders" && (
        <div className="space-y-6">
          <div className="w-full flex items-center justify-between">
            <p className="text-[#47010080] font-medium text-lg">
              {orders.length} orders pending delivery
            </p>
            <button
              onClick={fetchOrder}
              className="flex items-center gap-2 bg-[#FE564B40] rounded-xl py-2 px-3"
            >
              <LuRefreshCcw color="#FE564B" />
              <span className="text-[#470100BF] font-medium cursor-pointer">
                Refresh
              </span>
            </button>
          </div>

          {orders.map((order: any) => (
            <NewOrders
              key={order.id || order._id}
              order={order}
              setViewDetailModal={setViewDetailModal}
              setConfirmDelivery={setConfirmDelivery}
              setModalOrder={setModalOrder}
              setMarkAsDelivered={setMarkAsDelivered}
            />
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <CompletedOrders orders={completedOrders} />
      )}

      {activeTab === "accountBilling" && (
        <div className="space-y-10">
          <MyEarnings />
          <AccountDetails />
          <StationeryCustomisation />
        </div>
      )}

      {viewDetailModal && (
        <OrderDetailsModal
          setViewDetailModal={setViewDetailModal}
          modalOrder={modalOrder}
        />
      )}

      {confirmDelivery && (
        <ConfirmDelivery
          onClose={() => {
            setConfirmDelivery(false);
            fetchOrder();
          }}
          markAsDelivered={markAsDelivered}
        />
      )}
    </div>
  );
}
