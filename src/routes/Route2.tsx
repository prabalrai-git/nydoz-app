import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Protection

// import ProtectCompany from "../ui/features/ProtectRoutes/ProtectCompany";
// import ProtectHomeRoute from "../ui/protection/ProtectHome";
import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";

//Auth Routes
import AuthLayout from "../ui/features/auth/Layout";
import ChangePassword from "../ui/features/auth/ChangePassword";

// public pages
import MainLayout from "../ui/features/home/MainLayout";
import LandingHomePage from "../ui/features/home/Home";

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

// Company Roles
// import RoleLayout from "../ui/features/roles/RoleLayout";

// Visa Type
import VisaTypeList from "../ui/features/visaType/VisaTypeList";

// Agent
import AgentList from "../ui/features/agent/AgentList";

import PageNotFound from "../ui/features/utils/PageNotFound";
import RoleList from "../ui/features/roles/RoleList";
import AgentLayout from "../ui/features/agent/AgentLayout";
import AddAgent from "../ui/features/agent/AddAgent";
import SingleProduct from "../ui/features/products/SingleProduct";
import BuyProduct from "../ui/features/company/BuyProduct";
import CompanyProductList from "../ui/features/products/CompanyProductList";
import SocialLinkList from "../ui/features/socialLinks/SocialLinkList";

// routes v2
import AuthRoutes from "./auth";

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
                        element: <LandingHomePage />,
                    },
                ],
            },

            {
                path: "auth",
                element: <AuthLayout />,
                children: AuthRoutes,
            },

            {
                path: "home",
                element: <UserLayout />,
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
                        path: ":companySubdomian",
                        element: <CompanyLayout />,

                        children: [
                            {
                                path: "dashboard",
                                element: <CompanyDashboard />,
                            },
                            // products for all company users

                            {
                                // @ Edit company
                                path: "edit",
                                element: (
                                    <ProtectCompanyOwner>
                                        <AddCompany />
                                    </ProtectCompanyOwner>
                                ),
                            },

                            {
                                path: "documents",
                                element: (
                                    <ProtectCompanyOwner>
                                        <DocumentsList />
                                    </ProtectCompanyOwner>
                                ),
                            },
                            {
                                path: "roles",
                                // element: <RoleList />,
                                element: (
                                    <ProtectCompanyOwner>
                                        <RoleList />
                                    </ProtectCompanyOwner>
                                ),
                            },

                            {
                                path: "social-links",
                                element: (
                                    <ProtectCompanyOwner>
                                        <SocialLinkList />
                                    </ProtectCompanyOwner>
                                ),
                            },
                            {
                                path: "visa-types",
                                element: (
                                    <ProtectCompanyOwner>
                                        <VisaTypeList />
                                    </ProtectCompanyOwner>
                                ),
                            },

                            {
                                path: "products",
                                element: <ProductLayout />,
                                children: [
                                    {
                                        path: "view",
                                        element: <CompanyProductList />,
                                    },
                                    {
                                        path: "buy",
                                        element: (
                                            <ProtectCompanyOwner>
                                                <BuyProduct />,
                                            </ProtectCompanyOwner>
                                        ),
                                    },

                                    {
                                        path: ":productId",
                                        element: <SingleProduct />,
                                    },
                                ],
                            },
                            {
                                path: "profile/:id",
                                element: <ProfileLayout />,
                                children: [
                                    {
                                        path: "agents",
                                        element: (
                                            <ProtectCompanyOwner>
                                                <AgentLayout />
                                            </ProtectCompanyOwner>
                                        ),
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
                                path: "list",
                                element: (
                                    <ProtectCompanyOwner>
                                        <CompanyList />
                                    </ProtectCompanyOwner>
                                ),
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
