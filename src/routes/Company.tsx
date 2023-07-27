import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import ProductRoutes from "./product";
// import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";
import AdminLayout from "../ui/features/adminSetting/Layout";

import ProfileLayout from "../ui/features/company/ProfileLayout";
import softwareRoutes from "./software";
import AdminRoutes from "./AdminSetting";

// routes

const CompanyDashboard = loadable(
    () => import("../ui/features/company/CompanyDashboard")
);

const ProductLayout = loadable(
    () => import("../ui/features/products/ProductLayout")
);

const CompanyRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <CompanyDashboard />,
    },

    {
        path: "profile/:id",
        element: <ProfileLayout />,
    },
    {
        path: "products",
        element: <ProductLayout />,
        children: ProductRoutes,
    },

    {
        path: "software",
        element: <Outlet />,
        children: softwareRoutes,
    },
    {
        path: "settings",
        element: <AdminLayout />,
        children: AdminRoutes,
    },
];

export default CompanyRoutes;
