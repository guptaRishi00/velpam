"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../lib/store/store";
import { initializeAuth } from "@/lib/store/features/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeAuth());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
