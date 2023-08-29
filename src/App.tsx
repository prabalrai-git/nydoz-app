import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./ui/shared/layouts/Footer/Footer";

function App() {
    return (
        <div className='app'>
            <div className='app-container'>
                <Outlet />
            </div>
            <ToastContainer position='bottom-left' />
            <Footer />
        </div>
    );
}

export default App;
