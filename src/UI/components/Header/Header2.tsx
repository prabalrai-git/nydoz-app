import { Bell, CaretDownFill, ChevronDown } from "react-bootstrap-icons";
import CompanyLogo from "../../../assets/media/nydoz_logo.png";

const Header2 = () => {
    return (
        <nav
            id='admin-navbar'
            className='navbar navbar-expand-lg bg-white min-h-80px'>
            <div className='container'>
                <a className='navbar-brand' href='#'>
                    <img
                        className='navbar-brand-img '
                        src={CompanyLogo}
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
                        <li className='nav-item dropdown'>
                            <a
                                className='nav-link dropdown-toggle'
                                href='#'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'>
                                App
                            </a>
                            <ul className='dropdown-menu'>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        another
                                    </a>
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className='dropdown-divider' />
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link disabled'>Pages</a>
                        </li>
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
                            <div className='menu-profile-img-container mx-3'>
                                <img
                                    className='profile-avatar'
                                    src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
                                    alt='profile img'
                                />
                            </div>
                            <div className='menu-profile-text-container'>
                                <div>
                                    <span className='mx-2'>Jenny Jack</span>
                                    <CaretDownFill size={14} color=' #C6C4C4' />
                                </div>
                                <div className='text-success'>Admin</div>
                            </div>
                        </div>
                        <button className='btn btn-success ms-3'>
                            Create Company
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header2;
