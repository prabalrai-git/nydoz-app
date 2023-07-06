import { Outlet } from "react-router-dom";
import Header2 from "../../shared/layouts/Header/Header2";
import Sidebar from "../../shared/layouts/sidebar/Sidebar";
import UserHeader from "../../shared/layouts/Header/UserHeader";

const UserLayout = () => {
    return (
        <div>
            <Header2 />
            {/* <UserHeader /> */}
            {/* <Sidebar /> */}
            <div className='doc-content'>
                <div className='container  '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
