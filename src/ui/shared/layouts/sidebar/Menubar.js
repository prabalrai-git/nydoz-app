import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const Menubar = (props) => {
    const { menubarList } = props;
    return (_jsx("ul", { className: 'nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold', children: menubarList.map((item, index) => (_jsx("li", { className: 'nav-item mt-2', children: _jsx(NavLink, { className: 'nav-link  ms-0 me-10 py-5 ', to: item.path, children: item.title }) }, index))) }));
};
export default Menubar;
