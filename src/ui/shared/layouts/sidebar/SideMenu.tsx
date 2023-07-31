import { NavLink } from "react-router-dom";
import useWebSetting from "../../../../context/useWebSetting";
import { ISidebarMenu } from "../../../../types/app.types";

interface IProps {
    sidebarMenuList: ISidebarMenu[];
}

const ProductSideMenu = (props: IProps) => {
    const { sidebarMenuList } = props;

    const { webSetting } = useWebSetting();
    const { showProductSidebar } = webSetting;

    const sidebarClassName = showProductSidebar ? "slide-in" : "slide-out";

    return (
        <div className={`docs-aside ${sidebarClassName}`}>
            <div className='app-sidebar-primary h-100vh'>
                <div
                    className='d-flex flex-column flex-center fs-12 fw-bolder px-2 mb-5 mt-3'
                    id='kt_app_sidebar_primary_header'>
                    <span className='text-uppercase'>CRM</span>
                </div>
                <div
                    className='app-sidebar-nav flex-grow-1 hover-scroll-overlay-y px-5 pt-2'
                    id='kt_app_sidebar_primary_nav'
                    data-kt-scroll='true'
                    data-kt-scroll-height='auto'
                    data-kt-scroll-dependencies='#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer'
                    data-kt-scroll-wrappers='#kt_app_content, #kt_app_sidebar_primary_nav'
                    data-kt-scroll-offset='5px'>
                    <ul className='nav' role='tablist'>
                        {sidebarMenuList.map((item: ISidebarMenu) => {
                            return (
                                <li
                                    key={item.id}
                                    className='nav-item py-1'
                                    role='presentation'>
                                    <NavLink
                                        data-bs-toggle='tab'
                                        to={item.link}
                                        className='nav-link py-4 px-1 btn'
                                        aria-selected='false'
                                        role='tab'>
                                        <span>{item.icon}</span>

                                        <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                            {item.title}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductSideMenu;
