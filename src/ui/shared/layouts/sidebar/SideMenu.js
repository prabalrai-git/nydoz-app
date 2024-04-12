import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from "react-router-dom";
import useWebSetting from "../../../../context/useWebSetting";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
const SideMenu = (props) => {
    const { sidebarMenuList, title, backPath } = props;
    const { width } = useWindowSize();
    const { webSetting, dispatchWebSetting } = useWebSetting();
    const { showProductSidebar } = webSetting;
    const menuRef = useRef(null);
    const sidebarClassName = showProductSidebar ? "slide-in " : "slide-out ";
    const [opened, setOpened] = useState(true);
    useOnClickOutside(menuRef, () => {
        dispatchWebSetting({
            type: "SET_PRODUCT_SIDEBAR_APP",
            payload: { showProductSidebarApp: true },
        });
    });
    const handleToggleSidebar = () => {
        dispatchWebSetting({
            type: "TOGGLE_PRODUCT_SIDEBAR",
        });
    };
    return (_jsx("div", { ref: menuRef, style: { width: opened ? 190 : 100 }, className: `${width > 768 ? "docs-aside" : "docs-aside-sm"} ${sidebarClassName} tw-w-1/12 tw-min-h-screen tw-overflow-auto tw-bg-appSideBar tw-fixed tw-top-0 tw-bottom-0 `, children: _jsxs("div", { className: "app-sidebar-primary tw-bg-appSideBar h-100vh tw-pb-[150px] ", children: [_jsx("div", { className: "flex-column flex-center fs-12 fw-bolder  mb-3 mt-2 ", id: "kt_app_sidebar_primary_header", children: _jsx("span", { className: "text-uppercase tw-text-md tw-text-center tw-font-mono tw-text-white tw-mb-4 tw-bg-gray-500 tw-w-full tw-py-6 tw-rounded-lg ", children: title }) }), _jsxs("div", { className: "app-sidebar-nav flex-grow-1 hover-scroll-overlay-y   ", id: "kt_app_sidebar_primary_nav", "data-kt-scroll": "true", "data-kt-scroll-height": "auto", "data-kt-scroll-dependencies": "#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer", "data-kt-scroll-wrappers": "#kt_app_content, #kt_app_sidebar_primary_nav", "data-kt-scroll-offset": "5px", children: [_jsx("ul", { className: "nav", role: "tablist", children: sidebarMenuList.map((item) => {
                                return (_jsx("li", { className: " py-2 ", role: "presentation", children: _jsx(NavLink, { "data-bs-toggle": "tab", to: item.link, className: "nav-link -tw-ml-12 py-4  btn  ", "aria-selected": "false", role: "tab", children: _jsxs("div", { className: "tw-w-[90px] tw-flex  tw-flex-row  tw-items-center tw-gap-4 ", children: [_jsx("span", { className: "tw-self-center", children: item.icon }), showProductSidebar && opened && (_jsx("span", { className: " fw-bold", children: item.title }))] }) }) }, item.id));
                            }) }), _jsx(Link, { to: backPath ?? "/", className: "", children: _jsxs("div", { className: "  tw-border-btnPrimary tw-border-[3px]   tw-mt-6 tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-evenly tw-py-2 tw-rounded-full tw-text-btnPrimary tw-gap-5 hover:tw-shadow-md ", children: [_jsx(IoChevronBack, { size: 20 }), _jsx("p", { className: "    tw-font-bold tw-text-lg", children: opened && "Back" })] }) })] })] }) }));
};
export default SideMenu;
