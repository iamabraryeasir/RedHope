"use client";

/**
 * Local Modules
 */
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

/**
 * Assets
 */
import { Moon, Sun } from "lucide-react";

/**
 * Component Logic
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // toggle only light/dark (ignoring "system")
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
