import Breadcrumb from "../../shared/molecules/Breadcrumb";
import Heading from "../../shared/molecules/Heading";
import { useParams } from "react-router-dom";
import ProductList from "../products/ProductList";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
    console.log("company layout");

    const { companyId } = useParams<{ companyId: string }>();

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
                    <h4 className='fs-20'>Products</h4>
                    <Link to='products/all' className='btn btn-primary'>
                        View All Products
                    </Link>
                </div>
                <ProductList />
            </section>
        </div>
    );
};

export default CompanyDashboard;
