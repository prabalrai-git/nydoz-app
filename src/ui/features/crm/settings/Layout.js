import { jsx as _jsx } from "react/jsx-runtime";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa6";
import { Tabs } from "antd";
import VisitingPurposeList from "../visitingPurpose/VisitingPurposeList";
import InformationChannelList from "../InformationChannel/InformationChannelList";
import VisaTypeList from "../../visaType/VisaTypeList";
const Layout = () => {
    const settingsMenubarList = [
        {
            id: 1,
            title: "Visiting Purposes",
            link: "visiting-purposes",
            icon: _jsx(MdOutlineTravelExplore, { size: 18, className: " tw-self-center" }),
            children: _jsx(VisitingPurposeList, {}),
        },
        {
            id: 2,
            title: "Information Channnels",
            link: "information-channels",
            icon: _jsx(IoInformationCircle, { size: 18, className: " tw-self-center" }),
            children: _jsx(InformationChannelList, {}),
        },
        {
            id: 3,
            title: "Visa Types",
            link: "visa-types",
            icon: _jsx(FaCcVisa, { size: 18, className: " tw-self-center" }),
            children: _jsx(VisaTypeList, {}),
        },
        // {
        //     title: "Client Comments",
        //     link: "client-comments",
        // }
    ];
    return (_jsx("div", { children: _jsx("div", { className: "tw-my-8", children: _jsx("div", { className: "tw-bg-white tw-border-[1px] tw-border-gray-200   tw-pl-4  tw-rounded-lg tw-mb-10  ", children: _jsx(Tabs
                // type="card"
                , { 
                    // type="card"
                    className: "tw-py-2", defaultActiveKey: "2", items: settingsMenubarList.map((item) => {
                        return {
                            key: item.id,
                            label: item.title,
                            children: item.children,
                            icon: item.icon,
                        };
                    }) }) }) }) }));
};
export default Layout;
