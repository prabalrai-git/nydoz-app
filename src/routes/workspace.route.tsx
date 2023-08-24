import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import CompanyRoutes from "./Company";

const WorkSpaceDashboard = loadable(
    () => import("../ui/features/workspace/Dashboard")
);
const AddCompany = loadable(() => import("../ui/features/company/AddCompany"));
const ChangePassword = loadable(
    () => import("../ui/features/auth/ForgetPassword")
);
const CompanyLayout = loadable(() => import("../ui/features/company/Layout"));

const WorkspaceRoutes: RouteObject[] = [
    {
        id: "1",
        path: "",
        element: <WorkSpaceDashboard />,
    },
    {
        id: "2",
        path: "create-company",
        element: <AddCompany />,
    },
    {
        id: "3",
        path: "edit-company/:id",
        element: <AddCompany />,
    },
    {
        id: "4",
        path: "change-password",
        element: <ChangePassword />,
    },

    {
        id: "5",
        path: ":companySubdomian",
        element: <CompanyLayout />,
        children: CompanyRoutes,
    },
];

export default WorkspaceRoutes;
