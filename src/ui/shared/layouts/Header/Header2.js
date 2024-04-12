import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BuildingAdd, GearWide, PersonGear } from "react-bootstrap-icons";
import Hamburger from "../../atoms/Hamburger";
import Images from "../../../../constants/Images";
import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useSubdomain from "../../../../hooks/useSubdomain";
const Header2 = () => {
    const urlSubdomain = useSubdomain();
    const { isLoggedIn, dispatch } = useAuthContext();
    const navigate = useNavigate();
    const handleNavigateCreateCompany = () => {
        navigate("/create-company");
    };
    const logoutFn = () => {
        // const rememberMeFromLocal = localStorage.getItem("rememberMe");
        // if (rememberMeFromLocal) {
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("rememberMe");
        // } else {
        //   sessionStorage.removeItem("token");
        // }
        dispatch({ type: "LOGOUT" });
    };
    return (_jsx(Navbar, { id: "admin-navbar", className: "navbar navbar-expand-lg bg-white min-h-80px shadow shadow-sm fw-bolder fixed-top", children: _jsxs("div", { className: "container-fluid", children: [_jsx(Hamburger, {}), _jsx(Link, { to: "/", className: "navbar-brand", children: _jsx("img", { className: "navbar-brand-img ", src: Images.CompanyLogo, alt: "Company Logo" }) }), _jsx("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarScroll", "aria-controls": "navbarScroll", "aria-expanded": "false", "aria-label": "Toggle navigation", children: _jsx("span", { className: "navbar-toggler-icon" }) }), _jsxs("div", { className: "collapse navbar-collapse", id: "navbarScroll", children: [_jsxs("ul", { className: "navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll", children: [isLoggedIn && (_jsx("li", { className: "nav-item", children: urlSubdomain ? (_jsx(Link, { to: "/home/sabkura/dashboard", className: "nav-link fs-7", children: "Dashboard" })) : (_jsx(Link, { to: "/", className: "nav-link fs-7", children: "Workspace" })) })), _jsx("li", { className: "nav-item", children: _jsx("a", { className: "nav-link disabled", children: "Support" }) })] }), isLoggedIn ? (_jsx("div", { className: "d-flex align-items-center", children: _jsx("div", { className: "menu-profile-container ", children: _jsxs(NavDropdown, { title: "Account", id: "basic-nav-dropdown", children: [_jsx(NavDropdown.Item, { children: _jsxs("div", { className: "btn btn-sm btn-primary", onClick: handleNavigateCreateCompany, children: [_jsx("span", { children: _jsx(BuildingAdd, { size: 16, color: "#ffffff" }) }), _jsx("span", { className: "ms-3", children: "Create Company" })] }) }), _jsxs(NavDropdown.Item, { children: [" ", _jsx(LinkContainer, { className: "py-1", to: "/", children: _jsxs("div", { children: [_jsx("span", { className: "me-3", children: _jsx(PersonGear, { size: 16, color: "#000000" }) }), _jsx("span", { children: "My Account" })] }) })] }), _jsx(NavDropdown.Item, { children: _jsx(LinkContainer, { className: "py-1", to: "change-password", children: _jsxs("div", { children: [_jsx("span", { className: "me-3", children: _jsx(GearWide, { size: 16, color: "#000000" }) }), _jsx("span", { children: "Change Password" })] }) }) }), _jsx(NavDropdown.Divider, {}), _jsx(NavDropdown.Item, { className: "text-center", children: _jsxs("div", { className: "btn btn-sm btn-secondary", onClick: () => logoutFn(), children: [_jsx("span", { className: "me-3", children: "Logout" }), _jsx("span", { children: _jsx(BoxArrowRight, { size: 16, color: "#0b0b0b" }) })] }) })] }) }) })) : (_jsx("div", { className: "d-flex align-items-center", children: _jsx(LinkContainer, { className: "btn btn-primary", to: "/auth/login", children: _jsx("span", { children: "Login" }) }) }))] })] }) }));
};
export default Header2;
{
    /* <div className='menu-profile-text-container'>
      <div>
          <span className='mx-2'>Jenny Jack</span>
          <CaretDownFill size={14} color=' #C6C4C4' />
      </div>
      <div className='text-success'>Admin</div>
  </div>; */
}
