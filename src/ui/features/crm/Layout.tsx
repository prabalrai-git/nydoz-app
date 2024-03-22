import { Outlet } from "react-router-dom";
import { ISidebarMenu } from "../../../types/app.types";
import {
  Buildings,
  Gear,
  PersonCheck,
  PersonLock,
} from "react-bootstrap-icons";
import { FaMoneyBill1 } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";

//

const CrmLayout = () => {
  const sidebarMenu: ISidebarMenu[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "dashboard",
      // icon: <House size={20} />,
      icon: <MdSpaceDashboard size={18} />,
    },
    {
      id: 2,
      title: "Visitors",
      link: "visitors",
      icon: <BsPersonVcard size={18} />,
      // icon: <PersonBadge size={20} />,
    },
    {
      id: 3,
      title: "Clients",
      link: "clients",
      icon: <PersonCheck size={18} />,
    },
    {
      id: 4,
      title: "Transactions",
      link: "transactions/list",
      icon: <FaMoneyBill1 size={18} />,
    },
    {
      id: 5,
      title: "Agents",
      link: "agents",
      icon: <PersonLock size={18} />,
    },
    {
      id: 6,
      title: "Institutions",
      link: "enrolled-institutes/list",
      icon: <Buildings size={18} />,
    },
    {
      id: 7,
      title: "Settings",
      link: "settings/visiting-purposes",
      icon: <Gear size={18} />,
    },
  ];

  //   <Layout>
  //     <Sider
  //       breakpoint="lg"
  //       collapsedWidth="0"
  //       onBreakpoint={(broken) => {
  //         console.log(broken);
  //       }}
  //       onCollapse={(collapsed, type) => {
  //         console.log(collapsed, type);
  //       }}
  //       className="tw-min-h-[100vh] tw-z-[10000] "
  //     >
  //       <div className="flex-column flex-center fs-12 fw-bolder  tw-mb-7  tw-mx-auto tw-h-[70px] tw-bg-gray-500 ">
  //         <span className="text-uppercase tw-text-xl tw-text-center tw-font-mono tw-text-white  tw-w-full tw-my-auto   ">
  //           Client Management
  //         </span>
  //       </div>
  //       {/*
  //   <ProductSideMenu
  //     title={companyInfo?.subdomain || companySubdomian || ""}
  //     backPath="/"
  //     sidebarMenuList={sidebarMenu}
  //   /> */}
  //       <Menu
  //         theme="dark"
  //         mode="inline"
  //         defaultSelectedKeys={["1"]}
  //         // className="tw-absolute tw-top-0"
  //         items={items}
  //       />
  //     </Sider>
  //     <Layout>
  //       <Outlet />
  //     </Layout>
  //   </Layout>
  // );

  return (
    <div className="d-flex">
      {/* <ProductSideMenu
        title="Client Management"
        backPath="../../dashboard"
        sidebarMenuList={sidebarMenu}
      /> */}

      <div className="ps-2 w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default CrmLayout;
