import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MyAccount = (props) => {
    const { showProduct } = props;
    return (_jsx("div", { className: showProduct
            ? "dropdown-content d-block"
            : "dropdown-content d-none", "data-kt-menu": 'true', "data-popper-placement": 'bottom-end', "data-popper-reference-hidden": '', children: _jsxs("div", { className: 'card', children: [_jsx("img", { style: { height: "200px" }, src: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', className: 'card-img-top', alt: '...' }), _jsxs("div", { className: 'card-body', children: [_jsx("h5", { className: 'card-title', children: "Card title" }), _jsx("h6", { className: 'card-subtitle mb-2 text-muted ', children: "Card subtitle" }), _jsx("p", { className: 'card-text', children: "Some quick example text to build on the card title and make up the bulk of the card's content." }), "b5"] })] }) }));
};
export default MyAccount;
