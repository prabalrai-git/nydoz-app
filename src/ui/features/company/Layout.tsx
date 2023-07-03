import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className=' bg-light'>
            <div className='container page-outlet'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
