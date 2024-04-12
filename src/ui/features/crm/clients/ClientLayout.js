import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
const ClientLayout = () => {
    const menubarList = [
        {
            id: 1,
            title: "Clients",
            link: "/crm/clients",
        },
    ];
    return (_jsx("div", { children: _jsx(Outlet, {}) }));
};
export default ClientLayout;
