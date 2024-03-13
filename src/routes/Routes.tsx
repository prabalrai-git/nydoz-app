import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import useWebSetting from "../context/useWebSetting";

// public Routes
import App from "../App";
import AuthLayout from "../ui/features/auth/Layout";

import AuthRoutes from "./auth";
import PageNotFound from "../ui/features/utils/PageNotFound";
import WorkspaceLayout from "../ui/features/workspace/WorkspaceLayout";
import WorkspaceRoutes from "./workspace.route";
import loadable from "@loadable/component";
// company
// import CompanyLayout from "../ui/features/company/Layout";
// import CompanyRoutes from "./Company";

const WorkSpaceDashboard = loadable(
  () => import("../ui/features/workspace/Dashboard")
);

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <WorkspaceLayout />,
        children: WorkspaceRoutes,
      },
      // {
      //   path: "workspace",
      //   element: <WorkspaceLayout />,
      //   children: WorkspaceRoutes,
      // },
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

// const CompanyRouter = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 path: "",
//                 element: <MainLayout />,
//                 children: [
//                     {
//                         path: "",
//                         element: <LandingHomePage />,
//                     },
//                 ],
//             },
//             {
//                 path: ":companySubdomian",
//                 element: <CompanyLayout />,
//                 children: CompanyRoutes,
//             },
//             {
//                 path: "auth",
//                 element: <AuthLayout />,
//                 children: AuthRoutes,
//             },

//             {
//                 path: "*",
//                 element: <PageNotFound />,
//             },
//         ],
//     },
// ]);

const Routes = () => {
  // const { webSetting } = useWebSetting();
  // const { urlData } = webSetting;

  return (
    <RouterProvider
      // router={urlData.hasSubdomain ? CompanyRouter : MainRouter}
      router={MainRouter}
    />
  );
};

export default Routes;
