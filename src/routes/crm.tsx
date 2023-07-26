import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";
import VisitorList from "../ui/features/crm/visitors/list";
import AddVisitors from "../ui/features/crm/visitors/Add";

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
];

export default CrmRoutes;
