import CompanyListCard from "../../shared/components/company/CompanyList";
import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";

const Dashboard = () => {
    return (
        <div className=' h-100vh py-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-6  bg-white '>
                        <AuthCompanyProduct />
                    </div>

                    <div className='col-6 mb-6'>
                        <CompanyListCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
