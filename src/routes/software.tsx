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

import CMRoutes from "./Cm";
import ClientManagementLayout from "../ui/features/crm/Layout";

import SoftwareAuthRoute from "../ui/features/software/SoftwareAuth";

const softwareRoutes: RouteObject[] = [
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
        path: "client-management",
        element: (
            <SoftwareAuthRoute softwareSlug='investment-management'>
                <ClientManagementLayout />
            </SoftwareAuthRoute>
        ),
        children: CMRoutes,
    },
    {
        path: ":productId",
        element: <SingleProduct />,
    },
];

export default softwareRoutes;
