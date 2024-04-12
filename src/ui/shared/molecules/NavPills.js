import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const NavPills = (props) => {
    const { navpills } = props;
    const length = navpills.length - 1;
    return (_jsx("ul", { className: " fw-bold  tw-flex tw-justify-start tw-overflow-x-visible tw-gap-2   ", children: navpills.map((navpill, index) => {
            return (_jsx("div", { className: "tw-flex  tw-h-[55px] tw-items-center ", children: _jsx("li", { className: "nav-item tw-mr-2  tw-px-[17px]   ", children: _jsxs(NavLink, { className: " text-active-primary  tw-py-3  tw-flex tw-justify-center tw-text-sm tw-items-center tw-border-[0.5px] tw-border-gray-300 tw-border-b-0 tw-p-3 tw-px-6 tw-rounded-t-lg", to: navpill.link, style: (isActive) => ({
                            color: isActive ? "gray" : "black",
                            backgroundColor: isActive ? "white" : "red",
                        }), children: [navpill.icon, _jsx("p", { className: "tw-self-end", children: navpill.title })] }) }, navpill.id) }));
        }) }));
};
export default NavPills;
