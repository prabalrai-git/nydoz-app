import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { Spinner } from "react-bootstrap";
// import useRemoveSubdomain from "../../../hooks/useRemoveSubdomain";
import CompanyListCard from "../../shared/components/company/CompanyList";
// import AuthCompanyProduct from "../../shared/components/user/AuthCompanyProduct";
import UserCompanyAndProducts from "../../shared/layouts/Header/navbar/products/UserCompanyAndProducts";
import FooterLayout from "../../shared/layouts/Footer/Footer";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";
const Dashboard = () => {
    // const shouldRender = useRemoveSubdomain();
    // if (!shouldRender) {
    //   return <Spinner size="sm" animation="border" role="status"></Spinner>; // or any other fallback UI
    // }
    // const [companySubdomains, setCompanySubdomains] = useState<string[]>([]);
    // const [sharedAlready, setSharedAlready] = useState(false);
    // const { data, fetchData, isloading } = useFetchWithoutPagination<
    //   ICompanyResponse[]
    // >(API_ROUTE.GET_COMPANIES, true);
    // useEffect(() => {
    //   fetchData();
    //   const shared = localStorage.getItem("sharedLocalStorage");
    //   setSharedAlready((prev) => {
    //     return shared ? !prev : prev;
    //   });
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // useEffect(() => {
    //   if (data) {
    //     const uniqueSubdomains = new Set();
    //     data.forEach((item) => {
    //       uniqueSubdomains.add(item.subdomain);
    //     });
    //     setCompanySubdomains([...uniqueSubdomains]); // Update state outside the loop
    //   }
    // }, [data]);
    // const { token, companyInfo } = useAuthContext();
    // useEffect(() => {
    //   if (token && companySubdomains) {
    //     // setTimeout(() => {
    //     //   window.close();
    //     // }, 500);
    //     // setTimeout(() => {
    //     //   window.open(
    //     //     `http://newcompany.localhost:5174/setToken.html?token=${token}`
    //     //   );
    //     // }, 1000);
    //     companySubdomains.forEach((subdomain) => {
    //       setTimeout(() => {
    //         window.open(
    //           `http://${subdomain}.localhost:5174/setToken.html?token=${token}`
    //         );
    //       }, 500);
    //       // newWindow?.close();
    //     });
    //     localStorage.setItem("sharedLocalStorage", "true");
    //   }
    // }, [token, companySubdomains, sharedAlready]);
    return (_jsxs(_Fragment, { children: [_jsx(WorkSpaceNavbar, {}), _jsx("div", { className: " tw-min-h-[60vh] py-3 xl:tw-w-9/12 tw-mx-auto lg:tw-w-11/12 md:tw-px-[20px] xsm:tw-w-11/12 tw-mt-[100px]", children: _jsx("div", { className: "", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-12 col-md-5 mb-6", children: _jsx("div", { className: "border border-light rounded shadow shadow-sm", children: _jsx(CompanyListCard, {}) }) }), _jsx("div", { className: "col-12 col-md-7 mb-6  bg-white p-6 tw-rounded-xl ", children: _jsx(UserCompanyAndProducts, {}) }), _jsx(FooterLayout, {})] }) }) })] }));
};
export default Dashboard;
