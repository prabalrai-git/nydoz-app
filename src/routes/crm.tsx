import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";
import VisitorList from "../ui/features/crm/visitors/list";
import AddVisitors from "../ui/features/crm/visitors/Add";

// Agents Routes

const AgentLayout = loadable(() => import("../ui/features/agent/AgentLayout"));
const AddAgent = loadable(() => import("../ui/features/agent/AddAgent"));
const AgentList = loadable(() => import("../ui/features/agent/AgentList"));

const Dashboard = loadable(() => import("../ui/features/crm/Dashboard"));

const CrmRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />,
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
        ],
    },
    {
        path: "visitors",
        element: <Outlet />,
        children: [
            {
                path: "list",
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
];

export default CrmRoutes;
