import { Link, NavLink } from "react-router-dom";
import useWebSetting from "../../../../context/useWebSetting";
import { ISidebarMenu } from "../../../../types/app.types";
import { useWindowSize } from "usehooks-ts";
import { ArrowBarLeft, ArrowBarRight } from "react-bootstrap-icons";

interface IProps {
    sidebarMenuList: ISidebarMenu[];
    title: string;
    backPath: string;
}

const ProductSideMenu = (props: IProps) => {
    const { sidebarMenuList, title, backPath } = props;
    const { width } = useWindowSize();
    const { webSetting, dispatchWebSetting } = useWebSetting();
    const { showProductSidebar } = webSetting;

    const sidebarClassName = showProductSidebar ? "slide-in" : "slide-out";

    const handleToggleSidebar = () => {
        dispatchWebSetting({
            type: "TOGGLE_PRODUCT_SIDEBAR",
        });
    };

    return (
        <div
            className={`${
                width > 768 ? "docs-aside" : "docs-aside-sm"
            } ${sidebarClassName}`}>
            <div onClick={handleToggleSidebar} className='sidebar_btn'>
                {showProductSidebar ? (
                    <ArrowBarLeft size={20} />
                ) : (
                    <ArrowBarRight size={20} />
                )}
            </div>
            <div className='app-sidebar-primary h-100vh'>
                <div
                    className='d-flex flex-column flex-center fs-12 fw-bolder px-2 mb-3 mt-6'
                    id='kt_app_sidebar_primary_header'>
                    <span className='text-uppercase'>{title}</span>
                </div>
                <div
                    className='app-sidebar-nav flex-grow-1 hover-scroll-overlay-y px-5 pt-2 '
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
                                        {showProductSidebar && (
                                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                                {item.title}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='app-sidebar-footer d-flex flex-column flex-center '>
                        <Link
                            to={"/"}
                            className='btn btn-icon btn-color-gray-400 btn-active-color-primary'>
                            <i className='bi bi-arrow-left-square fs-2x text-warning'></i>
                        </Link>
                        <span className='pt-2 fs-9 fs-lg-7 fw-bold text-gray-400'>
                            Back
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSideMenu;
