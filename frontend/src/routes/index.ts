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
import HomePage from "@/pages/nav-pages/HomePage";
import DonorsPage from "@/pages/nav-pages/DonorsPage";
import AboutPage from "@/pages/nav-pages/AboutPage";
import ContactPage from "@/pages/nav-pages/ContactPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminAnalysis from "@/pages/dashboard/AdminAnalysis";
import AllDonors from "@/pages/dashboard/AllDonors";
import PendingRequests from "@/pages/dashboard/PendingRequests";
import Settings from "@/pages/dashboard/Settings";
import { withAuth } from "@/lib/withAuth";
import { UserRole } from "@/constants/role";
import type { TRole } from "@/types";
import DonorProfile from "@/pages/dashboard/DonorProfile";
import RequestsPage from "@/pages/nav-pages/RequestsPage";
import CreateRequest from "@/pages/nav-pages/CreateRequest";
import VerifyPage from "@/pages/auth/VerifyPage";

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
                Component: withAuth(DonorsPage),
            },
            {
                path: "requests",
                Component: withAuth(RequestsPage),
            },
            {
                path: "requests/create-new-request",
                Component: withAuth(CreateRequest),
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
    {
        path: "/verify",
        Component: VerifyPage,
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
                path: "donors/:donorId",
                Component: DonorProfile,
            },
            {
                path: "pending-requests",
                Component: PendingRequests,
            },
            {
                path: "settings",
                Component: Settings,
            },
        ],
    },
]);
