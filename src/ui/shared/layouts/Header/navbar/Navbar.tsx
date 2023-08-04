import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarProducts from "./MyProducts";
import useAuthContext from "../../../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import MyProducts from "./MyProducts";

const Navbar = () => {
    const { isLoggedIn, dispatch } = useAuthContext();
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const location = useLocation();
    const [pathName, setPathName] = useState<string[]>([]);

    useEffect(() => {
        const pathnames = location.pathname
            .split("/")
            .filter((path) => path !== "");
        setPathName(pathnames);
    }, [location.pathname]);

    return (
        <nav className=' navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white'>
            <div className='container'>
                <div className='inner-container'>
                    <div className='left-container'>
                        <NavLink className='navbar-brand' to='/'>
                            Navbar
                        </NavLink>
                        <div className='p-relative'>
                            <button
                                onClick={() =>
                                    setShowProducts(() => !showProducts)
                                }>
                                Products
                            </button>
                            <div>
                                <MyProducts showProduct={showProducts} />
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <li className='nav-item list-style-none'>
                            <NavLink className='nav-link fw-bold fs-7' to='/'>
                                Login
                            </NavLink>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
