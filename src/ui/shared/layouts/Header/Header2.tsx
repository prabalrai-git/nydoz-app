import { useContext } from "react";
import Images from "../../../../constants/Images";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Bell } from "react-bootstrap-icons";
import { AuthContext } from "../../../../context/AuthContext";
import Hamburger from "../../atoms/Hamburger";
import { Link } from "react-router-dom";

const Header2 = () => {
    const { user, logoutFn } = useContext(AuthContext);
    return (
        <nav
            id='admin-navbar'
            className='navbar navbar-expand-lg bg-white min-h-80px shadow shadow-sm fw-bolder'>
            <div className='container'>
                <a className='navbar-brand' href='#'>
                    <Hamburger />
                    <img
                        className='navbar-brand-img '
                        src={Images.CompanyLogo}
                        alt='Company Logo'
                    />
                </a>
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
                        <li className='nav-item'>
                            <a
                                className='nav-link active'
                                aria-current='page'
                                href='#'>
                                Home
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>
                                Dashboard
                            </a>
                        </li>

                        <NavDropdown title='Products' id='basic-nav-dropdown'>
                            <NavDropdown.Item>
                                <div className='card'>
                                    <div className='card-header'>
                                        <div className='card-title'>
                                            My Apps
                                        </div>
                                        <div className='card-body '>
                                            <div className='mh-450px scroll-y me-n5 pe-5'>
                                                <div className='row g-2'>
                                                    <div className='col-4'>
                                                        <Link
                                                            to='/metronic8/demo1/custom/apps/chat/chat-2'
                                                            className='d-flex flex-column flex-center text-center text-gray-800 text-hover-primary bg-hover-light rounded py-4 px-3 mb-3'>
                                                            <img
                                                                src='/metronic8/demo1/assets/media/svg/brand-logos/amazon.svg'
                                                                className='w-25px h-25px mb-2'
                                                                alt='logo'
                                                            />
                                                            <span className='fw-semibold'>
                                                                AWS
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className='col-4'>
                                                        <Link
                                                            to='/metronic8/demo1/custom/apps/chat/chat-2'
                                                            className='d-flex flex-column flex-center text-center text-gray-800 text-hover-primary bg-hover-light rounded py-4 px-3 mb-3'>
                                                            <img
                                                                src='/metronic8/demo1/assets/media/svg/brand-logos/amazon.svg'
                                                                className='w-25px h-25px mb-2'
                                                                alt='logo'
                                                            />
                                                            <span className='fw-semibold'>
                                                                AWS
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className='col-4'>
                                                        <Link
                                                            to='/metronic8/demo1/custom/apps/chat/chat-2'
                                                            className='d-flex flex-column flex-center text-center text-gray-800 text-hover-primary bg-hover-light rounded py-4 px-3 mb-3'>
                                                            <img
                                                                src='/metronic8/demo1/assets/media/svg/brand-logos/amazon.svg'
                                                                className='w-25px h-25px mb-2'
                                                                alt='logo'
                                                            />
                                                            <span className='fw-semibold'>
                                                                AWS
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <li className='nav-item'>
                            <a className='nav-link disabled'>Support</a>
                        </li>
                    </ul>
                    <div className='d-flex align-items-center'>
                        <form role='search'>
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
                        </div>
                        <div className='menu-profile-container '>
                            <div className='menu-profile-img-container '>
                                <img
                                    className='profile-avatar'
                                    src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                    alt='profile img'
                                />
                            </div>

                            <NavDropdown
                                title='Account'
                                id='basic-nav-dropdown'>
                                <NavDropdown.Item href='#action/3.1'>
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href='#action/3.2'>
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href='#action/3.3'>
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <button
                                        className='btn btn-sm btn-secondary'
                                        onClick={() => logoutFn()}>
                                        Logout
                                    </button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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
