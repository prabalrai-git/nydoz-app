import { useContext, useEffect } from "react";
import CompanyListCard from "../../shared/components/company/CompanyList";
import ProductList from "../../shared/components/products/ProductList";
import Breadcrumb from "../../shared/components/user/Breadcrumb";
import { CompanyContext } from "../../../context/CompanyContext";

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
                    <div className='col-12  bg-white '>
                        <div className='mb-6'>
                            <ProductList />
                        </div>
                    </div>

                    <div className='col-12 '>
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
