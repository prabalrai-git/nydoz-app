import { RouteObject } from "react-router-dom";
import loadable from "@loadable/component";

const EditCompany = loadable(() => import("../ui/features/company/AddCompany"));
import UserList from "../ui/features/adminSetting/user/UserList";
import AddUser from "../ui/features/adminSetting/user/AddUser";
import DocumentsList from "../ui/features/documents/DocumentsList";
import RoleList from "../ui/features/roles/RoleList";
import SocialLinkList from "../ui/features/socialLinks/SocialLinkList";
import VisaTypeList from "../ui/features/visaType/VisaTypeList";
import Dashboard from "../ui/features/adminSetting/Dashboard";

const AdminRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "user-list",
        element: <UserList />,
    },
    {
        path: "add-user",
        element: <AddUser />,
    },
    {
        path: "edit-company",
        element: <EditCompany />,
    },
    {
        path: "documents",
        element: <DocumentsList />,
    },
    {
        path: "roles",
        element: <RoleList />,
    },
    {
        path: "social-links",
        element: <SocialLinkList />,
    },
    {
        path: "visa-types",
        element: <VisaTypeList />,
    },
];

export default AdminRoutes;
