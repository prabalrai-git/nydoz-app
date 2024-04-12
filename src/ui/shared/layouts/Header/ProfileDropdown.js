import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ProfileDropdown = () => {
    return (_jsxs("div", { className: 'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show', "data-kt-menu": 'true', style: {
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: "0px",
            transform: "translate3d(-139.5px, 79px, 0px)",
            zIndex: 108,
        }, "data-popper-placement": 'bottom-end', children: [_jsx("div", { className: 'menu-item px-3', children: _jsxs("div", { className: 'menu-content d-flex align-items-center px-3', children: [_jsx("div", { className: 'symbol symbol-50px me-5', children: _jsx("img", { alt: 'Logo', src: 'assets/media/avatars/300-1.jpg' }) }), _jsxs("div", { className: 'd-flex flex-column', children: [_jsxs("div", { className: 'fw-bold d-flex align-items-center fs-5', children: ["Max Smith", _jsx("span", { className: 'badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2', children: "Pro" })] }), _jsx("a", { href: '#', className: 'fw-semibold text-muted text-hover-primary fs-7', children: "max@kt.com" })] })] }) }), _jsx("div", { className: 'separator my-2' }), _jsx("div", { className: 'menu-item px-5', children: _jsx("a", { href: '../../demo31/dist/account/overview.html', className: 'menu-link px-5', children: "My Profile" }) }), _jsx("div", { className: 'separator my-2' }), _jsx("div", { className: 'menu-item px-5', children: _jsx("a", { href: '../../demo31/dist/authentication/layouts/corporate/sign-in.html', className: 'menu-link px-5', children: "Sign Out" }) })] }));
};
export default ProfileDropdown;
