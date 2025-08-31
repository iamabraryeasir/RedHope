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

createRoot(document.getElementById("root")!).render(
  <>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </>
);
