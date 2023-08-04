import { Outlet } from "react-router-dom";
// import Header2 from "../../shared/layouts/Header/Header2";
// import Header from "../../shared/layouts/Header/Header";
import Navbar from "../../shared/layouts/Header/navbar/Navbar";

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
