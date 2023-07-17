import { useEffect } from "react";

import CompanyProductList from "../products/CompanyProductList";
import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";

const CompanyDashboard = () => {
    const { isCompanyOwner, subdomain } = useAuthContext();
    useEffect(() => {
        console.log(isCompanyOwner, "dashboar company owner");
    }, [isCompanyOwner]);

    return (
        <div>
            <section className='bg-white py-6'>
                <div className='d-flex align-item-center justify-content-between mb-6 px-3'>
                    <h4 className='fs-20'>Company's Products</h4>
                    {isCompanyOwner && (
                        <Link to='products/buy' className='btn btn-primary'>
                            Buy New Products
                        </Link>
                    )}
                </div>
                <CompanyProductList />
            </section>
        </div>
    );
};

export default CompanyDashboard;
