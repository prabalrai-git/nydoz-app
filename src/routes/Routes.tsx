import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Auth Routes
import AuthLayout from "../UI/pages/auth/Layout";
import Register from "../UI/pages/auth/Register";
import LoginPage from "../UI/pages/auth/Login";
import ForgetPassword from "../UI/pages/auth/ForgetPassword";

// public pages
import MainLayout from "../UI/pages/home/MainLayout";
import Home from "../UI/pages/home/Home";

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
                        element: <Home />,
                    },
                ],
            },
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "signup",
                        element: <Register />,
                    },
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "forget-password",
                        element: <ForgetPassword />,
                    },
                ],
            },
        ],
    },
]);

export default router;
