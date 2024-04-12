import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import loadable from "@loadable/component";
const EditCompany = loadable(() => import("../ui/features/company/AddCompany"));
import UserList from "../ui/features/adminSetting/user/UserList";
import DocumentsList from "../ui/features/documents/DocumentsList";
import RoleList from "../ui/features/roles/RoleList";
import SocialLinkList from "../ui/features/socialLinks/SocialLinkList";
import VisaTypeList from "../ui/features/visaType/VisaTypeList";
import Dashboard from "../ui/features/adminSetting/Dashboard";
import PaymentMethodsList from "../ui/features/adminSetting/payments/PaymentMethodsList";
import PaymentLayout from "../ui/features/adminSetting/payments/PaymentLayout";
import ViewPaymentMethod from "../ui/features/adminSetting/payments/ViewPaymentMethod";
import StatusLayout from "../ui/features/adminSetting/status/StatusLayout";
import TransactionTypesList from "../ui/features/adminSetting/transactionTypes/TransactionTypesList";
import FinancialAccountsList from "../ui/features/adminSetting/FinancialAccounts/FinancialAccountsList";
import StatusList from "../ui/features/adminSetting/status/StatusList";
const AdminRoutes = [
    {
        path: "dashboard",
        element: _jsx(Dashboard, {}),
    },
    {
        path: "users",
        element: _jsx(Outlet, {}),
        children: [
            {
                path: "list",
                element: _jsx(UserList, {}),
            },
            // {
            //   path: "add",
            //   element: <AddUser />,
            // },
        ],
    },
    // {
    //   path: "add-user",
    //   element: <AddUser />,
    // },
    {
        path: "edit-company",
        element: _jsx(EditCompany, {}),
    },
    {
        path: "documents",
        element: _jsx(DocumentsList, {}),
    },
    {
        path: "roles",
        element: _jsx(RoleList, {}),
    },
    {
        path: "social-links",
        element: _jsx(SocialLinkList, {}),
    },
    {
        path: "statuses",
        element: _jsx(StatusLayout, {}),
        children: [
            {
                path: "list",
                element: _jsx(StatusList, {}),
            },
            // {
            //   path: "add",
            //   element: <AddStatus />,
            // },
        ],
    },
    {
        path: "visa-types",
        element: _jsx(VisaTypeList, {}),
    },
    {
        path: "payments",
        element: _jsx(PaymentLayout, {}),
        children: [
            {
                path: "list",
                element: _jsx(PaymentMethodsList, {}),
            },
            // {
            //   path: "add",
            //   element: <AddPaymentMethods />,
            // },
            {
                path: "view/:id",
                element: _jsx(ViewPaymentMethod, {}),
            },
        ],
    },
    {
        path: "financialAccounts",
        element: _jsx(Outlet, {}),
        children: [
            { path: "list", element: _jsx(FinancialAccountsList, {}) },
            // { path: "add", element: <AddFinancialAccount /> },
        ],
    },
    {
        path: "transactionTypes",
        element: _jsx(Outlet, {}),
        children: [
            { path: "list", element: _jsx(TransactionTypesList, {}) },
            // { path: "add", element: <AddTransactionTypes /> },
            { path: "view/:id", element: _jsx("h1", { children: "View transaction by id" }) },
        ],
    },
];
export default AdminRoutes;
