import { RouteObject } from "react-router-dom";
import loadable from "@loadable/component";
import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";

const CompanyProductList = loadable(
    () => import("../ui/features/products/CompanyProductList")
);

const SingleProduct = loadable(
    () => import("../ui/features/products/SingleProduct")
);

const BuyProduct = loadable(() => import("../ui/features/company/BuyProduct"));

const ProductRoutes: RouteObject[] = [
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
];

export default ProductRoutes;
