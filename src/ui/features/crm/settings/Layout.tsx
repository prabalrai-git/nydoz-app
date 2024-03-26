import { INavPill } from "../../../../types/app.types";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa6";
import { Tabs } from "antd";
import VisitingPurposeList from "../visitingPurpose/VisitingPurposeList";
import InformationChannelList from "../InformationChannel/InformationChannelList";
import VisaTypeList from "../../visaType/VisaTypeList";

const Layout = () => {
  const settingsMenubarList: INavPill[] = [
    {
      id: 1,
      title: "Visiting Purposes",
      link: "visiting-purposes",
      icon: <MdOutlineTravelExplore size={18} className=" tw-self-center" />,
      children: <VisitingPurposeList />,
    },
    {
      id: 2,
      title: "Information Channnels",
      link: "information-channels",
      icon: <IoInformationCircle size={18} className=" tw-self-center" />,
      children: <InformationChannelList />,
    },
    {
      id: 3,
      title: "Visa Types",
      link: "visa-types",
      icon: <FaCcVisa size={18} className=" tw-self-center" />,
      children: <VisaTypeList />,
    },
    // {
    //     title: "Client Comments",
    //     link: "client-comments",
    // }
  ];

  return (
    <div>
      <div className="tw-my-8">
        {/* <MenubarUp menubarList={settingsMenubarList} /> */}
        <div className="tw-bg-white tw-border-[1px] tw-border-gray-200   tw-pl-4  tw-rounded-lg tw-mb-10  ">
          {/* <NavPills navpills={settingsMenubarList} /> */}
          <Tabs
            // type="card"
            className="tw-py-2"
            defaultActiveKey="2"
            items={settingsMenubarList.map((item) => {
              return {
                key: item.id,
                label: item.title,
                children: item.children,
                icon: item.icon,
              };
            })}
          />
        </div>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Layout;
