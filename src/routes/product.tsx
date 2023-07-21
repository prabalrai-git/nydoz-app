import { RouteObject } from "react-router-dom";
import loadable from "@loadable/component";

const CompanyProductList = loadable(
    () => import("../ui/features/products/CompanyProductList")
);

const SingleProduct = loadable(
    () => import("../ui/features/products/SingleProduct")
);

const ProductRoutes: RouteObject[] = [
    {
        path: "view",
        element: <CompanyProductList />,
    },

    {
        path: ":productId",
        element: <SingleProduct />,
    },
];

export default ProductRoutes;
