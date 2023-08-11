import { Outlet } from "react-router-dom";
import { INavPill } from "../../../types/app.types";
import MenubarUp from "../../shared/layouts/sidebar/MenubarUp";

const Layout = () => {
    const navPills: INavPill[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "view",
        },
        {
            id: 1,
            title: "Client Management",
            link: "cm/dashboard",
        },
    ];

    return (
        <div>
            <MenubarUp menubarList={navPills} />
            <Outlet />
        </div>
    );
};

export default Layout;
