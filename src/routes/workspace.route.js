import { jsx as _jsx } from "react/jsx-runtime";
import loadable from "@loadable/component";
import CompanyRoutes from "./Company";
const WorkSpaceDashboard = loadable(() => import("../ui/features/workspace/Dashboard"));
const AddCompany = loadable(() => import("../ui/features/company/AddCompany"));
const ChangePassword = loadable(() => import("../ui/features/auth/ForgetPassword"));
const CompanyLayout = loadable(() => import("../ui/features/company/Layout"));
const WorkspaceRoutes = [
    {
        id: "1",
        path: "",
        element: _jsx(WorkSpaceDashboard, {}),
    },
    {
        id: "2",
        path: "create-company",
        element: _jsx(AddCompany, {}),
    },
    {
        id: "3",
        path: "edit-company/:id",
        element: _jsx(AddCompany, {}),
    },
    {
        id: "4",
        path: "change-password",
        element: _jsx(ChangePassword, {}),
    },
    {
        id: "5",
        path: "company",
        element: _jsx(CompanyLayout, {}),
        loader: () => {
            if (!localStorage.getItem("token")) {
                const searchParams = new URLSearchParams(window.location.search);
                const tokenValue = searchParams.get("token");
                localStorage.setItem("token", tokenValue);
                location.reload();
            }
            return null;
        },
        children: CompanyRoutes,
    },
];
export default WorkspaceRoutes;
