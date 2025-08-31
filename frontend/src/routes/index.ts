/**
 * Node Modules
 */
import { createBrowserRouter } from "react-router";

/**
 * Local Modules
 */
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";

/**
 * Routes
 */
export const router = createBrowserRouter([
  // public
  {
    path: "/",
    Component: App,
  },

  // auth
  {
    path: "/login",
    Component: LoginPage,
  },
]);
