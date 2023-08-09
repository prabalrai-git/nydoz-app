import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./assets/metronic/css/style.bundle - Copy.css";

import Routes from "./routes/Routes.tsx";
import "./i18n/Lang.tsx";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/auth/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </React.StrictMode>
);
