import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./assets/metronic/css/style.bundle - Copy.css";

import router from "./routes/Routes.js";
import "./i18n/Lang.tsx";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
