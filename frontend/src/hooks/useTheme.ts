/**
 * Node Modules
 */
import { useContext } from "react";

/**
 * Local Modules
 */
import { ThemeProviderContext } from "@/contexts/theme-context";

/**
 * Hook Logic
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
