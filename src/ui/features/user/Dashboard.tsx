import CompanyOne from "../../shared/components/company/companyOne";

const Dashboard = () => {
    return (
        <div className=' bg-light h-100vh py-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <CompanyOne />
                    </div>
                    <div className='col-6'>
                        <CompanyOne />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
