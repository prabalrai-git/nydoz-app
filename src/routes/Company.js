import { jsx as _jsx } from "react/jsx-runtime";
import loadable from "@loadable/component";
import productRoutes from "./products";
import AdminLayout from "../ui/features/adminSetting/Layout";
import productSettingRoutes from "./productSetting";
import ProfileLayout from "../ui/features/company/ProfileLayout";
import AdminRoutes from "./AdminSetting";
import EditProfile from "../ui/features/company/EditProfile";
// routes
const CompanyDashboard = loadable(() => import("../ui/features/company/CompanyDashboard"));
const ProductLayout = loadable(() => import("../ui/features/productsSetting/ProductLayout"));
const CompanyRoutes = [
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
        element: _jsx(CompanyDashboard, {}),
        // element: <h1>hello</h1>,
    },
    {
        path: "profile/:id",
        element: _jsx(ProfileLayout, {}),
    },
    {
        path: "edit-profile/:id",
        element: _jsx(EditProfile, {}),
    },
    {
        path: "products",
        element: _jsx(ProductLayout, {}),
        children: productRoutes,
    },
    {
        path: "product-settings",
        element: _jsx(ProductLayout, {}),
        children: productSettingRoutes,
    },
    {
        path: "settings",
        element: _jsx(AdminLayout, {}),
        children: AdminRoutes,
    },
];
export default CompanyRoutes;
