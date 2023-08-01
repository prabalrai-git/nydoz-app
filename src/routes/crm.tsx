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
        element: <Outlet />,
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
                        path: "view/:id",
                        element: <View />,
                    },
                ],
            },
            {
                path: "enrollment-openings",
                element: <Outlet />,
                children: [
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
];

export default CrmRoutes;
