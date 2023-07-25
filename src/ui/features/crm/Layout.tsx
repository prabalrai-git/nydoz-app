import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";

const CrmLayout = () => {
    const navpills: INavPill[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
        },
        {
            id: 2,
            title: "Enrollment Openings",
            link: "enrollment-openings",
        },
        {
            id: 3,
            title: "Enrolled Institutions",
            link: "enrolled-institutes/list",
        },
        {
            id: 3,
            title: "Visitors",
            link: "visitors",
        },
        {
            id: 3,
            title: "Agents",
            link: "agents",
        },
    ];

    return (
        <div>
            <NavPills navpills={navpills} />
            <Outlet />
        </div>
    );
};

export default CrmLayout;
