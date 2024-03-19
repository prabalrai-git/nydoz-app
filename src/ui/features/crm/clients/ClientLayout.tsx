import { Outlet } from "react-router-dom";
import MenubarUp from "../../../shared/layouts/sidebar/MenubarUp";
import { IMenubar2 } from "../../../../types/app.types";

const ClientLayout = () => {
  const menubarList: IMenubar2[] = [
    {
      id: 1,
      title: "Clients",
      link: "/crm/clients",
    },
  ];
  return (
    <div>
      <MenubarUp menubarList={menubarList} />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
