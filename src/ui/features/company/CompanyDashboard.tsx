import CompanyProductList from "../products/CompanyProductList";

import useAuthContext from "../../../context/auth/useAuthContext";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
    const { companyInfo, isCompanyOwner } = useAuthContext();

    return (
        <div>
            <CompanyBreadcrumb
                btnText='Back'
                title='Dashboard'
                showBreadcrumb={true}
            />
            <section className='card '>
                <div className='card-header'>
                    <h3 className='card-title'>
                        <span className='text-capitalize'>
                            {companyInfo?.subdomain ?? "company"}'s Products
                        </span>
                    </h3>
                    <div className='card-toolbar'>
                        <Link
                            type='button'
                            to={`/workspace/${companyInfo?.subdomain}/products/buy`}
                            className='btn btn-sm btn-primary'>
                            BUY PRODUCTS
                        </Link>
                    </div>
                </div>
                <div className='card-body'>
                    <CompanyProductList />
                </div>
            </section>
        </div>
    );
};

export default CompanyDashboard;
