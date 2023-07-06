import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className='bg-light'>
            <Outlet />
        </div>
    );
};

export default Layout;
