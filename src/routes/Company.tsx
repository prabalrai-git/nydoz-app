import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import productRoutes from "./products";
import AdminLayout from "../ui/features/adminSetting/Layout";
import productSettingRoutes from "./productSetting";
import ProfileLayout from "../ui/features/company/ProfileLayout";
import AdminRoutes from "./AdminSetting";
import AddCompany from "../ui/features/company/AddCompany";
import EditProfile from "../ui/features/company/EditProfile";

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
    // loader: () => {
    //   if (!localStorage.getItem("token")) {
    //     const searchParams = new URLSearchParams(window.location.search);

    //     const tokenValue = searchParams.get("token");

    //     localStorage.setItem("token", tokenValue);
    //     loading = false;
    //   }
    //   return null;
    // },
    element: <CompanyDashboard />,
    // element: <h1>hello</h1>,
  },
  {
    path: "profile/:id",
    element: <ProfileLayout />,
  },
  {
    path: "edit-profile/:id",
    element: <EditProfile />,
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
