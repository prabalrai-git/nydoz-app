import MyProductList from "../../shared/components/products/MyProducts";
import useAuthContext from "../../../context/auth/useAuthContext";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";

const CompanyDashboard = () => {
  const { companyInfo, isCompanyOwner } = useAuthContext();

  // const sudomainArrays = ["http://localhost:5174/"];

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
                to={`/company/product-settings/buy`}
                className="btn btn-sm btn-primary tw-flex tw-gap-2 tw-items-center"
              >
                <HiShoppingBag size={16} />
                <p className="tw-mt-1">PURCHASE PRODUCTS</p>
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
