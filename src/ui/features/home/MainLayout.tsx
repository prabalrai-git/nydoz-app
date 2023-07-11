import { Outlet } from "react-router-dom";
import Header2 from "../../shared/layouts/Header/Header2";

const MainLayout = () => {
    return (
        <div>
            <Header2 />
            <Outlet />
        </div>
    );
};

export default MainLayout;
