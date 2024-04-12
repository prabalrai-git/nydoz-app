import { jsx as _jsx } from "react/jsx-runtime";
import { FaUsersLine } from "react-icons/fa6";
import { SiGoogledocs } from "react-icons/si";
import { MdAccountBalance, MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { Tabs } from "antd";
import UserList from "./user/UserList";
import DocumentList from "../documents/DocumentsList";
import RoleList from "../roles/RoleList";
import FinancialAccountsList from "./FinancialAccounts/FinancialAccountsList";
import TransactionTypesList from "./transactionTypes/TransactionTypesList";
import SocialLinkList from "../socialLinks/SocialLinkList";
import PaymentMethodsList from "./payments/PaymentMethodsList";
const Layout = () => {
    const navpills = [
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
            icon: _jsx(FaUsersLine, { size: 18, className: " tw-self-center" }),
            children: _jsx(UserList, {}),
        },
        {
            id: 3,
            title: "Documents",
            link: "documents",
            icon: _jsx(SiGoogledocs, { size: 18, className: " tw-self-center" }),
            children: _jsx(DocumentList, {}),
        },
        {
            id: 4,
            title: "Roles",
            link: "roles",
            icon: (_jsx(MdOutlineAdminPanelSettings, { size: 18, className: " tw-self-center" })),
            children: _jsx(RoleList, {}),
        },
        {
            id: 5,
            title: "Social Links",
            link: "social-links",
            icon: _jsx(IoShareSocialSharp, { size: 18, className: " tw-self-center" }),
            children: _jsx(SocialLinkList, {}),
        },
        // {
        //   id: 6,
        //   title: "Status",
        //   link: "statuses/list",
        //   icon: <TbStatusChange size={18} className=" tw-self-center" />,
        //   children: <StatusList />,
        // },
        {
            id: 7,
            title: "Payment Methods",
            link: "payments/list",
            icon: _jsx(RiSecurePaymentFill, { size: 18, className: " tw-self-center" }),
            children: _jsx(PaymentMethodsList, {}),
        },
        {
            id: 8,
            title: "Financial Accounts",
            link: "financialAccounts/list",
            icon: _jsx(MdAccountBalance, { size: 18, className: " tw-self-center" }),
            children: _jsx(FinancialAccountsList, {}),
        },
        {
            id: 9,
            title: "Transaction Types",
            link: "transactionTypes/list",
            icon: _jsx(GrMoney, { size: 18, className: " tw-self-center" }),
            children: _jsx(TransactionTypesList, {}),
        },
    ];
    return (_jsx("div", { className: "tw-mt-10", children: _jsx("div", { className: "tw-bg-white tw-border-[1px] tw-border-gray-200   tw-pl-4  tw-rounded-lg tw-mb-2  ", children: _jsx(Tabs
            // type="card"
            , { 
                // type="card"
                className: "tw-py-2 ", tabPosition: "top", defaultActiveKey: "2", items: navpills.map((item) => {
                    return {
                        key: item.id,
                        label: item.title,
                        children: item.children,
                        icon: item.icon,
                    };
                }) }) }) }));
};
export default Layout;
