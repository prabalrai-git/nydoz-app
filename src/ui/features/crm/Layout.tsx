import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";
import ProductSideMenu from "../../shared/layouts/sidebar/SideMenu";

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
            id: 4,
            title: "Visitors",
            link: "visitors",
        },
        {
            id: 5,
            title: "Agents",
            link: "agents",
        },
    ];

    return (
        <div className='d-flex'>
            {/* <NavPills navpills={navpills} /> */}
            <ProductSideMenu />
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
};

export default CrmLayout;
