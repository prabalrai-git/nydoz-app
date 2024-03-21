import { Outlet } from "react-router-dom";
import { INavPill } from "../../../../types/app.types";
import NavPills from "../../../shared/molecules/NavPills";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa6";

const Layout = () => {
  const settingsMenubarList: INavPill[] = [
    {
      id: 1,
      title: "Visiting Purposes",
      link: "visiting-purposes",
      icon: (
        <MdOutlineTravelExplore size={18} className="tw-mr-2 tw-self-center" />
      ),
    },
    {
      id: 2,
      title: "Information Channnels",
      link: "information-channels",
      icon: (
        <IoInformationCircle size={18} className="tw-mr-2 tw-self-center" />
      ),
    },
    {
      id: 3,
      title: "Visa Types",
      link: "visa-types",
      icon: <FaCcVisa size={18} className="tw-mr-2 tw-self-center" />,
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
          <NavPills navpills={settingsMenubarList} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
