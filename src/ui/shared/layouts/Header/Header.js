import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Images from "../../../../constants/Images";
const Header = () => {
    return (_jsx("nav", { className: 'navbar navbar-expand-sm text-white bg-primary h-60px', children: _jsxs("div", { className: 'container', children: [_jsx(Link, { to: '/', className: 'navbar-brand', children: _jsx("img", { className: 'navbar-brand-img ', src: Images.CompanyLogo, alt: 'Company Logo' }) }), _jsx("button", { className: 'navbar-toggler', type: 'button', "data-bs-toggle": 'collapse', "data-bs-target": '#navbarNav', "aria-controls": 'navbarNav', "aria-expanded": 'false', "aria-label": 'Toggle navigation', children: _jsx("span", { className: 'navbar-toggler-icon' }) }), _jsx("div", { className: 'collapse navbar-collapse ', id: 'navbarNav', children: _jsx("ul", { className: 'navbar-nav ms-auto', children: _jsx("li", { className: 'nav-item', children: _jsx(Link, { className: 'nav-link active text-white', "aria-current": 'page', to: 'support', children: "Support" }) }) }) })] }) }));
};
export default Header;
