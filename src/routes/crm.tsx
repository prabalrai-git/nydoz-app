import loadable from "@loadable/component";
import { Outlet, RouteObject } from "react-router-dom";
import EnrollmentList from "../ui/features/crm/enrollments/list";
import AddEnrollment from "../ui/features/crm/enrollments/Add";

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
];

export default CrmRoutes;
