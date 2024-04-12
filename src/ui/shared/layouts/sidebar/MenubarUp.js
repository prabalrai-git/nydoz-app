import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const MenubarUp = (props) => {
    const { menubarList } = props;
    return (_jsx("ul", { className: "nav flex-wrap border-transparent fw-bold", children: menubarList.map((item, index) => (_jsx("li", { className: "nav-item my-1", children: _jsx(NavLink, { to: item.link, className: "btn btn-color-dark btn-secondary  fw-bold fs-7 fs-lg-base nav-link px-1 px-lg-8 mx-2 text-uppercase  ", children: item.title }) }, index))) }));
};
export default MenubarUp;
