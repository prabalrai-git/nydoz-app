import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
// import loadable from "@loadable/component";
// import SoftwareAuthRoute from "../ui/features/products/ProductAuth";
import ClientManagementLayout from "../ui/features/crm/Layout";
import CMRoutes from "./Cm";
import ProductDashboard from "../ui/features/products/ProductDashboard";
const productRoutes = [
    {
        path: "dashboard",
        element: _jsx(ProductDashboard, {}),
    },
    // {
    //     path: "client-management",
    //     element: (
    //         <SoftwareAuthRoute softwareSlug='investment-management'>
    //             <ClientManagementLayout />
    //         </SoftwareAuthRoute>
    //     ),
    //     children: CMRoutes,
    // },
    {
        path: "client-management",
        element: _jsx(ClientManagementLayout, {}),
        children: CMRoutes,
    },
    {
        path: "investment-management",
        element: _jsx(Outlet, {}),
        children: [
            {
                path: "dashboard",
                element: _jsx("h1", { className: "tw-text-3xl tw-text-center", children: "WIP " }),
            },
        ],
    },
];
export default productRoutes;
