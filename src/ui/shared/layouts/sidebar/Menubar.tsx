import { NavLink } from "react-router-dom";
import { IMenubar } from "../../../../types/app.types";

interface IProps {
    menubarList: IMenubar[];
}

const Menubar = (props: IProps) => {
    const { menubarList } = props;
    return (
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
            {menubarList.map((item: IMenubar, index) => (
                <li key={index} className='nav-item mt-2'>
                    <NavLink
                        className='nav-link  ms-0 me-10 py-5 '
                        to={item.path}>
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Menubar;
