import { Outlet } from "react-router-dom";
import Navbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";

const MainLayout = () => {
    return (
        <div>
            {/* <Header2 /> */}
            {/* <Header /> */}
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
