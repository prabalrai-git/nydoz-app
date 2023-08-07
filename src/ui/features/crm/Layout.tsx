import { Outlet } from "react-router-dom";
import { ISidebarMenu } from "../../../types/app.types";
import ProductSideMenu from "../../shared/layouts/sidebar/SideMenu";
import useWebSetting from "../../../context/useWebSetting";
import {
    Buildings,
    Gear,
    House,
    PersonBadge,
    PersonCheck,
    PersonLock,
} from "react-bootstrap-icons";
import { useWindowSize } from "usehooks-ts";

const CrmLayout = () => {
    const { width } = useWindowSize();

    const sidebarMenu: ISidebarMenu[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: <House size={20} />,
        },
        {
            id: 2,
            title: "Visitors",
            link: "visitors",
            icon: <PersonBadge size={20} />,
        },
        {
            id: 3,
            title: "Clients",
            link: "clients",
            icon: <PersonCheck size={20} />,
        },
        {
            id: 4,
            title: "Agents",
            link: "agents",
            icon: <PersonLock size={22} />,
        },
        {
            id: 5,
            title: "Institutions",
            link: "enrolled-institutes/list",
            icon: <Buildings size={20} />,
        },
        {
            id: 6,
            title: "Settings",
            link: "settings",
            icon: <Gear size={22} />,
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
                    showProductSidebar && width > 768
                        ? "doc-content"
                        : "doc-content-sm "
                }>
                <Outlet />
            </div>
        </div>
    );
};

export default CrmLayout;
