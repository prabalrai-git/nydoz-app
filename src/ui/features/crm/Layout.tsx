import { Outlet } from "react-router-dom";
import { ISidebarMenu } from "../../../types/app.types";
import ProductSideMenu from "../../shared/layouts/sidebar/SideMenu";
import useWebSetting from "../../../context/useWebSetting";
import { House } from "react-bootstrap-icons";

const CrmLayout = () => {
    const sidebarMenu: ISidebarMenu[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: <House size={20} />,
        },
        {
            id: 2,
            title: "Enrollment Openings",
            link: "enrollment-openings",
            icon: <i className='bi bi-house'></i>,
        },
        {
            id: 3,
            title: "Enrolled Institutions",
            link: "enrolled-institutes/list",
            icon: <i className='bi bi-house'></i>,
        },
        {
            id: 4,
            title: "Visitors",
            link: "visitors",
            icon: <i className='bi bi-house'></i>,
        },
        {
            id: 5,
            title: "Agents",
            link: "agents",
            icon: <i className='bi bi-house'></i>,
        },
    ];
    const { webSetting } = useWebSetting();
    const { showProductSidebar } = webSetting;

    return (
        <div className='d-flex'>
            {/* <NavPills navpills={navpills} /> */}
            <ProductSideMenu sidebarMenuList={sidebarMenu} />
            <div
                className={
                    showProductSidebar
                        ? "doc-content  "
                        : "doc-content-wide container-fluid"
                }>
                <Outlet />
            </div>
        </div>
    );
};

export default CrmLayout;
