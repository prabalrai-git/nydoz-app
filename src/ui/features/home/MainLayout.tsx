import { Outlet } from "react-router-dom";
import Header2 from "../../shared/layouts/Header/Header2";
// import Header from "../../shared/layouts/Header/Header";

const MainLayout = () => {
    return (
        <div>
            <Header2 />
            {/* <Header /> */}
            <Outlet />
        </div>
    );
};

export default MainLayout;
