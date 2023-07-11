import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Auth Routes
import ProtectAuth from "../ui/features/auth/ProtectAuth";
import Protected from "../ui/features/auth/ProtectedRoute";
import AuthLayout from "../ui/features/auth/Layout";
import Register from "../ui/features/auth/Register";
import LoginPage from "../ui/features/auth/Login";
import ForgetPassword from "../ui/features/auth/ForgetPassword";
import ResetPassword from "../ui/features/auth/ResetPassword";
import ChangePassword from "../ui/features/auth/ChangePassword";

// public pages
import MainLayout from "../ui/features/home/MainLayout";
import Home from "../ui/features/home/Home";

// user pages
import UserLayout from "../ui/features/user/UserLayout";
import UserDashboard from "../ui/features/user/Dashboard";

// company pages

import Layout from "../ui/features/company/Layout";
import ProfileLayout from "../ui/features/company/ProfileLayout";
import AddCompany from "../ui/features/company/AddCompany";
import CompanyList from "../ui/features/company/CompanyList";
import DocumentsList from "../ui/features/documents/DocumentsList";
import ProductLayout from "../ui/features/products/ProductLayout";
import ProductList from "../ui/features/products/ProductList";

// Company Roles
// import RoleLayout from "../ui/features/roles/RoleLayout";

// Agent
import AgentList from "../ui/features/agent/AgentList";

import PageNotFound from "../ui/features/utils/PageNotFound";
import RoleList from "../ui/features/roles/RoleList";
import AgentLayout from "../ui/features/agent/AgentLayout";
import AddAgent from "../ui/features/agent/AddAgent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainLayout />,
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                ],
            },

            {
                path: "auth",
                element: (
                    <ProtectAuth>
                        <AuthLayout />
                    </ProtectAuth>
                ),
                children: [
                    {
                        path: "signup",
                        element: <Register />,
                    },
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgetPassword />,
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword />,
                    },
                ],
            },

            {
                path: "home",
                element: (
                    <Protected>
                        <UserLayout />
                    </Protected>
                ),
                children: [
                    {
                        path: "",
                        element: <UserDashboard />,
                    },
                    {
                        path: "agents",
                        element: <AgentLayout />,
                        children: [
                            {
                                path: "",
                                element: <AgentList />,
                            },
                            {
                                path: "add",
                                element: <AddAgent />,
                            },
                        ],
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                    {
                        path: "company",
                        element: <Layout />,
                        children: [
                            {
                                path: "profile/:id",
                                element: <ProfileLayout />,
                                children: [
                                    {
                                        path: "documents",
                                        element: <DocumentsList />,
                                    },
                                    {
                                        path: "roles",
                                        element: <RoleList />,
                                    },

                                    {
                                        path: "products",
                                        element: <ProductLayout />,
                                        children: [
                                            {
                                                path: "",
                                                element: <ProductList />,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: "add",
                                element: <AddCompany />,
                            },
                            {
                                path: "edit",
                                element: <AddCompany />,
                            },
                            {
                                path: "list",
                                element: <CompanyList />,
                            },
                        ],
                    },
                ],
            },

            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

export default router;
