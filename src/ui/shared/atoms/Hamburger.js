import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useWebSetting from "../../../context/useWebSetting";
const Hamburger = () => {
    const { dispatchWebSetting } = useWebSetting();
    const handleToggleSidebar = () => {
        dispatchWebSetting({
            type: "TOGGLE_PRODUCT_SIDEBAR",
        });
    };
    return (_jsx("div", { onClick: handleToggleSidebar, className: "btn btn-icon btn-flex btn-active-color-primary", id: "kt_docs_aside_toggle", children: _jsxs("i", { className: "ki-duotone ki-abstract-14 fs-2", children: [_jsx("span", { className: "path1" }), _jsx("span", { className: "path2" })] }) }));
};
export default Hamburger;
