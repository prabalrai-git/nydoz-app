import { Outlet, RouteObject } from "react-router-dom";
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
import TransactionTypesList from "../ui/features/adminSetting/transactionTypes/TransactionTypesList";
import AddTransactionTypes from "../ui/features/adminSetting/transactionTypes/AddTransactionTypes";
import FinancialAccountsList from "../ui/features/adminSetting/FinancialAccounts/FinancialAccountsList";
import AddFinancialAccount from "../ui/features/adminSetting/FinancialAccounts/AddFinancialAccount";
import StatusList from "../ui/features/adminSetting/status/StatusList";

const AdminRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "users",
    element: <Outlet />,
    children: [
      {
        path: "list",
        element: <UserList />,
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
        element: <StatusList />,
      },
      // {
      //   path: "add",
      //   element: <AddStatus />,
      // },
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
  {
    path: "financialAccounts",
    element: <Outlet />,
    children: [
      { path: "list", element: <FinancialAccountsList /> },
      { path: "add", element: <AddFinancialAccount /> },
    ],
  },
  {
    path: "transactionTypes",
    element: <Outlet />,
    children: [
      { path: "list", element: <TransactionTypesList /> },
      { path: "add", element: <AddTransactionTypes /> },
      { path: "view/:id", element: <h1>View transaction by id</h1> },
    ],
  },
];

export default AdminRoutes;
