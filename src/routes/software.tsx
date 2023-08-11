import { RouteObject } from "react-router-dom";

import CMRoutes from "./Cm";
import Layout from "../ui/features/crm/Layout";

const softwareRoutes: RouteObject[] = [
    {
        path: "cm",
        element: <Layout softwareName='client-management' />,
        children: CMRoutes,
    },
];

export default softwareRoutes;
