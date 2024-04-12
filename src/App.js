import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
    return (_jsxs("div", { className: "app ", children: [_jsx("div", { className: " tw-min-h-[75vh]", children: _jsx(Outlet, {}) }), _jsx(ToastContainer, { position: "top-right" })] }));
}
export default App;
