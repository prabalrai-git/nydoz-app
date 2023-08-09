import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import Images from "../../../../../constants/Images";

const PublicNavbar = () => {
    const productRef = useRef(null);
    useOnClickOutside(productRef, () => setShowProducts(false));
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const location = useLocation();
    const [pathName, setPathName] = useState<string[]>([]);
    useEffect(() => {
        const pathnames = location.pathname
            .split("/")
            .filter((path) => path !== "");
        setPathName(pathnames);
    }, [location.pathname]);

    const productList = [
        {
            name: "Client Hub",
            link: "/cm",
            imageLink: Images.ClientHubLogo,
        },
        {
            name: "Investment Management",
            link: "/im",
            imageLink: Images.InvestmentManagementLogo,
        },
    ];

    return (
        <nav className=' navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white fixed-top'>
            <div className='container-lg'>
                <div className='inner-container'>
                    <div className='left-container'>
                        <NavLink className='navbar-brand' to='/'>
                            <img
                                className='navbar-brand-img '
                                src={Images.CompanyLogo}
                                alt='Company Logo'
                            />
                        </NavLink>
                        <div ref={productRef} className='p-relative'>
                            <div className='nav-item '>
                                <div
                                    className='d-flex align-items-center  btn btn-light-primary btn-sm '
                                    onClick={() =>
                                        setShowProducts(() => !showProducts)
                                    }>
                                    <i className='ki-outline ki-abstract-26 fs-1 me-3 '></i>
                                    <span className='fw-bold fs-7'>
                                        Products & Services{" "}
                                        <i className='fas fa-chevron-down ms-2'></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <MyProducts showProduct={showProducts}>
                                    {productList.map(
                                        (product, index: number) => (
                                            <div key={index}>
                                                <NavLink to={product.link}>
                                                    <div className='d-flex align-items-center  btn btn-bg-light btn-color-primary btn-sm mb-3'>
                                                        <img
                                                            className='dropdown-img'
                                                            src={
                                                                product.imageLink
                                                            }
                                                            alt='product'
                                                        />
                                                        <span className='fw-bold fs-7'>
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        )
                                    )}
                                </MyProducts>
                            </div>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div>
                            <NavLink
                                className='nav-link fw-bold '
                                to='auth/login'>
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
