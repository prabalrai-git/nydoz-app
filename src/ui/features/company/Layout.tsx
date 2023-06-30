import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/layouts/sidebar/Sidebar";

const Layout = () => {
    return (
        <div>
            <Sidebar />
            <div className='doc-content bg-light'>
                <div className='container  '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
