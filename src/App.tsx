import "./App.css";
import { Outlet } from "react-router-dom";
import Register from "./UI/pages/auth/Register";

function App() {
    return (
        <div>
            <Register />
        </div>
    );
}

export default App;
