import { Link } from "react-router-dom";

const Breadcrumb = () => {
    return (
        <div className='app-container bg-white py-3 shadow shadow-sm  container-xxl d-flex flex-stack'>
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3 '>
                <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                    Home
                </h1>

                <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
                    <li className='breadcrumb-item text-muted'>
                        <a
                            href='/metronic8/demo1/../demo1/index.html'
                            className='text-muted text-hover-primary'>
                            Home{" "}
                        </a>
                    </li>

                    <li className='breadcrumb-item'>
                        <span className='bullet bg-gray-400 w-5px h-2px'></span>
                    </li>

                    <li className='breadcrumb-item text-muted'>Projects </li>
                </ul>
            </div>

            <Link to='company/add' className='btn btn-primary btn-sm ms-3'>
                Create Company
            </Link>
        </div>
    );
};

export default Breadcrumb;
