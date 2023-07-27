import { NavLink } from "react-router-dom";

interface IProps {
    title: string | undefined;
}

interface ISideMenu {
    id: number;
    title: string;
    link: string;
    icon: JSX.Element;
}
const CompanySidebar = (props: IProps) => {
    const { title } = props;

    const sidebarMenu: ISideMenu[] = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: <i className='ki-outline ki-chart-simple text-dark fs-1'></i>,
        },
        {
            id: 2,
            title: "Services",
            link: "software",
            icon: (
                <i className='ki-outline ki-element-11  text-primary fs-1'></i>
            ),
        },
        {
            id: 2,
            title: "Products",
            link: "products/view",
            icon: <i className='ki-outline ki-handcart text-info fs-1'></i>,
        },
        {
            id: 3,
            title: "My account",
            link: "my-account",
            icon: <i className='ki-outline ki-user text-warning fs-1'></i>,
        },
        {
            id: 4,
            title: "Setting",
            link: "settings",
            icon: <i className='ki-outline ki-chart-line text-danger fs-1'></i>,
        },
    ];

    return (
        <div className='app-sidebar-primary h-100vh'>
            <div
                className='d-flex flex-column flex-center fs-12 fw-bolder px-2 mb-5 mt-3'
                id='kt_app_sidebar_primary_header'>
                <span className='text-uppercase'>{title}</span>
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
                    {sidebarMenu.map((item: ISideMenu) => {
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
    );
};

export default CompanySidebar;
