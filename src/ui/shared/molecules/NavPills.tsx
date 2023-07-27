import { NavLink } from "react-router-dom";
import { INavPill } from "../../../types/app.types";
interface IProps {
    navpills: INavPill[];
}

const NavPills = (props: IProps) => {
    const { navpills } = props;
    return (
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x  fs-5 fw-bold mt-3 '>
            {navpills.map((navpill: INavPill) => {
                return (
                    <li key={navpill.id} className='nav-item '>
                        <NavLink
                            className='nav-link text-active-primary me-3 py-3'
                            to={navpill.link}>
                            {navpill.title}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavPills;
