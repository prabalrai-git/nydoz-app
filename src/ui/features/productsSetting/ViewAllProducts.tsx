import { Link } from "react-router-dom";
import useAuthContext from "../../../context/auth/useAuthContext";
import ProductList from "../../shared/components/products/ProductList";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";

const ViewAllProducts = () => {
  const { isCompanyOwner } = useAuthContext();

  return (
    <div>
      <CompanyBreadcrumb
        title="Product List"
        showBreadcrumb={true}
        btnText="Back"
      />
      <section>
        <div className="card ">
          <div className="card-header">
            <h3 className="card-title">Product's List</h3>
            <div className="card-toolbar">
              {isCompanyOwner && (
                <Link
                  type="button"
                  to={`../buy`}
                  className="btn btn-sm btn-primary"
                >
                  PURCHASE PRODUCTS
                </Link>
              )}
            </div>
          </div>
          <div className="card-body">
            <ProductList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewAllProducts;
