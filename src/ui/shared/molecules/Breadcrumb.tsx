import { Link } from "react-router-dom";

interface IBreadcrumbProps {
    parent: string;
    child: string;
    parentLink: string;
}

const Breadcrumb = (props: IBreadcrumbProps) => {
    const { parent, child, parentLink } = props;
    return (
        <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0'>
            <li className='breadcrumb-item text-muted'>
                <Link
                    to={"/account/dashboard"}
                    className='text-muted text-hover-primary'>
                    Dashboard
                </Link>
            </li>

            <li className='breadcrumb-item'>
                <span className='bullet bg-gray-400 w-5px h-2px'></span>
            </li>

            <li className='breadcrumb-item text-muted'>
                <Link to={parentLink} className='text-muted text-hover-primary'>
                    {parent}
                </Link>
            </li>

            <li className='breadcrumb-item'>
                <span className='bullet bg-gray-400 w-5px h-2px'></span>
            </li>

            <li className='breadcrumb-item text-dark'>{child}</li>
        </ul>
    );
};

export default Breadcrumb;
