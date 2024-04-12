import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import ImageAtom from "../../atoms/ImageAtom";
import { Link } from "react-router-dom";
import DynamicLink from "../../molecules/DynamicLink";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useFetchWithoutPagination from "../../../../hooks/useFetchWithoutPagination";
const CompanyListCard = () => {
    const { data, fetchData, isloading } = useFetchWithoutPagination(API_ROUTE.GET_COMPANIES, true);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsxs("div", { className: "card h-xl-100", children: [_jsx("div", { className: "card-header border-0 pt-5", children: _jsxs("h3", { className: "card-title align-items-start flex-column", children: [_jsx("span", { className: "card-label fw-bold text-dark", children: "Company Details" }), _jsx("span", { className: "text-muted mt-2 fw-semibold fs-7 tw-capitalize", children: data && data.length > 0
                                ? `${data?.length} companies in total`
                                : "0 company in total" })] }) }), _jsx("div", { className: "tw-w-[87%] tw-mx-auto", children: _jsx("hr", { className: "bg-light" }) }), _jsxs("div", { className: "card-body pt6 ", children: [data?.map((item) => {
                        return (_jsxs(DynamicLink, { subdomain: item.subdomain, pathName: `company/dashboard?token=${localStorage.getItem("token")}`, 
                            // pathName={`dashboard`}
                            className: "d-flex flex-stack mb-3 cursor-pointer tw-bg-gray-100 tw-py-4 tw-px-4  hover:tw-shadow-md tw-rounded-lg", children: [_jsx("div", { className: "symbol symbol-40px me-4", children: _jsx(ImageAtom, { src: item.logo, className: "h-50px w-50px", alt: item.name }) }), _jsxs("div", { className: "d-flex align-items-center flex-row-fluid flex-wrap", children: [_jsxs("div", { className: "flex-grow-1 me-2 tw-flex tw-flex-col ", children: [_jsx("a", { className: "text-gray-800   fw-bold tw-uppercase ", children: item.name.length > 15
                                                        ? item.name.slice(0, 15) + "..."
                                                        : item.name }), _jsx("p", { className: "  tw-text-gray-500  ", children: item.website.length > 35
                                                        ? item.website.slice(0, 35) + "..."
                                                        : item.website })] }), _jsx("div", { className: "btn btn-sm btn-icon  w-30px h-30px tw-bg-btnPrimary hover:tw-bg-btnPrimaryHover", children: _jsx(MdKeyboardDoubleArrowRight, { color: "white", size: 20 }) })] })] }, item.id));
                    }), !isloading && data?.length === 0 && (_jsx("div", { className: "row", children: _jsxs("div", { children: [_jsx("h4", { children: "No Company Found . Please create company to buy products." }), _jsx("div", { className: "float-end", children: _jsx(Link, { className: "btn btn-primary my-3", to: "create-company", children: "Create Company" }) })] }) }))] })] }));
};
export default CompanyListCard;
