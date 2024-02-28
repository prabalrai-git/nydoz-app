import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import MyProductList from "../../shared/components/products/MyProducts";

const ProductDashboard = () => {
  return (
    <div>
      <CompanyBreadcrumb
        title="My Products Dashboard"
        showBreadcrumb={true}
        btnText="Back"
      />
      <section>
        <div className="card ">
          <div className="card-header">
            <h3 className="card-title">My Product's List</h3>
            <div className="card-toolbar">
              <Link
                type="button"
                to={`../../product-settings/view`}
                className="btn btn-sm btn-light"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="card-body">
            <MyProductList partialPath="../" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDashboard;
