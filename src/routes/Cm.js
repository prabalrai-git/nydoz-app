import { jsx as _jsx } from "react/jsx-runtime";
import loadable from "@loadable/component";
import { Outlet } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";
import VisitorList from "../ui/features/crm/visitors/List";
import AddVisitors from "../ui/features/crm/visitors/Add";
import View from "../ui/features/crm/enrollments/View";
import AddClient from "../ui/features/crm/clients/AddClient";
import ClientList from "../ui/features/crm/clients/ClientList";
import AgentList2 from "../ui/features/crm/agent/AgentList2";
import TransactionList from "../ui/features/crm/transactions/TransactionsList";
import AddTransaction from "../ui/features/crm/transactions/AddTransaction";
import ClientDetails from "../ui/features/crm/clients/ClientDetails";
// Agents Routes
const AgentLayout = loadable(() => import("../ui/features/crm/agent/AgentLayout"));
const AddAgent = loadable(() => import("../ui/features/crm/agent/AddAgent"));
const Dashboard = loadable(() => import("../ui/features/crm/Dashboard"));
// Enrollment Openings Routes
const AddEnrollmentOpenings = loadable(() => import("../ui/features/crm/enrollmentOpening/Add"));
const EnrollmentOpeningsList = loadable(() => import("../ui/features/crm/enrollmentOpening/List"));
//settings Routes
const SettingsLayout = loadable(() => import("../ui/features/crm/settings/Layout"));
const InformationChannelList = loadable(() => import("../ui/features/crm/InformationChannel/InformationChannelList"));
const VisaType = loadable(() => import("../ui/features/visaType/VisaTypeList"));
const VisitingPurposesList = loadable(() => import("../ui/features/crm/visitingPurpose/VisitingPurposeList"));
const CrmRoutes = [
    {
        path: "dashboard",
        element: _jsx(Dashboard, {}),
    },
    {
        path: "visitors",
        element: _jsx(Outlet, {}),
        children: [
            {
                path: "",
                element: _jsx(VisitorList, {}),
            },
            {
                path: "add",
                element: _jsx(AddVisitors, {}),
            },
            {
                path: "edit",
                element: _jsx(AddVisitors, {}),
            },
        ],
    },
    {
        path: "clients",
        element: _jsx(Outlet, {}),
        children: [
            {
                path: "",
                element: _jsx(ClientList, {}),
            },
            {
                path: "add",
                element: _jsx(AddClient, {}),
            },
            {
                path: "edit",
                element: _jsx(AddClient, {}),
            },
            {
                path: ":clientId",
                element: _jsx(ClientDetails, {}),
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
        element: _jsx(AgentLayout, {}),
        children: [
            {
                path: "",
                element: _jsx(AgentList2, {}),
            },
            {
                path: "add",
                element: _jsx(AddAgent, {}),
            },
            {
                path: "edit",
                element: _jsx(AddAgent, {}),
            },
        ],
    },
    {
        path: "enrolled-institutes",
        element: _jsx(Outlet, {}),
        children: [
            {
                path: "list",
                element: _jsx(EnrollmentList, {}),
            },
            {
                path: "add",
                element: _jsx(AddEnrollment, {}),
            },
            {
                path: "edit",
                element: _jsx(AddEnrollment, {}),
            },
            {
                path: "view/:institueId",
                element: _jsx(Outlet, {}),
                children: [
                    {
                        path: "add-enrollments-openings",
                        element: _jsx(AddEnrollmentOpenings, {}),
                    },
                    {
                        path: "edit-enrollments-openings",
                        element: _jsx(AddEnrollmentOpenings, {}),
                    },
                    {
                        path: "details",
                        element: _jsx(View, {}),
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
        element: _jsx(Outlet, {}),
        children: [
            { path: "list", element: _jsx(TransactionList, {}) },
            {
                path: "view",
                element: _jsx("h1", { children: "view single transaction" }),
            },
            { path: "add", element: _jsx(AddTransaction, {}) },
            { path: "edit", element: _jsx(AddTransaction, {}) },
        ],
    },
    {
        path: "settings",
        element: _jsx(SettingsLayout, {}),
        children: [
            {
                path: "visa-types",
                element: _jsx(VisaType, {}),
            },
            {
                path: "information-channels",
                element: _jsx(InformationChannelList, {}),
            },
            {
                path: "visiting-purposes",
                element: _jsx(VisitingPurposesList, {}),
            },
        ],
    },
];
export default CrmRoutes;
