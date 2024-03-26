import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../../assets/media/avatars/300-1.jpg";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { ICompanyResponse } from "../../../types/payload.type";
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
import { FaPhoneSquareAlt } from "react-icons/fa";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { isCompanyOwner } = useAuthContext();
  const { id } = useParams<{ id: string }>();
  const url = `${API_ROUTE.GET_COMPANY_BY_ID}/${id}`;
  const { data, fetchData } = useFetch<ICompanyResponse>(url, true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCompany = () => {
    navigate(`/company/edit`, { state: { data } });
  };

  return (
    <div>
      {!data ? (
        <div className="flex-center w-100">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="card-single-row tw-text-white ">
          <div className="card mb-5 mb-xxl-8 mt-5 tw-min-h-[35vh]">
            <div className="card-body pt-9 pb-0">
              <div className="d-flex flex-wrap flex-sm-nowrap">
                <div className="me-7 mb-4">
                  <Badge count={<GoDotFill size={30} color={"#70B541"} />}>
                    <div className="symbol symbol-75px symbol-lg-100px symbol-fixed position-relative shadow shadow-sm p-3">
                      <img
                        src={data?.logo ? BASE_URL + data?.logo : Avatar}
                        alt="image"
                      />
                    </div>
                  </Badge>
                </div>

                <div className="flex-grow-1">
                  {isCompanyOwner && (
                    <div>
                      <button
                        onClick={handleEditCompany}
                        className="btn tw-bg-appBlue tw-text-white hover:tw-text-white  hover:tw-bg-appBlueHover btn-sm float-end"
                      >
                        Edit
                      </button>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-start flex-wrap mb-2 ">
                    <div className="d-flex flex-column tw-gap-2">
                      <div className="d-flex align-items-center mb-2">
                        <div className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                          {data?.name}
                        </div>
                        <a href="#">
                          <BiSolidCheckCircle size={22} color={"#1778ff"} />
                        </a>
                      </div>

                      <div className=" tw-grid tw-grid-cols-4 tw-gap-8 xsm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-pb-20">
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                          <i className="ki-outline ki-profile-circle fs-4 me-1"></i>
                          <span className="tw-font-bold tw-mx-2">Name:</span>

                          {data?.name}
                        </div>

                        <div className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                          <BiSolidPhoneCall size={18} className=" me-2 " />
                          <span className="tw-font-bold tw-mx-2">
                            Phone Number:{" "}
                          </span>
                          {"+" +
                            data?.country_calling_code +
                            " " +
                            data?.phone_number}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary mb-2">
                          <i className="ki-outline ki-sms fs-4 me-1"></i>
                          <span className="tw-font-bold tw-mx-2">Email:</span>
                          {data?.email}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary mb-2">
                          <IoIosMail size={18} className=" me-2 " />
                          <span className="tw-font-bold tw-mx-2">
                            Postal Code:
                          </span>
                          {data?.postal_code}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                          <IoPersonAddSharp size={15} className=" me-2 " />
                          <span className="tw-font-bold tw-mx-2">
                            Contact Person:
                          </span>
                          {data?.contact_person}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                          <i className="ki-outline ki-geolocation fs-4 me-1"></i>
                          <span className="tw-font-bold tw-mx-2">Address:</span>
                          {data?.address}, {data?.city}, {data?.state}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary mb-2">
                          <Flag size={14} className=" me-2 " />
                          <span className="tw-font-bold tw-mx-2">
                            Country:{" "}
                          </span>
                          {data?.country}
                        </div>
                        <div className="d-flex align-items-center text-gray-600 text-hover-primary mb-2">
                          <FiGlobe size={14} className=" me-2 " />
                          <span className="tw-font-bold tw-mx-2">
                            Website:{" "}
                          </span>
                          {data?.website}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {isCompanyOwner && (
                                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
                                    <li className='nav-item mt-2'>
                                        <Link
                                            className='nav-link  ms-0 me-10 py-5 '
                                            to={""}>
                                            Overview
                                        </Link>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <Link
                                            className='nav-link  ms-0 me-10 py-5'
                                            to='/home/sabkura/products/buy'>
                                            Buy Products
                                        </Link>
                                    </li>
                                    <li className='nav-item mt-2'>
                                        <Link
                                            className='nav-link  ms-0 me-10 py-5'
                                            to={"agents"}>
                                            Agents
                                        </Link>
                                    </li>

                                    <li className='nav-item mt-2'>
                                        <Link
                                            to={`roles`}
                                            className='nav-link  ms-0 me-10 py-5'>
                                            Roles
                                        </Link>
                                    </li>
                                    <li className='nav-item mt-2'>
                                        <Link
                                            to={`documents`}
                                            className='nav-link  ms-0 me-10 py-5'>
                                            Documents
                                        </Link>
                                    </li>
                                </ul>
                            )} */}
            </div>
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
