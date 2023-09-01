import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useWebSetting from "../context/useWebSetting";

// public Routes
import App from "../App";
import AuthLayout from "../ui/features/auth/Layout";
import MainLayout from "../ui/features/home/MainLayout";
import LandingHomePage from "../ui/features/home/Home";

import AuthRoutes from "./auth";
import PageNotFound from "../ui/features/utils/PageNotFound";
import WorkspaceLayout from "../ui/features/workspace/WorkspaceLayout";
import WorkspaceRoutes from "./workspace.route";
// company
import CompanyLayout from "../ui/features/company/Layout";
import CompanyRoutes from "./Company";

const MainRouter = createBrowserRouter([
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

const CompanyRouter = createBrowserRouter([
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
                path: ":companySubdomian",
                element: <CompanyLayout />,
                children: CompanyRoutes,
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

const Routes = () => {
    const { webSetting } = useWebSetting();
    const { urlData } = webSetting;
    console.log("urlData in routes", urlData);

    return (
        <RouterProvider
            router={urlData.hasSubdomain ? CompanyRouter : MainRouter}
        />
    );
};

export default Routes;
