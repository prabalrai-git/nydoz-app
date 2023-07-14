import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Protection
import ProtectAuth from "../ui/features/auth/ProtectAuth";
import Protected from "../ui/features/auth/ProtectedRoute";
// import ProtectCompany from "../ui/features/ProtectRoutes/ProtectCompany";

//Auth Routes
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

import CompanyLayout from "../ui/features/company/Layout";
import CompanyDashboard from "../ui/features/company/CompanyDashboard";

import ProfileLayout from "../ui/features/company/ProfileLayout";
import AddCompany from "../ui/features/company/AddCompany";
import CompanyList from "../ui/features/company/CompanyList";
import DocumentsList from "../ui/features/documents/DocumentsList";
import ProductLayout from "../ui/features/products/ProductLayout";
// import CompanyProductList from "../ui/features/products/ProductList";
import AllProductList from "../ui/shared/components/products/ProductList";

// Company Roles
// import RoleLayout from "../ui/features/roles/RoleLayout";

// Agent
import AgentList from "../ui/features/agent/AgentList";

import PageNotFound from "../ui/features/utils/PageNotFound";
import RoleList from "../ui/features/roles/RoleList";
import AgentLayout from "../ui/features/agent/AgentLayout";
import AddAgent from "../ui/features/agent/AddAgent";
import CompanyProvider from "../context/CompanyProvider";
import SingleProduct from "../ui/features/products/SingleProduct";

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
                        path: "create-company",
                        element: <AddCompany />,
                    },
                    {
                        path: ":companyId",
                        element: (
                            <CompanyProvider>
                                <CompanyLayout />
                            </CompanyProvider>
                        ),
                        // element: <CompanyLayout />,

                        children: [
                            {
                                path: "",
                                element: <CompanyDashboard />,
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
                                    {
                                        path: "edit",
                                        element: <AddAgent />,
                                    },
                                ],
                            },

                            {
                                path: "products",
                                element: <ProductLayout />,
                                children: [
                                    {
                                        path: "buy",
                                        element: <AllProductList />,
                                    },
                                    {
                                        path: ":productId",
                                        element: <SingleProduct />,
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                    {
                        path: "company",
                        element: <CompanyLayout />,
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
