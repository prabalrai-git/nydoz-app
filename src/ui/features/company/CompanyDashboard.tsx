import Breadcrumb from "../../shared/molecules/Breadcrumb";
import Heading from "../../shared/molecules/Heading";
import { useParams } from "react-router-dom";
import ProductList from "../products/ProductList";
import { Link } from "react-router-dom";
import { useCompanyAuth } from "../../../hooks/useCompanyAuth";

const CompanyDashboard = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const { isCompanyAdmin } = useCompanyAuth();

    return (
        <div>
            <div className='my-6 border shadow shadow-sm py-6 p-3'>
                <Heading
                    title={companyId ?? "Dashboard"}
                    btnText='Back'
                    showBreadcrumb={true}>
                    <Breadcrumb
                        parent='Home'
                        parentLink='/home'
                        child={companyId ?? "Dashboard"}
                    />
                </Heading>
            </div>
            <section className='bg-white py-6'>
                <div className='d-flex align-item-center justify-content-between mb-6 px-3'>
                    <h4 className='fs-20'>Company's Products</h4>
                    {isCompanyAdmin && (
                        <Link to='products/buy' className='btn btn-primary'>
                            Buy New Products
                        </Link>
                    )}
                </div>
                <ProductList />
            </section>
        </div>
    );
};

export default CompanyDashboard;
