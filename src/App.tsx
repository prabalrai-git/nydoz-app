import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./ui/shared/layouts/Footer/Footer";
import { CrossStorageHub } from "cross-storage";
import { useEffect } from "react";

function App() {
  // return <Outlet />;

  useEffect(() => {
    // CrossStorageHub.init([
    //   // { origin: /\.localhost:5173$/, allow: ["get"] },
    //   {
    //     origin: "http://localhost:5174/",
    //     allow: ["get", "set", "del"],
    //   },
    //   {
    //     origin: /http:\/\/([^.]+)\.localhost:5174\/.*$/,
    //     allow: ["get"],
    //   },
    //   {
    //     origin: "http://newcompany.localhost:5174/company/dashboard",
    //     allow: ["get", "set", "del"],
    //   },

    // ]);
    CrossStorageHub.init([
      // { origin: /\.localhost:5173$/, allow: ["get"] },
      {
        origin: /localhost:5174$/,
        allow: ["get", "set", "del", "getKeys", "clear"],
      },
    ]);
    console.log("hub ran");
  }, []);

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
