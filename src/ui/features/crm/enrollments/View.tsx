import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentResponse } from "../../../../types/products.types";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../shared/molecules/LoadingSpinner";
import BASE_URL from "../../../../constants/AppSetting";
import Avatar from "../../../../assets/media/avatars/300-1.jpg";
import { Flag } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { IMenubar, INavPill } from "../../../../types/app.types";
import Menubar from "../../../shared/layouts/sidebar/Menubar";
import { Badge, Tabs } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { BsBuildingFill } from "react-icons/bs";
import { BiSolidCheckCircle } from "react-icons/bi";
import EnrollmentOpeningsList from "../../../../ui/features/crm/enrollmentOpening/List";
import { ClockCircleOutlined } from "@ant-design/icons";
import { GoDotFill } from "react-icons/go";
import { HiGlobeAlt } from "react-icons/hi";
import { MdFlag } from "react-icons/md";

const navpills: INavPill[] = [
  // {
  //   id: 1,
  //   title: "Overview",
  //   children: <EnrollmentOpeningsList />,
  //   icon: <FaInfoCircle />,
  // },
  {
    id: 2,
    title: "Enrollments Openings",
    children: <EnrollmentOpeningsList />,
    icon: <BsBuildingFill className="tw-mt-1" />,
  },
];

const View = () => {
  const { institueId } = useParams<string>();
  const navigate = useNavigate();
  const { data, fetchDataById } = useFetch<IEnrollmentResponse>(
    API_ROUTE.CM_ENROLLMENT,
    true
  );

  useEffect(() => {
    fetchDataById(`${API_ROUTE.CM_ENROLLMENT}/${institueId}`);
  }, [fetchDataById, institueId]);

  const handleEdit = () => {
    navigate("../edit", {
      state: { data: data },
    });
  };

  return (
    <div>
      <CompanyBreadcrumb
        title="Enrollment Details"
        showBreadcrumb={true}
        btnText="Back"
      />

      <section>
        {!data ? (
          <div className="flex-center w-100">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="card-single-row">
            <div className="card mb-5 mb-xxl-8 mt-5">
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
                    <div>
                      <button
                        onClick={handleEdit}
                        className="btn tw-bg-appBlue hover:tw-bg-appBlueHover tw-text-white hover:tw-text-white btn-sm float-end"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                          <div className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                            {data?.name}
                          </div>
                          <a href="#">
                            {/* <i className="ki-outline ki-verify fs-1 text-primary"></i> */}
                            <BiSolidCheckCircle size={22} color={"#1778ff"} />
                          </a>
                        </div>

                        <div className="d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2">
                          <div className="d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2">
                            <HiGlobeAlt
                              size={20}
                              className="tw-text-gray-300 tw-mr-2"
                            />
                            {data?.website}
                          </div>
                        </div>
                        <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                          <div className="d-flex align-items-center text-gray-600 text-hover-primary mb-2">
                            {/* <Flag size={14} className="text-info me-2 " /> */}
                            <MdFlag
                              size={20}
                              className="tw-text-gray-300 tw-mr-2"
                            />
                            {data?.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Menubar menubarList={menubarList} /> */}
                <Tabs
                  // type="card"
                  className="tw-py-5"
                  // defaultActiveKey="2"
                  items={navpills.map((item) => {
                    return {
                      key: item.id,
                      label: item.title,
                      children: item.children,
                      icon: item.icon,
                    };
                  })}
                />
              </div>
            </div>
            {/* <Outlet /> */}
          </div>
        )}
      </section>
    </div>
  );
};

export default View;
