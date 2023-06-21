import { createBrowserRouter } from "react-router-dom";

// public Routes
import App from "../App";

//Auth Routes
import AuthLayout from "../UI/pages/auth/Layout";
import Register from "../UI/pages/auth/Register";
import MainLayout from "../UI/pages/home/MainLayout";
import Home from "../UI/pages/home/Home";

interface RouterProps {
    path: string;
    element?: React.ReactNode;
    children?: [];
}

const router = createBrowserRouter([
    {
        path: "/",
        element: ,
        children: [
            {
                path: "",
                element: MainLayout,
                children: {
                    path: "",
                    element: Home,
                },
            },
            {
                path: "auth",
                element: AuthLayout,
                children: [
                    {
                        path: "signup",
                        element: Register,
                    },
                ],
            },
        ],
    },
]);

export default router;
