import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../../assets/media/avatars/300-1.jpg";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import BASE_URL from "../../../constants/AppSetting";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { Flag } from "react-bootstrap-icons";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Badge } from "antd";
import { GoDotFill } from "react-icons/go";
import { BiSolidCheckCircle, BiSolidPhoneCall } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
const ProfileLayout = () => {
    const navigate = useNavigate();
    const { isCompanyOwner } = useAuthContext();
    const { id } = useParams();
    const url = `${API_ROUTE.GET_COMPANY_BY_ID}/${id}`;
    const { data, fetchData } = useFetch(url, true);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleEditCompany = () => {
        navigate(`../edit-profile/${data?.id}`, { state: { data } });
    };
    return (_jsx("div", { children: !data ? (_jsx("div", { className: "flex-center w-100", children: _jsx(LoadingSpinner, {}) })) : (_jsxs("div", { className: "card-single-row tw-text-white ", children: [_jsx("div", { className: "card mb-5 mb-xxl-8 mt-5 tw-min-h-[35vh]", children: _jsx("div", { className: "card-body pt-9 pb-0", children: _jsxs("div", { className: "d-flex flex-wrap flex-sm-nowrap", children: [_jsx("div", { className: "me-7 mb-4", children: _jsx(Badge, { count: _jsx(GoDotFill, { size: 30, color: "#70B541" }), children: _jsx("div", { className: "symbol symbol-75px symbol-lg-100px symbol-fixed position-relative shadow shadow-sm p-3", children: _jsx("img", { src: data?.logo ? BASE_URL + data?.logo : Avatar, alt: "image" }) }) }) }), _jsxs("div", { className: "flex-grow-1", children: [isCompanyOwner && (_jsx("div", { children: _jsx("button", { onClick: handleEditCompany, className: "btn tw-bg-appBlue tw-text-white hover:tw-text-white  hover:tw-bg-appBlueHover btn-sm float-end", children: "Edit" }) })), _jsx("div", { className: "d-flex justify-content-between align-items-start flex-wrap mb-2 ", children: _jsxs("div", { className: "d-flex flex-column tw-gap-2", children: [_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx("div", { className: "text-gray-900 text-hover-primary fs-2 fw-bold me-1", children: data?.name }), _jsx("a", { href: "#", children: _jsx(BiSolidCheckCircle, { size: 22, color: "#1778ff" }) })] }), _jsxs("div", { className: " tw-grid tw-grid-cols-4 tw-gap-8 xsm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-pb-20", children: [_jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2", children: [_jsx("i", { className: "ki-outline ki-profile-circle fs-4 me-1" }), _jsx("span", { className: "tw-font-bold tw-mx-2", children: "Name:" }), data?.name] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2", children: [_jsx(BiSolidPhoneCall, { size: 18, className: " me-2 " }), _jsxs("span", { className: "tw-font-bold tw-mx-2", children: ["Phone Number:", " "] }), "+" +
                                                                        data?.country_calling_code +
                                                                        " " +
                                                                        data?.phone_number] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary mb-2", children: [_jsx("i", { className: "ki-outline ki-sms fs-4 me-1" }), _jsx("span", { className: "tw-font-bold tw-mx-2", children: "Email:" }), data?.email] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary mb-2", children: [_jsx(IoIosMail, { size: 18, className: " me-2 " }), _jsx("span", { className: "tw-font-bold tw-mx-2", children: "Postal Code:" }), data?.postal_code] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2", children: [_jsx(IoPersonAddSharp, { size: 15, className: " me-2 " }), _jsx("span", { className: "tw-font-bold tw-mx-2", children: "Contact Person:" }), data?.contact_person] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2", children: [_jsx("i", { className: "ki-outline ki-geolocation fs-4 me-1" }), _jsx("span", { className: "tw-font-bold tw-mx-2", children: "Address:" }), data?.address, ", ", data?.city, ", ", data?.state] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary mb-2", children: [_jsx(Flag, { size: 14, className: " me-2 " }), _jsxs("span", { className: "tw-font-bold tw-mx-2", children: ["Country:", " "] }), data?.country] }), _jsxs("div", { className: "d-flex align-items-center text-gray-600 text-hover-primary mb-2", children: [_jsx(FiGlobe, { size: 14, className: " me-2 " }), _jsxs("span", { className: "tw-font-bold tw-mx-2", children: ["Website:", " "] }), data?.website] })] })] }) })] })] }) }) }), _jsx("div", { className: "container", children: _jsx(Outlet, {}) })] })) }));
};
export default ProfileLayout;
