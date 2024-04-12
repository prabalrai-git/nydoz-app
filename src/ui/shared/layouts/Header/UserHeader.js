import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Images from "../../../../constants/Images";
import Hamburger from "../../atoms/Hamburger";
function UserNavbar() {
    return (_jsx(Navbar, { expand: 'md', className: 'bg-white min-h-80px shadow shadow-sm fw-bolder navbar-fixed-top ', children: _jsxs(Container, { children: [_jsx(Navbar.Brand, { href: '#home', children: _jsxs("div", { children: [_jsx(Hamburger, {}), _jsx("img", { className: 'navbar-brand-img ', src: Images.CompanyLogo, alt: 'Company Logo' })] }) }), _jsx(Navbar.Toggle, { "aria-controls": 'basic-navbar-nav' }), _jsx(Navbar.Collapse, { id: 'basic-navbar-nav', children: _jsxs(Nav, { className: 'ms-auto', children: [_jsx(Nav.Link, { href: '#home', children: "My Workspace" }), _jsx(Nav.Link, { href: '#link', children: "Link" }), _jsxs(NavDropdown, { title: 'Dropdown', id: 'basic-nav-dropdown', children: [_jsx(NavDropdown.Item, { href: '#action/3.2', children: "Profile" }), _jsx(NavDropdown.Item, { href: '#action/3.3', children: "Setting" }), _jsx(NavDropdown.Divider, {}), _jsx(NavDropdown.Item, { href: '#action/3.4', children: "Logout" })] })] }) })] }) }));
}
export default UserNavbar;
