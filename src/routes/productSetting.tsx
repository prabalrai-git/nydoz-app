import { RouteObject } from "react-router-dom";
import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";
import SingleProduct from "../ui/features/productsSetting/SingleProduct";
import BuyProduct from "../ui/features/company/BuyProduct";
import ViewAllProducts from "../ui/features/productsSetting/ViewAllProducts";

const productsSettingRoutes: RouteObject[] = [
    {
        path: "view",
        element: <ViewAllProducts />,
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

export default productsSettingRoutes;
