import { Link } from "react-router-dom";
import Images from "../../../../constants/Images";

const Header = () => {
    return (
        <nav className='navbar navbar-expand-sm text-white bg-primary h-60px'>
            <div className='container'>
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
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse ' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link active text-white'
                                aria-current='page'
                                to='support'>
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
