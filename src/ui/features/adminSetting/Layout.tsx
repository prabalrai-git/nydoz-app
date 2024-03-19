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

const Layout = () => {
  const navpills: INavPill[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "dashboard",
      icon: <TbLayoutDashboard size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 2,
      title: "Users",
      link: "users/list",
      icon: <FaUsersLine size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 3,
      title: "Documents",
      link: "documents",
      icon: <SiGoogledocs size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 4,
      title: "Roles",
      link: "roles",
      icon: (
        <MdOutlineAdminPanelSettings
          size={18}
          className="tw-mr-2 tw-self-center"
        />
      ),
    },
    {
      id: 5,
      title: "Social Links",
      link: "social-links",
      icon: <IoShareSocialSharp size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 6,
      title: "Status",
      link: "statuses/list",
      icon: <TbStatusChange size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 7,
      title: "Payment Methods",
      link: "payments/list",
      icon: (
        <RiSecurePaymentFill size={18} className="tw-mr-2 tw-self-center" />
      ),
    },
    {
      id: 8,
      title: "Financial Accounts",
      link: "financialAccounts/list",
      icon: <MdAccountBalance size={18} className="tw-mr-2 tw-self-center" />,
    },
    {
      id: 9,
      title: "Transaction Types",
      link: "transactionTypes/list",
      icon: <GrMoney size={18} className="tw-mr-2 tw-self-center" />,
    },
  ];
  return (
    <div>
      <div className="tw-bg-white tw-border-[1px] tw-border-gray-200   tw-pl-4  tw-rounded-full tw-mb-10  ">
        <NavPills navpills={navpills} />
      </div>
      {/* <BreadcrumbAndBack /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
