import CompanyProductList from "../products/CompanyProductList";

import useAuthContext from "../../../context/auth/useAuthContext";

const CompanyDashboard = () => {
    const { companyInfo } = useAuthContext();

    return (
        <div>
            <section className='bg-white py-6'>
                <div className='d-flex align-item-center justify-content-between mb-3 px-3'>
                    <h4 className='fs-20'>
                        <span className='text-capitalize'>
                            {companyInfo?.subdomain ?? "company"}'s Products
                        </span>
                    </h4>
                </div>
                <CompanyProductList />
            </section>
        </div>
    );
};

export default CompanyDashboard;
