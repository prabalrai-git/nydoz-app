import { RouteObject } from "react-router-dom";

import CompanyWorkSpace from "../ui/features/companyWorkspace/CompanyWorkSpace";

const CompanyWorkspaceRoutes: RouteObject[] = [
    {
        id: "1",
        path: "",
        element: <CompanyWorkSpace />,
    },
];

export default CompanyWorkspaceRoutes;
