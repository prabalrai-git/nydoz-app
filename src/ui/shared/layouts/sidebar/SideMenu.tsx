import { Link, NavLink } from "react-router-dom";
import useWebSetting from "../../../../context/useWebSetting";
import { ISidebarMenu } from "../../../../types/app.types";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";

interface IProps {
  sidebarMenuList: ISidebarMenu[];
  title: string;
  backPath: string;
}

const SideMenu = (props: IProps) => {
  const { sidebarMenuList, title, backPath } = props;
  const { width } = useWindowSize();
  const { webSetting, dispatchWebSetting } = useWebSetting();
  const { showProductSidebar } = webSetting;
  const menuRef = useRef(null);
  const sidebarClassName = showProductSidebar ? "slide-in " : "slide-out ";
  const [opened, setOpened] = useState(true);

  useOnClickOutside(menuRef, () => {
    dispatchWebSetting({
      type: "SET_PRODUCT_SIDEBAR_APP",
      payload: { showProductSidebarApp: true },
    });
  });

  const handleToggleSidebar = () => {
    dispatchWebSetting({
      type: "TOGGLE_PRODUCT_SIDEBAR",
    });
  };

  return (
    <div
      ref={menuRef}
      style={{ width: opened ? 190 : 100 }}
      className={`${
        width > 768 ? "docs-aside" : "docs-aside-sm"
      } ${sidebarClassName} tw-w-1/12 tw-min-h-screen tw-overflow-auto tw-bg-appSideBar tw-fixed tw-top-0 tw-bottom-0 `}
    >
      {/* <div
        onClick={handleToggleSidebar}
        className={
          showProductSidebar
            ? "sidebar_btn sidebar_btn_out"
            : "sidebar_btn sidebar_btn_in"
        }
      >
        {showProductSidebar ? (
          <ArrowBarLeft size={20} />
        ) : (
          <ArrowBarRight size={20} />
        )}
      </div> */}
      <div className="app-sidebar-primary tw-bg-appSideBar h-100vh tw-pb-[150px] ">
        {/* <div
          onClick={() => setOpened((prev) => !prev)}
          className="tw-absolute tw-bottom-[70px] tw-w-full tw-z-50 tw-h-[55px] tw-bg-btnPrimary tw-flex tw-justify-center tw-items-center"
        >
          {opened ? (
            <MdOutlineArrowBackIos color="white" size={30} />
          ) : (
            <MdArrowForwardIos color="white" size={30} />
          )}
        </div> */}
        <div
          className="flex-column flex-center fs-12 fw-bolder  mb-3 mt-2 "
          id="kt_app_sidebar_primary_header"
        >
          <span className="text-uppercase tw-text-md tw-text-center tw-font-mono tw-text-white tw-mb-4 tw-bg-gray-500 tw-w-full tw-py-6 tw-rounded-lg ">
            {title}
          </span>
        </div>
        <div
          className="app-sidebar-nav flex-grow-1 hover-scroll-overlay-y   "
          id="kt_app_sidebar_primary_nav"
          data-kt-scroll="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer"
          data-kt-scroll-wrappers="#kt_app_content, #kt_app_sidebar_primary_nav"
          data-kt-scroll-offset="5px"
        >
          <ul className="nav" role="tablist">
            {sidebarMenuList.map((item: ISidebarMenu) => {
              return (
                <li key={item.id} className=" py-2 " role="presentation">
                  <NavLink
                    data-bs-toggle="tab"
                    to={item.link}
                    className="nav-link -tw-ml-12 py-4  btn  "
                    aria-selected="false"
                    role="tab"
                  >
                    <div className="tw-w-[90px] tw-flex  tw-flex-row  tw-items-center tw-gap-4 ">
                      <span className="tw-self-center">{item.icon}</span>
                      {showProductSidebar && opened && (
                        <span className=" fw-bold">{item.title}</span>
                      )}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Link to={backPath ?? "/"} className="">
            <div className="  tw-border-btnPrimary tw-border-[3px]   tw-mt-6 tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-evenly tw-py-2 tw-rounded-full tw-text-btnPrimary tw-gap-5 hover:tw-shadow-md ">
              {/* <i className="bi bi-arrow-left-square fs-2x  "></i>
              <IoMdExit
                className="tw-transform -tw-scale-x-100"
                size={20}
                color="white"
              /> */}
              <IoChevronBack size={20} />
              <p className="    tw-font-bold tw-text-lg">{opened && "Back"}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
