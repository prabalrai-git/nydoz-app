import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const CompanySidebar = (props) => {
    const { title } = props;
    const sidebarMenu = [
        {
            id: 1,
            title: "Dashboard",
            link: "dashboard",
            icon: _jsx("i", { className: 'ki-outline ki-chart-simple text-dark fs-1' }),
        },
        {
            id: 2,
            title: "Services",
            link: "software",
            icon: (_jsx("i", { className: 'ki-outline ki-element-11  text-primary fs-1' })),
        },
        {
            id: 2,
            title: "Products",
            link: "products/view",
            icon: _jsx("i", { className: 'ki-outline ki-handcart text-info fs-1' }),
        },
        {
            id: 3,
            title: "My account",
            link: "my-account",
            icon: _jsx("i", { className: 'ki-outline ki-user text-warning fs-1' }),
        },
        {
            id: 4,
            title: "Setting",
            link: "settings",
            icon: _jsx("i", { className: 'ki-outline ki-chart-line text-danger fs-1' }),
        },
    ];
    return (_jsxs("div", { className: 'app-sidebar-primary h-100vh', children: [_jsx("div", { className: 'd-flex flex-column flex-center fs-12 fw-bolder px-2 mb-5 mt-3', id: 'kt_app_sidebar_primary_header', children: _jsx("span", { className: 'text-uppercase', children: title }) }), _jsx("div", { className: 'app-sidebar-nav flex-grow-1 hover-scroll-overlay-y px-5 pt-2', id: 'kt_app_sidebar_primary_nav', "data-kt-scroll": 'true', "data-kt-scroll-height": 'auto', "data-kt-scroll-dependencies": '#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer', "data-kt-scroll-wrappers": '#kt_app_content, #kt_app_sidebar_primary_nav', "data-kt-scroll-offset": '5px', children: _jsx("ul", { className: 'nav', role: 'tablist', children: sidebarMenu.map((item) => {
                        return (_jsx("li", { className: 'nav-item py-1', role: 'presentation', children: _jsxs(NavLink, { "data-bs-toggle": 'tab', to: item.link, className: 'nav-link py-4 px-1 btn', "aria-selected": 'false', role: 'tab', children: [_jsx("span", { children: item.icon }), _jsx("span", { className: 'pt-2 fs-9 fs-lg-7 fw-bold', children: item.title })] }) }, item.id));
                    }) }) })] }));
};
export default CompanySidebar;
