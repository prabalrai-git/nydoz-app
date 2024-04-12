import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Avatar from "../../../../assets/media/avatars/300-1.jpg";
const companyOne = () => {
    return (_jsx("div", { className: 'card mb-5 mb-xxl-8 mt-1', children: _jsx("div", { className: 'card-body pt-9 pb-0', children: _jsxs("div", { className: 'd-flex flex-wrap flex-sm-nowrap', children: [_jsx("div", { className: 'me-7 mb-4', children: _jsxs("div", { className: 'symbol symbol-100px symbol-lg-160px symbol-fixed position-relative', children: [_jsx("img", { src: Avatar, alt: 'image' }), _jsx("div", { className: 'position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px' })] }) }), _jsx("div", { className: 'flex-grow-1', children: _jsxs("div", { className: 'd-flex justify-content-between align-items-start flex-wrap mb-2', children: [_jsxs("div", { className: 'd-flex flex-column', children: [_jsxs("div", { className: 'd-flex align-items-center mb-2', children: [_jsx("a", { href: '#', className: 'text-gray-900 text-hover-primary fs-2 fw-bold me-1', children: "Max Smith" }), _jsx("a", { href: '/', children: _jsx("i", { className: 'ki-outline ki-verify fs-1 text-primary' }) })] }), _jsxs("div", { className: 'd-flex flex-wrap fw-semibold fs-6 mb-4 pe-2', children: [_jsxs("a", { href: '#', className: 'd-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2', children: [_jsx("i", { className: 'ki-outline ki-profile-circle fs-4 me-1' }), "Developer"] }), _jsxs("a", { href: '#', className: 'd-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2', children: [_jsx("i", { className: 'ki-outline ki-geolocation fs-4 me-1' }), "SF, Bay Area"] }), _jsxs("a", { href: '#', className: 'd-flex align-items-center text-gray-400 text-hover-primary mb-2', children: [_jsx("i", { className: 'ki-outline ki-sms fs-4 me-1' }), "max@kt.com"] })] })] }), _jsxs("div", { className: 'd-flex my-4', children: [_jsxs("a", { href: '#', className: 'btn btn-sm btn-light me-2', id: 'kt_user_follow_button', children: [_jsx("i", { className: 'ki-outline ki-check fs-3 d-none' }), _jsx("span", { className: 'indicator-label', children: "Follow" })] }), _jsx(Link, { to: '/company-details/1', className: 'btn btn-sm btn-primary me-3', "data-bs-toggle": 'modal', "data-bs-target": '#kt_modal_offer_a_deal', children: "View Details" }), _jsx("div", { className: 'me-0', children: _jsx("button", { className: 'btn btn-sm btn-icon btn-bg-light btn-active-color-primary', "data-kt-menu-trigger": 'click', "data-kt-menu-placement": 'bottom-end', children: _jsx("i", { className: 'ki-solid ki-dots-horizontal fs-2x me-1' }) }) })] })] }) })] }) }) }));
};
export default companyOne;
