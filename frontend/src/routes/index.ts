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
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminAnalysis from "@/components/modules/dashboard/AdminAnalysis";
import AllDonors from "@/components/modules/dashboard/AllDonors";
import BloodRequests from "@/components/modules/dashboard/BloodRequests";
import Settings from "@/components/modules/dashboard/Settings";
import { withAuth } from "@/lib/withAuth";
import { UserRole } from "@/constants/role";
import type { TRole } from "@/types";

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

  // admin dashboard
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, UserRole.admin as Partial<TRole>),
    children: [
      {
        index: true,
        Component: AdminAnalysis,
      },
      {
        path: "donors",
        Component: AllDonors,
      },
      {
        path: "blood-requests",
        Component: BloodRequests,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
]);
