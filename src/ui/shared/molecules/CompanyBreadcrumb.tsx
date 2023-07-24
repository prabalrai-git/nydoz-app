import { useNavigate, useLocation } from "react-router-dom";
import { capitalizeText } from "../../../functions/TextMuatations";
import { NavLink } from "react-router-dom";
interface IBreadcrumbProps {
    title: string;
    btnText: string;
    showBreadcrumb?: boolean;
}

const CompanyBreadcrumb = (props: IBreadcrumbProps) => {
    const navigate = useNavigate();
    const { btnText, showBreadcrumb } = props;
    const location = useLocation();
    const pathnames = location.pathname
        .split("/")
        .filter((path) => path !== "");

    return (
        <div className='card-rounded bg-light d-flex flex-stack flex-wrap p-5'>
            <div>
                <ul className='nav flex-wrap border-transparent fw-bold'>
                    <li className='nav-item my-1'>
                        <NavLink
                            className='btn btn-color-gray-600 btn-active-primary btn-active-color-light fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase'
                            to='dashboard'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className='nav-item my-1'>
                        <NavLink
                            className='btn btn-color-gray-600 btn-active-primary btn-active-color-light fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase '
                            to='products'>
                            Products
                        </NavLink>
                    </li>
                    <li className='nav-item my-1'>
                        <NavLink
                            className='btn btn-color-gray-600 btn-active-primary btn-active-color-light fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase'
                            to='account'>
                            Account
                        </NavLink>
                    </li>
                    <li className='nav-item my-1'>
                        <NavLink
                            className='btn btn-color-gray-600 btn-active-primary btn-active-color-light fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-8 mx-1 text-uppercase'
                            to='setting'>
                            setting
                        </NavLink>
                    </li>
                </ul>
                {showBreadcrumb && (
                    <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-2'>
                        {pathnames.map((path, index) => {
                            return (
                                <li
                                    key={index}
                                    className='breadcrumb-item text-muted'>
                                    <div
                                        // to={`/${path}`}
                                        className='text-muted text-hover-primary'>
                                        {capitalizeText(path)}
                                    </div>
                                    {pathnames.length - 1 !== index && (
                                        <span className='bullet bg-gray-400 w-5px h-2px mx-3'></span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <button
                onClick={() => navigate(-1)}
                className='btn btn-flex btn-secondary   fs-7 fw-bold btn-sm'>
                {btnText}
            </button>
        </div>
    );
};

export default CompanyBreadcrumb;
