import { useContext, useEffect } from "react";
import CompanyListCard from "../../shared/components/company/CompanyList";
import Breadcrumb from "../../shared/components/user/Breadcrumb";
import { CompanyContext } from "../../../context/CompanyContext";
import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";

const Dashboard = () => {
    const companyInfo = useContext(CompanyContext);

    useEffect(() => {
        console.log(companyInfo);
    }, [companyInfo]);

    return (
        <div className=' h-100vh py-3'>
            <div className='container'>
                <div className='mb-6'>
                    <Breadcrumb />
                </div>
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
