import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";
import SingleProduct from "../ui/features/productsSetting/SingleProduct";
import BuyProduct from "../ui/features/company/BuyProduct";
import ViewAllProducts from "../ui/features/productsSetting/ViewAllProducts";
const productsSettingRoutes = [
    {
        path: "view",
        element: _jsx(ViewAllProducts, {}),
    },
    {
        path: "buy",
        element: (_jsxs(ProtectCompanyOwner, { children: [_jsx(BuyProduct, {}), ","] })),
    },
    {
        path: ":productId",
        element: _jsx(SingleProduct, {}),
    },
];
export default productsSettingRoutes;
