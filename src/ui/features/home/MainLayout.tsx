import { Outlet } from "react-router-dom";
import PublicNavbar from "../../shared/layouts/Header/navbar/PublicNavbar";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";

const MainLayout = () => {
    return (
        <div>
            {/* <PublicNavbar /> */}
            <WorkSpaceNavbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
