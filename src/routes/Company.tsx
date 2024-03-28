import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import productRoutes from "./products";
import AdminLayout from "../ui/features/adminSetting/Layout";
import productSettingRoutes from "./productSetting";
import ProfileLayout from "../ui/features/company/ProfileLayout";
import AdminRoutes from "./AdminSetting";

// routes

const CompanyDashboard = loadable(
  () => import("../ui/features/company/CompanyDashboard")
);

const ProductLayout = loadable(
  () => import("../ui/features/productsSetting/ProductLayout")
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
    children: productRoutes,
  },
  {
    path: "product-settings",
    element: <ProductLayout />,
    children: productSettingRoutes,
  },
  {
    path: "settings",
    element: <AdminLayout />,
    children: AdminRoutes,
  },
];

export default CompanyRoutes;
