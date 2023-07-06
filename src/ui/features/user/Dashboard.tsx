import CompanyListCard from "../../shared/components/company/CompanyList";
import Breadcrumb from "../../shared/components/user/Breadcrumb";

const Dashboard = () => {
    return (
        <div className=' h-100vh py-3'>
            <div className='container'>
                <div className='mb-6'>
                    <Breadcrumb />
                </div>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-4'>
                        <div className='mb-6'>
                            <CompanyListCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
