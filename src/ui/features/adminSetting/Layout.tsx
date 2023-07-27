import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";

const Layout = () => {
    const navpills: INavPill[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
        },
        {
            id: 2,
            title: "Users",
            link: "user-list",
        },
        {
            id: 3,
            title: "Documents",
            link: "documents",
        },
        {
            id: 4,
            title: "Roles",
            link: "roles",
        },
        {
            id: 5,
            title: "Social Links",
            link: "social-links",
        },
    ];
    return (
        <div>
            <NavPills navpills={navpills} />
            <Outlet />
        </div>
    );
};

export default Layout;
