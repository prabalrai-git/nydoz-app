import { NavLink } from "react-router-dom";
import { INavPill } from "../../../types/app.types";

interface IProps {
  navpills: INavPill[];
}

const NavPills = (props: IProps) => {
  const { navpills } = props;

  const length = navpills.length - 1;

  return (
    <ul className=" fw-bold  tw-flex tw-justify-start tw-overflow-x-visible tw-gap-2   ">
      {navpills.map((navpill: INavPill, index) => {
        return (
          <div className="tw-flex  tw-h-[55px] tw-items-center ">
            <li key={navpill.id} className="nav-item tw-mr-2  tw-px-[17px]   ">
              <NavLink
                className=" text-active-primary  tw-py-3  tw-flex tw-justify-center tw-text-sm tw-items-center tw-border-[0.5px] tw-border-gray-300 tw-border-b-0 tw-p-3 tw-px-6 tw-rounded-t-lg"
                to={navpill.link}
                style={(isActive) => ({
                  color: isActive ? "gray" : "black",
                  backgroundColor: isActive ? "white" : "red",
                })}
              >
                {navpill.icon}
                {/* <TbLayoutDashboard
                  size={18}
                  className="tw-mr-2 tw-self-center"
                /> */}
                <p className="tw-self-end">{navpill.title}</p>
              </NavLink>
            </li>

            {/* {length > index && (
              // <LiaGreaterThanSolid size={20} className="tw-self-center" />
              <div className="tw-bg-gray-300 tw-h-[28px] tw-w-[1px] tw-self-center tw-mr-2"></div>
            )} */}
          </div>
        );
      })}
    </ul>
  );
};

export default NavPills;
