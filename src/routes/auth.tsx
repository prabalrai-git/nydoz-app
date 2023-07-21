// routes
import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
const RegisterPage = loadable(() => import("../ui/features/auth/Register"));
const LoginPage = loadable(() => import("../ui/features/auth/Login"));
const ForgetPassword = loadable(
    () => import("../ui/features/auth/ForgetPassword")
);
const ResetPassword = loadable(
    () => import("../ui/features/auth/ResetPassword")
);
const AuthRoutes: RouteObject[] = [
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "forgot-password",
        element: <ForgetPassword />,
    },
    {
        path: "reset-password",
        element: <ResetPassword />,
    },
];

export default AuthRoutes;
