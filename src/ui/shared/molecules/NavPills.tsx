import { NavLink } from "react-router-dom";
import { INavPill } from "../../../types/app.types";
interface IProps {
  navpills: INavPill[];
}

const NavPills = (props: IProps) => {
  const { navpills } = props;

  const length = navpills.length - 1;
  return (
    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x  fs-5 fw-bold mt-3 tw-mb-10 tw-flex tw-justify-start tw-overflow-x-visible ">
      {navpills.map((navpill: INavPill, index) => {
        return (
          <div className="tw-flex tw-gap-5">
            <li key={navpill.id} className="nav-item tw-mr-5    ">
              <NavLink
                className="nav-link  text-active-primary  py-4  tw-flex tw-justify-center "
                to={navpill.link}
              >
                {navpill.title}
              </NavLink>
            </li>

            {length > index && (
              <div className="tw-bg-gray-300 tw-h-[28px] tw-w-[1px] tw-self-center tw-mr-4"></div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default NavPills;
