import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  // return <Outlet />;

  return (
    <div className="app ">
      <div className=" tw-min-h-[75vh]">
        <Outlet />
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
