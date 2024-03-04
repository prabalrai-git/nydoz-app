import { NavLink } from "react-router-dom";
import { INavPill } from "../../../types/app.types";
interface IProps {
  navpills: INavPill[];
}

const NavPills = (props: IProps) => {
  const { navpills } = props;
  return (
    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x  fs-5 fw-bold mt-3 tw-mb-10 ">
      {navpills.map((navpill: INavPill) => {
        return (
          <li key={navpill.id} className="nav-item tw-mr-5 ">
            <NavLink
              className="nav-link text-active-primary  py-6  tw-flex tw-justify-center"
              to={navpill.link}
            >
              {navpill.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavPills;
