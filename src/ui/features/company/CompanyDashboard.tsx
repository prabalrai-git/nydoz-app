import MyProductList from "../../shared/components/products/MyProducts";
import useAuthContext from "../../../context/auth/useAuthContext";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  const { companyInfo, isCompanyOwner } = useAuthContext();

  return (
    <div>
      <CompanyBreadcrumb
        btnText="Back"
        title="Dashboard"
        showBreadcrumb={true}
      />
      <section className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <span className="text-capitalize">
              {companyInfo?.subdomain ?? "company"}'s Products
            </span>
          </h3>
          <div className="card-toolbar">
            {isCompanyOwner && (
              <Link
                type="button"
                to={`/workspace/${companyInfo?.subdomain}/product-settings/buy`}
                className="btn btn-sm btn-primary"
              >
                PURCHASE PRODUCTS
              </Link>
            )}
          </div>
        </div>
        <div className="card-body">
          <MyProductList partialPath="../products/" />
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboard;
