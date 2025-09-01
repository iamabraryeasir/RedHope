/**
 * Node Modules
 */
import { createBrowserRouter } from "react-router";

/**
 * Local Modules
 */
import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import HomePage from "@/pages/public/HomePage";
import DonorsPage from "@/pages/public/DonorsPage";
import AboutPage from "@/pages/public/AboutPage";
import ContactPage from "@/pages/public/ContactPage";

/**
 * Routes
 */
export const router = createBrowserRouter([
  // public routes
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "donors",
        Component: DonorsPage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
    ],
  },

  // auth
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);
