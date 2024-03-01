import { Outlet } from "react-router-dom";
import { ISidebarMenu } from "../../../types/app.types";
import ProductSideMenu from "../../shared/layouts/sidebar/SideMenu";
import {
  Buildings,
  Gear,
  House,
  PersonBadge,
  PersonCheck,
  PersonLock,
} from "react-bootstrap-icons";
import { FaMoneyBill1 } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { BsPersonVcard, BsPersonVcardFill } from "react-icons/bs";

const CrmLayout = () => {
  const sidebarMenu: ISidebarMenu[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "dashboard",
      // icon: <House size={20} />,
      icon: <MdSpaceDashboard size={24} />,
    },
    {
      id: 2,
      title: "Visitors",
      link: "visitors",
      icon: <BsPersonVcard size={22} />,
      // icon: <PersonBadge size={20} />,
    },
    {
      id: 3,
      title: "Clients",
      link: "clients",
      icon: <PersonCheck size={23} />,
    },
    {
      id: 4,
      title: "Transactions",
      link: "transactions",
      icon: <FaMoneyBill1 size={20} />,
    },
    {
      id: 5,
      title: "Agents",
      link: "agents",
      icon: <PersonLock size={22} />,
    },
    {
      id: 6,
      title: "Institutions",
      link: "enrolled-institutes/list",
      icon: <Buildings size={20} />,
    },
    {
      id: 7,
      title: "Settings",
      link: "settings/visiting-purposes",
      icon: <Gear size={22} />,
    },
  ];

  return (
    <div className="d-flex">
      <ProductSideMenu
        title="Client Management"
        backPath="../../dashboard"
        sidebarMenuList={sidebarMenu}
      />
      <div className="ps-2 w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default CrmLayout;
