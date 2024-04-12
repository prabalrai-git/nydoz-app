import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from "react-bootstrap";
const LoadingPage = () => {
    return (_jsx("div", { className: 'd-flex align-items-center justify-content-center h-50vh', children: _jsxs("div", { className: 'text-center', children: [_jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' }), _jsx(Spinner, { className: 'mx-2', variant: 'warning', animation: 'grow', size: 'sm' })] }) }));
};
export default LoadingPage;
