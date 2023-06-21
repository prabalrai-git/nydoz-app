import "./App.css";
import { Outlet } from "react-router-dom";
import Register from "./UI/pages/auth/Register";
import LoginPage from "./UI/pages/auth/Login";
import ForgetPassword from "./UI/pages/auth/ForgetPassword";

function App() {
    return (
        <div>
            <ForgetPassword />
        </div>
    );
}

export default App;
