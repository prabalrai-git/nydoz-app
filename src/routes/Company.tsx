import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import ProductRoutes from "./product";
import ProtectCompanyOwner from "../ui/features/protectRoute/OnlyCompanyOwnerRoute";
import ProfileLayout from "../ui/features/company/ProfileLayout";

// routes
const EditCompany = loadable(() => import("../ui/features/company/AddCompany"));

const CompanyDashboard = loadable(
    () => import("../ui/features/company/CompanyDashboard")
);

const ProductLayout = loadable(
    () => import("../ui/features/products/ProductLayout")
);

const DocumentsList = loadable(
    () => import("../ui/features/documents/DocumentsList")
);

const RoleList = loadable(() => import("../ui/features/roles/RoleList"));
const SocialLinkList = loadable(
    () => import("../ui/features/socialLinks/SocialLinkList")
);

const VisaTypeList = loadable(
    () => import("../ui/features/visaType/VisaTypeList")
);

const CompanyRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <CompanyDashboard />,
    },
    {
        path: "edit",
        element: (
            <ProtectCompanyOwner>
                <EditCompany />
            </ProtectCompanyOwner>
        ),
    },
    {
        path: "documents",
        element: (
            <ProtectCompanyOwner>
                <DocumentsList />
            </ProtectCompanyOwner>
        ),
    },
    {
        path: "profile/:id",
        element: <ProfileLayout />,
    },
    {
        path: "products",
        element: <ProductLayout />,
        children: ProductRoutes,
    },
    {
        path: "roles",
        element: (
            <ProtectCompanyOwner>
                <RoleList />
            </ProtectCompanyOwner>
        ),
    },
    {
        path: "social-links",
        element: (
            <ProtectCompanyOwner>
                <SocialLinkList />
            </ProtectCompanyOwner>
        ),
    },
    {
        path: "visa-types",
        element: (
            <ProtectCompanyOwner>
                <VisaTypeList />
            </ProtectCompanyOwner>
        ),
    },
];

export default CompanyRoutes;
