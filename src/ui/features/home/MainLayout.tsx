import { Outlet } from "react-router-dom";
import PublicNavbar from "../../shared/layouts/Header/navbar/PublicNavbar";

const MainLayout = () => {
    return (
        <div>
            <PublicNavbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
