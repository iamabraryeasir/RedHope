/**
 * Node Modules
 */
import { useDispatch, useSelector } from "react-redux";

/**
 * Local Modules
 */
import type { RootState, AppDispatch } from "@/redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
