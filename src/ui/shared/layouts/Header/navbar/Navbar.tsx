import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarProducts from "./MyProducts";
import useAuthContext from "../../../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import MyAccount from "./MyAccount";

const Navbar = () => {
    const productRef = useRef(null);
    const myAccountRef = useRef(null);
    useOnClickOutside(productRef, () => setShowProducts(false));
    useOnClickOutside(myAccountRef, () => setShowMyAccount(false));

    const { isLoggedIn, dispatch } = useAuthContext();
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [showMyAccount, setShowMyAccount] = useState(false);

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
                        <div ref={productRef} className='p-relative'>
                            <div className='nav-item '>
                                <div
                                    className='d-flex align-items-center   btn btn-info btn-sm '
                                    onClick={() =>
                                        setShowProducts(() => !showProducts)
                                    }>
                                    <i className='ki-outline ki-abstract-26 fs-1 me-3'></i>
                                    <span className='fw-bold fs-7'>
                                        Products
                                    </span>
                                </div>
                            </div>
                            <div>
                                <MyProducts showProduct={showProducts} />
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <li className='nav-item list-style-none'>
                            {isLoggedIn ? (
                                <div ref={myAccountRef} className='p-relative'>
                                    <div className='nav-item '>
                                        <div
                                            className='d-flex align-items-center   nav-link '
                                            onClick={() =>
                                                setShowMyAccount(
                                                    () => !showProducts
                                                )
                                            }>
                                            <span className='fw-bold fs-7'>
                                                My Accounts
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <MyAccount
                                            showProduct={showMyAccount}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <NavLink
                                    className='nav-link fw-bold '
                                    to='/auth/login'>
                                    Login
                                </NavLink>
                            )}
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
