import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import useAuthContext from "../../../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import MyAccount from "./MyAccount";
import Hamburger from "../../../atoms/Hamburger";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { BoxArrowRight, GearWide } from "react-bootstrap-icons";

const Navbar = () => {
    const productRef = useRef(null);
    const myAccountRef = useRef(null);
    useOnClickOutside(productRef, () => setShowProducts(false));
    useOnClickOutside(myAccountRef, () => setShowMyAccount(false));

    const { isLoggedIn } = useAuthContext();
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [showMyAccount, setShowMyAccount] = useState(false);

    const location = useLocation();
    const [pathName, setPathName] = useState<string[]>([]);

    const logoutFn = () => {
        const rememberMeFromLocal = localStorage.getItem("rememberMe");
        if (rememberMeFromLocal) {
            localStorage.removeItem("token");
            localStorage.removeItem("rememberMe");
        } else {
            sessionStorage.removeItem("token");
        }
        navigate("/auth/login");
        dispatch({ type: "LOGOUT" });
    };
    useEffect(() => {
        const pathnames = location.pathname
            .split("/")
            .filter((path) => path !== "");
        setPathName(pathnames);
    }, [location.pathname]);

    return (
        <nav className=' navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white fixed-top'>
            <div className='container-lg'>
                <div className='inner-container'>
                    <div className='left-container'>
                        <Hamburger />
                        <NavLink className='navbar-brand' to='/'>
                            Navbar
                        </NavLink>
                        <div ref={productRef} className='p-relative'>
                            <div className='nav-item '>
                                <div
                                    className='d-flex align-items-center  btn btn-secondary text-primary btn-sm '
                                    onClick={() =>
                                        setShowProducts(() => !showProducts)
                                    }>
                                    <i className='ki-outline ki-abstract-26 fs-1 me-3 text-primary'></i>
                                    <span className='fw-bold fs-7'>
                                        Products & Services{" "}
                                        <i className='fas fa-chevron-down ms-2'></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <MyProducts showProduct={showProducts} />
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        {isLoggedIn ? (
                            <NavDropdown title='My Account' id='nav-dropdown'>
                                <NavDropdown.Item eventKey='4.1'>
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey='4.2'>
                                    <LinkContainer
                                        className='py-1'
                                        to='change-password'>
                                        <div>
                                            <span className='me-3'>
                                                <GearWide
                                                    size={16}
                                                    color='#000000'
                                                />
                                            </span>
                                            <span>Change Password</span>
                                        </div>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <div className='text-center'>
                                        <div
                                            className='btn btn-sm btn-secondary'
                                            onClick={() => logoutFn()}>
                                            <span className='me-3'>Logout</span>
                                            <span>
                                                <BoxArrowRight
                                                    size={16}
                                                    color='#0b0b0b'
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavLink
                                className='nav-link fw-bold '
                                to='/auth/login'>
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
