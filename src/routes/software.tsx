import { RouteObject } from "react-router-dom";

import CrmRoutes from "./crm";
import Layout from "../ui/features/crm/Layout";

const softwareRoutes: RouteObject[] = [
    {
        path: "crm",
        element: <Layout />,
        children: CrmRoutes,
    },
];

export default softwareRoutes;
