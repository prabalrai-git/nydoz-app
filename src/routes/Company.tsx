import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import ProductRoutes from "./product";

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
        path: "products",
        element: <ProductLayout />,
        children: ProductRoutes,
    },
];

export default CompanyRoutes;
