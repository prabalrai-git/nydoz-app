import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";

const Dashboard = loadable(() => import("../ui/features/crm/Dashboard"));

const CrmRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />,
    },
];

export default CrmRoutes;
