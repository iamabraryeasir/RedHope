/**
 * Node Modules
 */
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

/**
 * Local Modules
 */
import "./index.css";
import App from "./App.tsx";
import { store } from "@/redux/store";

createRoot(document.getElementById("root")!).render(
  <>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </>
);
