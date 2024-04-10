import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";
import VisitorList from "../ui/features/crm/visitors/List";
import AddVisitors from "../ui/features/crm/visitors/Add";
import View from "../ui/features/crm/enrollments/View";
import AddClient from "../ui/features/crm/clients/AddClient";
import ClientList from "../ui/features/crm/clients/ClientList";
import AgentList2 from "../ui/features/crm/agent/AgentList2";
import ClientLayout from "../ui/features/crm/clients/ClientLayout";
import TransactionList from "../ui/features/crm/transactions/TransactionsList";
import AddTransaction from "../ui/features/crm/transactions/AddTransaction";
import ClientDetails from "../ui/features/crm/clients/ClientDetails";

// Agents Routes
const AgentLayout = loadable(
  () => import("../ui/features/crm/agent/AgentLayout")
);
const AddAgent = loadable(() => import("../ui/features/crm/agent/AddAgent"));
const Dashboard = loadable(() => import("../ui/features/crm/Dashboard"));

// Enrollment Openings Routes
const AddEnrollmentOpenings = loadable(
  () => import("../ui/features/crm/enrollmentOpening/Add")
);
const EnrollmentOpeningsList = loadable(
  () => import("../ui/features/crm/enrollmentOpening/List")
);

//settings Routes
const SettingsLayout = loadable(
  () => import("../ui/features/crm/settings/Layout")
);

const InformationChannelList = loadable(
  () => import("../ui/features/crm/InformationChannel/InformationChannelList")
);
const VisaType = loadable(() => import("../ui/features/visaType/VisaTypeList"));
const VisitingPurposesList = loadable(
  () => import("../ui/features/crm/visitingPurpose/VisitingPurposeList")
);

const CrmRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },

  {
    path: "visitors",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <VisitorList />,
      },
      {
        path: "add",
        element: <AddVisitors />,
      },
      {
        path: "edit",
        element: <AddVisitors />,
      },
    ],
  },
  {
    path: "clients",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <ClientList />,
      },
      {
        path: "add",
        element: <AddClient />,
      },
      {
        path: "edit",
        element: <AddClient />,
      },
      {
        path: ":clientId",
        element: <ClientDetails />,
        // children: [
        //   {
        //     path: "details",
        //     element: <ClientDetails />,
        //   },
        // ],
      },
    ],
  },
  {
    path: "agents",
    element: <AgentLayout />,
    children: [
      {
        path: "",
        element: <AgentList2 />,
      },
      {
        path: "add",
        element: <AddAgent />,
      },
      {
        path: "edit",
        element: <AddAgent />,
      },
    ],
  },
  {
    path: "enrolled-institutes",
    element: <Outlet />,
    children: [
      {
        path: "list",
        element: <EnrollmentList />,
      },
      {
        path: "add",
        element: <AddEnrollment />,
      },
      {
        path: "edit",
        element: <AddEnrollment />,
      },

      {
        path: "view/:institueId",
        element: <Outlet />,
        children: [
          {
            path: "add-enrollments-openings",
            element: <AddEnrollmentOpenings />,
          },
          {
            path: "details",
            element: <View />,
          },
          // {
          //   path: "openings",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       path: "view",
          //       element: <EnrollmentOpeningsList />,
          //     },

          //     {
          //       path: "list",
          //       element: <EnrollmentOpeningsList />,
          //     },
          //     {
          //       path: "add",
          //       element: <AddEnrollmentOpenings />,
          //     },
          //     {
          //       path: "edit",
          //       element: <AddEnrollmentOpenings />,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  {
    path: "transactions",
    element: <Outlet />,
    children: [
      { path: "list", element: <TransactionList /> },
      {
        path: "view",
        element: <h1>view single transaction</h1>,
      },
      { path: "add", element: <AddTransaction /> },
      { path: "edit", element: <AddTransaction /> },
    ],
  },
  {
    path: "settings",
    element: <SettingsLayout />,
    children: [
      {
        path: "visa-types",
        element: <VisaType />,
      },
      {
        path: "information-channels",
        element: <InformationChannelList />,
      },
      {
        path: "visiting-purposes",
        element: <VisitingPurposesList />,
      },
    ],
  },
];

export default CrmRoutes;
