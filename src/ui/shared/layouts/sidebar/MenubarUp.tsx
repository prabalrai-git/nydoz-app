import { NavLink } from "react-router-dom";
import { IMenubar2 } from "../../../../types/app.types";

interface IProps {
  menubarList: IMenubar2[];
}

const MenubarUp = (props: IProps) => {
  const { menubarList } = props;
  return (
    <ul className="nav flex-wrap border-transparent fw-bold">
      {menubarList.map((item: IMenubar2, index) => (
        <li key={index} className="nav-item my-1">
          <NavLink
            to={item.link}
            className="btn btn-color-dark btn-secondary  fw-bold fs-7 fs-lg-base nav-link px-1 px-lg-8 mx-2 text-uppercase  "
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenubarUp;
