import { useNavigate, useLocation } from "react-router-dom";
import { capitalizeText } from "../../../functions/TextMuatations";
interface IBreadcrumbProps {
    title: string;
    btnText: string;
    showBreadcrumb?: boolean;
}

const CompanyBreadcrumb = (props: IBreadcrumbProps) => {
    const navigate = useNavigate();
    const { btnText, showBreadcrumb, title } = props;
    const location = useLocation();
    const pathnames = location.pathname
        .split("/")
        .filter((path) => path !== "");

    return (
        <div className='app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100 my-3 px-2 '>
            <div className='page-title d-flex flex-column justify-content-center gap-1 me-3'>
                <h1 className='page-heading d-flex flex-column justify-content-center  fw-bold fs-3 m-0 text-primary '>
                    {title}
                </h1>
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

            {btnText && (
                <div className='d-flex align-items-center gap-2 gap-lg-3'>
                    <button
                        onClick={() => navigate(-1)}
                        className='btn btn-flex btn-secondary  fs-7 fw-bold btn-sm'>
                        {btnText}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompanyBreadcrumb;
