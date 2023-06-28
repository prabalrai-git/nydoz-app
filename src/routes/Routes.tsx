import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Auth Routes
import AuthLayout from "../ui/features/auth/Layout";
import Register from "../ui/features/auth/Register";
import LoginPage from "../ui/features/auth/Login";
import ForgetPassword from "../ui/features/auth/ForgetPassword";
import ResetPassword from "../ui/features/auth/ResetPassword";

// public pages
import MainLayout from "../ui/features/home/MainLayout";
import Home from "../ui/features/home/Home";
import ChangePassword from "../ui/features/auth/ChangePassword";
import UserLayout from "../ui/features/user/UserLayout";

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
                        path: "forgot-password",
                        element: <ForgetPassword />,
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword />,
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                ],
            },
            {
                path: "user",
                element: <UserLayout />,
                children: [
                    {
                        path: "",
                        element: <h1>dashboard</h1>,
                    },
                ],
            },
            {
                path: "*",
                element: <h1>Not Found</h1>,
            },
        ],
    },
]);

export default router;
