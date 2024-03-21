import { Spinner } from "react-bootstrap";
import useRemoveSubdomain from "../../../hooks/useRemoveSubdomain";
import CompanyListCard from "../../shared/components/company/CompanyList";
// import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";
import UserCompanyAndProducts from "../../shared/layouts/Header/navbar/products/UserCompanyAndProducts";
import useAuthContext from "../../../context/auth/useAuthContext";

const Dashboard = () => {
  const shouldRender = useRemoveSubdomain();

  if (!shouldRender) {
    return <Spinner size="sm" animation="border" role="status"></Spinner>; // or any other fallback UI
  }

  const { ...auth } = useAuthContext();

  return (
    <div className=" tw-min-h-[60vh] py-3 xl:tw-w-9/12 tw-mx-auto lg:tw-w-11/12 md:tw-px-[20px] xsm:tw-w-11/12">
      <div className="">
        <div className="row">
          <div className="col-12 col-md-5 mb-6">
            <div className="border border-light rounded shadow shadow-sm">
              <CompanyListCard />
            </div>
          </div>
          <div className="col-12 col-md-7 mb-6  bg-white p-6 tw-rounded-xl ">
            {/* <AuthCompanyProduct /> */}
            <UserCompanyAndProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
