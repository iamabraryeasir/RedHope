/**
 * Node Modules
 */
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router/dom";

/**
 * Local Modules
 */
import "@/index.css";
import { store } from "@/redux/store";
import { router } from "@/routes";
import { ThemeProvider } from "@/providers/theme-provider";

createRoot(document.getElementById("root")!).render(
  <>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="redhope-color-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </>
);
