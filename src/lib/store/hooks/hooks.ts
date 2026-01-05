import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store";

// 1. Manually assign the type to the dispatch function
export const useAppDispatch: () => AppDispatch = useDispatch;

// 2. Manually assign the type to the selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 3. Manually assign the type to the store hook
export const useAppStore: () => AppStore = useStore;
