import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function FormHeading({ title, reset, defaultValues, item, }) {
    const handleClear = () => {
        reset(undefined);
    };
    const handleReset = () => {
        reset(defaultValues);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "card-header", children: [_jsx("h3", { className: "card-title", children: title }), item?.id ? (_jsx("div", { className: "card-toolbar", children: _jsx("button", { type: "button", className: "btn btn-light btn-sm", onClick: handleReset, children: "Reset" }) })) : (_jsx("div", { className: "card-toolbar", children: _jsx("button", { onClick: handleClear, type: "button", className: "btn btn-sm btn-light", children: "Clear" }) }))] }) }));
}
export default FormHeading;
