import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";
import BreadcrumbAndBack from "../../shared/molecules/BreadcrumbAndBack";

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
        {
            id: 6,
            title: "Payment Methods",
            link: "payments/list",
        },
    ];
    return (
        <div>
            <NavPills navpills={navpills} />
            <BreadcrumbAndBack />
            <Outlet />
        </div>
    );
};

export default Layout;
