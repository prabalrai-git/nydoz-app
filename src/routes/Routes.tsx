import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useWebSetting from "../context/useWebSetting";

// public Routes
import App from "../App";
import AuthLayout from "../ui/features/auth/Layout";
import MainLayout from "../ui/features/home/MainLayout";
import LandingHomePage from "../ui/features/home/Home";
import WorkspaceLayout from "../ui/features/workspace/WorkspaceLayout";
import CompanyLayout from "../ui/features/company/Layout";
import PageNotFound from "../ui/features/utils/PageNotFound";

//routes
import AuthRoutes from "./auth";
import WorkspaceRoutes from "./workspace.route";
import CompanyRoutes from "./Company";

function MainRoutes() {
    const { webSetting } = useWebSetting();
    const { urlData } = webSetting;

    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='' element={<MainLayout />}>
                        <Route path='' element={<LandingHomePage />} />
                    </Route>
                    <Route path='workspace' element={<WorkspaceLayout />}>
                        {WorkspaceRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Route>
                    {urlData?.hasSubdomain && (
                        <Route path='company' element={<CompanyLayout />}>
                            {CompanyRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Route>
                    )}

                    <Route path='auth' element={<AuthLayout />}>
                        {AuthRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Route>
                    <Route path='*' element={<PageNotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default MainRoutes;

// export default router;
