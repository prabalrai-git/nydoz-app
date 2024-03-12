import { Outlet } from "react-router-dom";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
import { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    // Redirect to '/login' without any transition using the browser API
    window.location.href = "/";
  }, []);

  return (
    <div>
      {/* <PublicNavbar /> */}
      <WorkSpaceNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
