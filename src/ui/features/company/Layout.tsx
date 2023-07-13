import { Outlet } from "react-router-dom";
import ProtectCompany from "../ProtectRoutes/ProtectCompany";

const Layout = () => {
    return (
        <ProtectCompany>
            <Outlet />
        </ProtectCompany>
    );
};

export default Layout;
