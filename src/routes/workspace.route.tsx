import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import CompanyRoutes from "./Company";

const UserDashboard = loadable(() => import("../ui/features/user/Dashboard"));
const AddCompany = loadable(() => import("../ui/features/company/AddCompany"));
const ChangePassword = loadable(
    () => import("../ui/features/auth/ForgetPassword")
);
const CompanyLayout = loadable(() => import("../ui/features/company/Layout"));

const WorkspaceRoutes: RouteObject[] = [
    {
        id: "w1",
        path: "",
        element: <UserDashboard />,
    },
    {
        id: "w2",
        path: "create-company",
        element: <AddCompany />,
    },
    {
        id: "w3",
        path: "edit-company/:id",
        element: <AddCompany />,
    },
    {
        id: "w4",
        path: "change-password",
        element: <ChangePassword />,
    },

    {
        id: "w5",
        path: ":companySubdomian",
        element: <CompanyLayout />,
        children: CompanyRoutes,
    },
];

export default WorkspaceRoutes;
