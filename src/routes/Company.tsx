import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import ProductRoutes from "./product";
import AdminLayout from "../ui/features/adminSetting/Layout";

import ProfileLayout from "../ui/features/company/ProfileLayout";
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
        path: "software",
        element: <ProductLayout />,
        children: ProductRoutes,
    },
    {
        path: "settings",
        element: <AdminLayout />,
        children: AdminRoutes,
    },
];

export default CompanyRoutes;
