/**
 * Node Modules
 */
import { createContext } from "react";

/**
 * Local Modules
 */

/**
 * Types
 */
export type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

/**
 * Initial State
 */
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

/**
 * Context
 */
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
