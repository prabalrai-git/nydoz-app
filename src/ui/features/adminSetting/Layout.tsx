import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";
import { TbLayoutDashboard, TbStatusChange } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import { SiGoogledocs } from "react-icons/si";
import { MdAccountBalance, MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { Tabs } from "antd";
import UserList from "./user/UserList";
import Dashboard from "./Dashboard";
import DocumentList from "../documents/DocumentsList";
import RoleList from "../roles/RoleList";
import StatusList from "./status/StatusList";
import FinancialAccountsList from "./FinancialAccounts/FinancialAccountsList";
import TransactionTypesList from "./transactionTypes/TransactionTypesList";
import SocialLinkList from "../socialLinks/SocialLinkList";
import PaymentMethodsList from "./payments/PaymentMethodsList";

const Layout = () => {
  const navpills: INavPill[] = [
    // {
    //   id: 1,
    //   title: "Dashboard",
    //   link: "dashboard",
    //   icon: <TbLayoutDashboard size={18} className="tw-mr-2 tw-self-center" />,
    //   children: <Dashboard />,
    // },
    {
      id: 2,
      title: "Users",
      link: "users/list",
      icon: <FaUsersLine size={18} className=" tw-self-center" />,
      children: <UserList />,
    },
    {
      id: 3,
      title: "Documents",
      link: "documents",
      icon: <SiGoogledocs size={18} className=" tw-self-center" />,
      children: <DocumentList />,
    },
    {
      id: 4,
      title: "Roles",
      link: "roles",
      icon: (
        <MdOutlineAdminPanelSettings size={18} className=" tw-self-center" />
      ),
      children: <RoleList />,
    },
    {
      id: 5,
      title: "Social Links",
      link: "social-links",
      icon: <IoShareSocialSharp size={18} className=" tw-self-center" />,
      children: <SocialLinkList />,
    },
    {
      id: 6,
      title: "Status",
      link: "statuses/list",
      icon: <TbStatusChange size={18} className=" tw-self-center" />,
      children: <StatusList />,
    },
    {
      id: 7,
      title: "Payment Methods",
      link: "payments/list",
      icon: <RiSecurePaymentFill size={18} className=" tw-self-center" />,
      children: <PaymentMethodsList />,
    },
    {
      id: 8,
      title: "Financial Accounts",
      link: "financialAccounts/list",
      icon: <MdAccountBalance size={18} className=" tw-self-center" />,
      children: <FinancialAccountsList />,
    },
    {
      id: 9,
      title: "Transaction Types",
      link: "transactionTypes/list",
      icon: <GrMoney size={18} className=" tw-self-center" />,
      children: <TransactionTypesList />,
    },
  ];
  return (
    <div className="tw-mt-10">
      <div className="tw-bg-white tw-border-[1px] tw-border-gray-200   tw-pl-4  tw-rounded-lg tw-mb-2  ">
        {/* <NavPills navpills={navpills} /> */}

        <Tabs
          // type="card"
          className="tw-py-2"
          defaultActiveKey="2"
          items={navpills.map((item) => {
            return {
              key: item.id,
              label: item.title,
              children: item.children,
              icon: item.icon,
            };
          })}
        />
      </div>
      {/* <BreadcrumbAndBack /> */}
      {/* <Outlet /> */}
    </div>
  );
};

export default Layout;
