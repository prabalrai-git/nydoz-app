import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import { toast } from "react-toastify";
import useAuthContext from "../../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
import LoadingPage from "../../../features/utils/LoadingPage";
import ClientMgmtImage from "../../../../assets/products/clienthub.png";
import InvestMgmtImage from "../../../../assets/products/investmentmanagement.png";
import { Badge } from "antd";
import useFetchWithoutPagination from "../../../../hooks/useFetchWithoutPagination";
const MyProductList = (props) => {
    const { partialPath } = props;
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;
    const { data, fetchData, isloading } = useFetchWithoutPagination(proudctListUrl, true);
    useEffect(() => {
        if (companyId) {
            fetchData();
        }
        else {
            toast.error("Company Id not found");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId]);
    return (_jsx("div", { children: _jsxs("section", { className: "card ", children: [isloading && _jsx(LoadingPage, {}), data && data.length > 0 && (_jsx("div", { className: " tw-grid xsm:tw-grid-cols-1 tw-gap-8 xl:tw-grid-cols-6 md:tw-grid-cols-3 sm:grid-cols-2  xsm:tw-mx-auto sm:tw-mx-0", children: data.map((product, index) => (_jsx(Link, { to: `${partialPath}${product.slug}/dashboard`, className: "flex-wrap cursor-pointer tw-w-[200px]   ", children: _jsx("div", { className: " border border-secondary  tw-rounded-md text-center  mx-3 tw-shadow-sm hover:tw-shadow-md tw-drop-shadow-sm tw-h-[155px]  ", children: _jsxs(Badge.Ribbon, { text: "Purshased", className: "tw-top-1", children: [_jsx("div", { className: "  tw-bg-gray-100 tw-w-full tw-flex tw-justify-center tw-py-3  tw-rounded-t-lg tw-border-b-[0.5px] tw-border-gray-300 ", children: _jsx("img", { src: index === 0 ? ClientMgmtImage : InvestMgmtImage, alt: "", className: "tw-object-contain tw-w-[130px] tw-h-[60px] " }) }), _jsx("p", { className: " tw-text-base tw-font-medium tw-font-serif tw-mt-[20px] ", children: product.name })] }) }) }, product.id))) })), data && data?.length === 0 && (_jsx("div", { className: "py-6", children: _jsx("h3", { className: "text-warning text-center", children: "This company is not subscribed to any products ." }) }))] }) }));
};
export default MyProductList;
