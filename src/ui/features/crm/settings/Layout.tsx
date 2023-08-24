import { Outlet } from "react-router-dom";
import { IMenubar2 } from "../../../../types/app.types";
import MenubarUp from "../../../shared/layouts/sidebar/MenubarUp";

const Layout = () => {
    const settingsMenubarList: IMenubar2[] = [
        {
            title: "Visiting Purposes",
            link: "visiting-purposes",
        },
        {
            title: "Information Channnels",
            link: "information-channels",
        },
        {
            title: "Visa Types",
            link: "visa-types",
        },
        {
            title: "Client Comments",
            link: "client-comments",
        },
    ];

    return (
        <div>
            <MenubarUp menubarList={settingsMenubarList} />
            <Outlet />
        </div>
    );
};

export default Layout;
