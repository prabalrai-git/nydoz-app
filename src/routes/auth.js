import { jsx as _jsx } from "react/jsx-runtime";
// routes
import loadable from "@loadable/component";
const RegisterPage = loadable(() => import("../ui/features/auth/Register"));
const LoginPage = loadable(() => import("../ui/features/auth/Login"));
const ForgetPassword = loadable(() => import("../ui/features/auth/ForgetPassword"));
const ResetPassword = loadable(() => import("../ui/features/auth/ResetPassword"));
const AuthRoutes = [
    {
        path: "login",
        element: _jsx(LoginPage, {}),
    },
    {
        path: "signup",
        element: _jsx(RegisterPage, {}),
    },
    {
        path: "forgot-password",
        element: _jsx(ForgetPassword, {}),
    },
    {
        path: "reset-password",
        element: _jsx(ResetPassword, {}),
    },
];
export default AuthRoutes;
