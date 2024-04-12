import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_ROUTE from "../../../../service/api";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../shared/molecules/LoadingSpinner";
import BASE_URL from "../../../../constants/AppSetting";
import Avatar from "../../../../assets/media/avatars/300-1.jpg";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { Badge, Tabs } from "antd";
import { BsBuildingFill } from "react-icons/bs";
import { BiSolidCheckCircle } from "react-icons/bi";
import EnrollmentOpeningsList from "../../../../ui/features/crm/enrollmentOpening/List";
import { GoDotFill } from "react-icons/go";
import { HiGlobeAlt } from "react-icons/hi";
import { MdFlag } from "react-icons/md";
const navpills = [
    // {
    //   id: 1,
    //   title: "Overview",
    //   children: <EnrollmentOpeningsList />,
    //   icon: <FaInfoCircle />,
    // },
    {
        id: 2,
        title: "Enrollments Openings",
        children: _jsx(EnrollmentOpeningsList, {}),
        icon: _jsx(BsBuildingFill, { className: "tw-mt-1" }),
    },
];
const View = () => {
    const { institueId } = useParams();
    const navigate = useNavigate();
    const { data, fetchDataById } = useFetch(API_ROUTE.CM_ENROLLMENT, true);
    useEffect(() => {
        fetchDataById(`${API_ROUTE.CM_ENROLLMENT}/${institueId}`);
    }, [fetchDataById, institueId]);
    const handleEdit = () => {
        navigate("../edit", {
            state: { data: data },
        });
    };
    return (_jsxs("div", { children: [_jsx(CompanyBreadcrumb, { title: "Enrollment Details", showBreadcrumb: true, btnText: "Back" }), _jsx("section", { children: !data ? (_jsx("div", { className: "flex-center w-100", children: _jsx(LoadingSpinner, {}) })) : (_jsx("div", { className: "card-single-row", children: _jsx("div", { className: "card mb-5 mb-xxl-8 mt-5", children: _jsxs("div", { className: "card-body pt-9 pb-0", children: [_jsxs("div", { className: "d-flex flex-wrap flex-sm-nowrap", children: [_jsx("div", { className: "me-7 mb-4", children: _jsx(Badge, { count: _jsx(GoDotFill, { size: 30, color: "#70B541" }), children: _jsx("div", { className: "symbol symbol-75px symbol-lg-100px symbol-fixed position-relative shadow shadow-sm p-3", children: _jsx("img", { src: data?.logo ? BASE_URL + data?.logo : Avatar, alt: "image" }) }) }) }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("div", { children: _jsx("button", { onClick: handleEdit, className: "btn tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white hover:tw-text-white btn-sm float-end", children: "Edit" }) }), _jsx("div", { className: "d-flex justify-content-between align-items-start flex-wrap mb-2", children: _jsxs("div", { className: "d-flex flex-column", children: [_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx("div", { className: "text-gray-900 text-hover-primary fs-2 fw-bold me-1", children: data?.name }), _jsx("a", { href: "#", children: _jsx(BiSolidCheckCircle, { size: 22, color: "#1778ff" }) })] }), _jsx("div", { className: "d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2", children: _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2", children: [_jsx(HiGlobeAlt, { size: 20, className: "tw-text-gray-300 tw-mr-2" }), data?.website] }) }), _jsx("div", { className: "d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2", children: _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary mb-2", children: [_jsx(MdFlag, { size: 20, className: "tw-text-gray-300 tw-mr-2" }), data?.country] }) })] }) })] })] }), _jsx(Tabs
                                // type="card"
                                , { 
                                    // type="card"
                                    className: "tw-py-5", 
                                    // defaultActiveKey="2"
                                    items: navpills.map((item) => {
                                        return {
                                            key: item.id,
                                            label: item.title,
                                            children: item.children,
                                            icon: item.icon,
                                        };
                                    }) })] }) }) })) })] }));
};
export default View;
