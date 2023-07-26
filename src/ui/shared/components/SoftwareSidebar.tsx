import { NavLink } from "react-router-dom";

interface ISideMenu {
    id: number;
    title: string;
    link: string;
    icon: JSX.Element;
}
const SoftwareSidebar = () => {
    const sidebarMenu: ISideMenu[] = [
        {
            id: 1,
            title: "CM",
            link: "software/crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
        {
            id: 2,
            title: "CM",
            link: "crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
        {
            id: 3,
            title: "CM",
            link: "crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
        {
            id: 4,
            title: "CM",
            link: "crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
        {
            id: 5,
            title: "CM",
            link: "crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
        {
            id: 6,
            title: "CM",
            link: "crm/dashboard",
            icon: <i className='ki-outline ki-element-11  fs-1'></i>,
        },
    ];

    return (
        <div className='app-sidebar-primary h-100vh bg-white'>
            <div
                className='d-flex flex-column flex-center fs-12 fw-bolder px-2 mb-5 mt-3'
                id='kt_app_sidebar_primary_header'>
                <span className='text-uppercase'>SOFTWARE</span>
            </div>
            <div
                className='app-sidebar-nav flex-grow-1 hover-scroll-overlay-y px-5 pt-2'
                id='kt_app_sidebar_primary_nav'
                data-kt-scroll='true'
                data-kt-scroll-height='auto'
                data-kt-scroll-dependencies='#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer'
                data-kt-scroll-wrappers='#kt_app_content, #kt_app_sidebar_primary_nav'
                data-kt-scroll-offset='5px'>
                <ul
                    className='nav nav-pills nav-pills-custom mb-3'
                    role='tablist'>
                    {sidebarMenu.map((item: ISideMenu) => {
                        return (
                            <li
                                key={item.id}
                                className='nav-item mb-3'
                                role='presentation'>
                                <NavLink
                                    className='nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px  '
                                    data-bs-toggle='pill'
                                    to={item.link}
                                    aria-selected='true'
                                    role='tab'>
                                    <div className='nav-icon'>
                                        {/* <img
                                            alt=''
                                            src='assets/media/svg/brand-logos/bp-2.svg'
                                            className=''
                                        /> */}
                                        {item.icon}
                                    </div>
                                    <span className='nav-text text-gray-600 fw-bold fs-6 lh-1'>
                                        {item.title}
                                    </span>
                                    <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary'></span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* <!--begin::Footer--> */}
            <div
                className='app-sidebar-footer d-flex flex-column flex-center'
                id='kt_app_sidebar_primary_footer'>
                <div className='mb-0'>
                    <button
                        type='button'
                        className='btn btn-icon btn-color-gray-400 btn-active-color-primary'
                        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                        data-kt-menu-overflow='true'
                        data-kt-menu-placement='top-start'>
                        <i className='ki-outline ki-notification-status fs-1'></i>
                    </button>
                    <div
                        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px'
                        data-kt-menu='true'>
                        <div className='menu-item px-3'>
                            <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>
                                Quick Actions
                            </div>
                        </div>

                        <div className='separator mb-3 opacity-75'></div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Ticket
                            </a>
                        </div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Customer
                            </a>
                        </div>

                        <div
                            className='menu-item px-3'
                            data-kt-menu-trigger='hover'
                            data-kt-menu-placement='right-start'>
                            <a href='#' className='menu-link px-3'>
                                <span className='menu-title'>New Group</span>
                                <span className='menu-arrow'></span>
                            </a>

                            <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Admin Group
                                    </a>
                                </div>

                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Staff Group
                                    </a>
                                </div>

                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Member Group
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Contact
                            </a>
                        </div>

                        <div className='separator mt-3 opacity-75'></div>

                        <div className='menu-item px-3'>
                            <div className='menu-content px-3 py-3'>
                                <a
                                    className='btn btn-primary btn-sm px-4'
                                    href='#'>
                                    Generate Reports
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoftwareSidebar;
