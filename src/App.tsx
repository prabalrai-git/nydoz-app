import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <div className='app'>
            <Outlet />
            <ToastContainer position='bottom-left' />
        </div>
    );
}

export default App;
