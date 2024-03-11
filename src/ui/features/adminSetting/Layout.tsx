import { Outlet } from "react-router-dom";
import NavPills from "../../shared/molecules/NavPills";
import { INavPill } from "../../../types/app.types";

const Layout = () => {
  const navpills: INavPill[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      id: 2,
      title: "Users",
      link: "users/list",
    },
    {
      id: 3,
      title: "Documents",
      link: "documents",
    },
    {
      id: 4,
      title: "Roles",
      link: "roles",
    },
    {
      id: 5,
      title: "Social Links",
      link: "social-links",
    },
    {
      id: 6,
      title: "Status",
      link: "statuses/list",
    },
    {
      id: 7,
      title: "Payment Methods",
      link: "payments/list",
    },
    {
      id: 8,
      title: "Financial Accounts",
      link: "financialAccounts/list",
    },
    {
      id: 9,
      title: "Transaction Types",
      link: "transactionTypes/list",
    },
  ];
  return (
    <div>
      <NavPills navpills={navpills} />
      {/* <BreadcrumbAndBack /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
