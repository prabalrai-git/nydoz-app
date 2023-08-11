import CompanyListCard from "../../shared/components/company/CompanyList";
import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";
import UserCompanyAndProducts from "../../shared/layouts/Header/navbar/products/UserCompanyAndProducts";

const Dashboard = () => {
    return (
        <div className=' h-100vh py-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-8 mb-6  bg-white p-6 '>
                        {/* <AuthCompanyProduct /> */}
                        <UserCompanyAndProducts />
                    </div>

                    <div className='col-12 col-md-4 mb-6'>
                        <div className='border border-light rounded shadow shadow-sm'>
                            <CompanyListCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
