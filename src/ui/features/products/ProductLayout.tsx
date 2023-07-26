import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";

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
            link: "crm",
        },
    ];

    return (
        <div>
            {/* <NavPills navpills={navPills} /> */}
            <Outlet />
        </div>
    );
};

export default Layout;
