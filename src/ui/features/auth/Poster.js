import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RegisterLogo from "../../../assets/media/svg/RegisterLogo.svg";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";
const Poster = () => {
    return (_jsx("div", { className: 'd-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 bg-gradient-company', children: _jsxs("div", { className: 'd-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100', children: [_jsx("a", { href: '../../demo31/dist/index.html', className: 'mb-0 mb-lg-12', children: _jsx("img", { alt: 'Logo', src: CompanyLogo, className: 'h-60px h-lg-75px' }) }), _jsx("img", { className: 'd-none d-lg-block mx-auto w-275px w-md-50 w-xl-400px mb-10 mb-lg-20', src: RegisterLogo, alt: 'campony' }), _jsx("h1", { className: 'd-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7', children: "Fast, Efficient and Productive" }), _jsxs("div", { className: 'd-none d-lg-block text-white fs-base text-center', children: ["In this kind of post,", _jsx("a", { href: '#', className: 'opacity-75-hover text-warning fw-bold me-1', children: "the blogger" }), "introduces a person they\u2019ve interviewed", _jsx("br", {}), "and provides some background information about", _jsx("a", { href: '#', className: 'opacity-75-hover text-warning fw-bold me-1', children: "the interviewee" }), "and their", _jsx("br", {}), "work following this is a transcript of the interview."] })] }) }));
};
export default Poster;
