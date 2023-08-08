import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";
import AuthLayout from "../ui/features/auth/Layout";
import MainLayout from "../ui/features/home/MainLayout";
import LandingHomePage from "../ui/features/home/Home";

import AuthRoutes from "./auth";
import PageNotFound from "../ui/features/utils/PageNotFound";
import WorkspaceLayout from "../ui/features/workspace/WorkspaceLayout";
import WorkspaceRoutes from "./workspace.route";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainLayout />,
                children: [
                    {
                        path: "",
                        element: <LandingHomePage />,
                    },
                ],
            },
            {
                path: "workspace",
                element: <WorkspaceLayout />,
                children: WorkspaceRoutes,
            },
            {
                path: "auth",
                element: <AuthLayout />,
                children: AuthRoutes,
            },

            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

export default router;
