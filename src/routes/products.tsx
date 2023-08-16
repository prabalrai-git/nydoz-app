import { RouteObject } from "react-router-dom";
// import loadable from "@loadable/component";

// import SoftwareAuthRoute from "../ui/features/products/ProductAuth";
import ClientManagementLayout from "../ui/features/crm/Layout";

import CMRoutes from "./Cm";
import ProductDashboard from "../ui/features/products/ProductDashboard";

const productRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <ProductDashboard />,
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
        element: <ClientManagementLayout />,
        children: CMRoutes,
    },
];

export default productRoutes;
