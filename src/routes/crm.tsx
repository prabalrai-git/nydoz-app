import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";
import VisitorList from "../ui/features/crm/visitors/List";
import AddVisitors from "../ui/features/crm/visitors/Add";
import View from "../ui/features/crm/enrollments/View";

// Agents Routes
const AgentLayout = loadable(
    () => import("../ui/features/crm/agent/AgentLayout")
);
const AddAgent = loadable(() => import("../ui/features/crm/agent/AddAgent"));
const AgentList = loadable(() => import("../ui/features/crm/agent/AgentList"));
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
    () => import("../ui/features/crm/InformationChannel/InformationList")
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
        ],
    },
    {
        path: "agents",
        element: <AgentLayout />,
        children: [
            {
                path: "",
                element: <AgentList />,
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
        path: "settings",
        element: <SettingsLayout />,
        children: [
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
                        element: <View />,
                        children: [
                            {
                                path: "openings",
                                element: <Outlet />,
                                children: [
                                    {
                                        path: "view",
                                        element: <EnrollmentOpeningsList />,
                                    },
                                    {
                                        path: "list",
                                        element: <EnrollmentOpeningsList />,
                                    },
                                    {
                                        path: "add",
                                        element: <AddEnrollmentOpenings />,
                                    },
                                    {
                                        path: "edit",
                                        element: <AddEnrollmentOpenings />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
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
