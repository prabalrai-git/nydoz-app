import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BuildingAdd, GearWide, PersonGear } from "react-bootstrap-icons";
import Hamburger from "../../atoms/Hamburger";
import Images from "../../../../constants/Images";
import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import useAuthContext from "../../../../context/auth/useAuthContext";
import useSubdomain from "../../../../hooks/useSubdomain";

const Header2 = () => {
    const urlSubdomain = useSubdomain();

    const { isLoggedIn, dispatch } = useAuthContext();
    const navigate = useNavigate();
    const handleNavigateCreateCompany = () => {
        navigate("/workspace/create-company");
    };

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

    return (
        <Navbar
            id='admin-navbar'
            className='navbar navbar-expand-lg bg-white min-h-80px shadow shadow-sm fw-bolder fixed-top'>
            <div className='container-fluid'>
                <Hamburger />
                <Link to='/' className='navbar-brand'>
                    <img
                        className='navbar-brand-img '
                        src={Images.CompanyLogo}
                        alt='Company Logo'
                    />
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll'
                    aria-controls='navbarScroll'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        {isLoggedIn && (
                            <li className='nav-item'>
                                {urlSubdomain ? (
                                    <Link
                                        to={"/home/sabkura/dashboard"}
                                        className='nav-link fs-7'>
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to={"/workspace"}
                                        className='nav-link fs-7'>
                                        Workspace
                                    </Link>
                                )}
                            </li>
                        )}

                        {/* <li className='nav-item'>
                            <Link
                                to={"/home/products"}
                                className='nav-link fs-7'>
                                Products
                            </Link>
                        </li> */}

                        <li className='nav-item'>
                            <a className='nav-link disabled'>Support</a>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <div className='d-flex align-items-center'>
                            {/* <form role='search'>
                                <input
                                    className='form-control me-2'
                                    type='search'
                                    placeholder='Search'
                                    aria-label='Search'
                                />
                            </form>
                            <div className='menu-item mx-3'>
                                <div className='menu-item-notification-container'>
                                    <span className='menu-item-notification-number'>
                                        05
                                    </span>
                                    <Bell size={20} color='#626060' />
                                </div>
                            </div> */}
                            <div className='menu-profile-container '>
                                {/* <div className='menu-profile-img-container '>
                                    <img
                                        className='profile-avatar'
                                        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                        alt='profile img'
                                    />
                                </div> */}

                                <NavDropdown
                                    title='Account'
                                    id='basic-nav-dropdown'>
                                    <NavDropdown.Item>
                                        <div
                                            className='btn btn-sm btn-primary'
                                            onClick={
                                                handleNavigateCreateCompany
                                            }>
                                            <span>
                                                <BuildingAdd
                                                    size={16}
                                                    color='#ffffff'
                                                />
                                            </span>
                                            <span className='ms-3'>
                                                Create Company
                                            </span>
                                        </div>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        {" "}
                                        <LinkContainer
                                            className='py-1'
                                            to='/workspace'>
                                            <div>
                                                <span className='me-3'>
                                                    <PersonGear
                                                        size={16}
                                                        color='#000000'
                                                    />
                                                </span>
                                                <span>My Account</span>
                                            </div>
                                        </LinkContainer>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
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

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='text-center'>
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
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex align-items-center'>
                            <LinkContainer
                                className='btn btn-primary'
                                to='/auth/login'>
                                <span>Login</span>
                            </LinkContainer>
                        </div>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

export default Header2;

{
    /* <div className='menu-profile-text-container'>
    <div>
        <span className='mx-2'>Jenny Jack</span>
        <CaretDownFill size={14} color=' #C6C4C4' />
    </div>
    <div className='text-success'>Admin</div>
</div>; */
}
