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
import PaymentMethodsList from "../ui/features/adminSetting/payments/PaymentMethodsList";
import PaymentLayout from "../ui/features/adminSetting/payments/PaymentLayout";
import AddPaymentMethods from "../ui/features/adminSetting/payments/AddPaymentMethods";
import ViewPaymentMethod from "../ui/features/adminSetting/payments/ViewPaymentMethod";
import StatusLayout from "../ui/features/adminSetting/status/StatusLayout";
import AddStatus from "../ui/features/adminSetting/status/AddStatus";

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
        path: "statuses",
        element: <StatusLayout />,
        children: [
            {
                path: "list",
                element: <StatusLayout />,
            },
            {
                path: "add",
                element: <AddStatus />,
            },
        ],
    },
    {
        path: "visa-types",
        element: <VisaTypeList />,
    },
    {
        path: "payments",
        element: <PaymentLayout />,
        children: [
            {
                path: "list",
                element: <PaymentMethodsList />,
            },
            {
                path: "add",
                element: <AddPaymentMethods />,
            },
            {
                path: "view/:id",
                element: <ViewPaymentMethod />,
            },
        ],
    },
];

export default AdminRoutes;
