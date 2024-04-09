// import { Spinner } from "react-bootstrap";
// import useRemoveSubdomain from "../../../hooks/useRemoveSubdomain";
import CompanyListCard from "../../shared/components/company/CompanyList";
// import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";
import UserCompanyAndProducts from "../../shared/layouts/Header/navbar/products/UserCompanyAndProducts";
import FooterLayout from "../../shared/layouts/Footer/Footer";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
import { useEffect, useState } from "react";
import useAuthContext from "../../../context/auth/useAuthContext";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
import useFetchWithoutPagination from "../../../hooks/useFetchWithoutPagination";

const Dashboard = () => {
  // const shouldRender = useRemoveSubdomain();

  // if (!shouldRender) {
  //   return <Spinner size="sm" animation="border" role="status"></Spinner>; // or any other fallback UI
  // }

  const [companySubdomains, setCompanySubdomains] = useState<string[]>([]);
  const [sharedAlready, setSharedAlready] = useState(false);

  const { data, fetchData, isloading } = useFetchWithoutPagination<
    ICompanyResponse[]
  >(API_ROUTE.GET_COMPANIES, true);

  useEffect(() => {
    fetchData();
    const shared = localStorage.getItem("sharedLocalStorage");
    setSharedAlready((prev) => {
      return shared ? !prev : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data) {
      const uniqueSubdomains = new Set();

      data.forEach((item) => {
        uniqueSubdomains.add(item.subdomain);
      });

      setCompanySubdomains([...uniqueSubdomains]); // Update state outside the loop
    }
  }, [data]);

  const { token, companyInfo } = useAuthContext();

  console.log(localStorage.getItem("sharedLocalStorage"));

  useEffect(() => {
    if (token && companySubdomains) {
      companySubdomains.forEach((item) => {
        const newWindow = window.open(
          `http://${item}.localhost:5174/setToken.html?token=${token}`
        );

        // newWindow?.close();

        setTimeout(function () {
          newWindow.close();
        }, 50);
      });
      localStorage.setItem("sharedLocalStorage", "true");
    }
  }, [token, companySubdomains, sharedAlready]);

  return (
    <>
      <WorkSpaceNavbar />

      <div className=" tw-min-h-[60vh] py-3 xl:tw-w-9/12 tw-mx-auto lg:tw-w-11/12 md:tw-px-[20px] xsm:tw-w-11/12 tw-mt-[100px]">
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
            <FooterLayout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
