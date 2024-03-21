import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./ui/shared/layouts/Footer/Footer";

function App() {
  // return <Outlet />;

  return (
    <div className="app ">
      <div className=" tw-min-h-[75vh]">
        <Outlet />
      </div>

      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
