import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./ui/shared/layouts/Footer/Footer";

function App() {
  return (
    <div className="app ">
      <div className="app-container tw-min-h-[75vh]">
        <Outlet />
      </div>
      <div className="tw-ml-[10%] ">
        <Footer />
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
