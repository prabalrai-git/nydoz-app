import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import API_ROUTE from "../../../../service/api";
import { IEnrollmentResponse } from "../../../../types/products.types";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../shared/molecules/LoadingSpinner";
import BASE_URL from "../../../../constants/AppSetting";
import Avatar from "../../../../assets/media/avatars/300-1.jpg";
import { Flag } from "react-bootstrap-icons";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";
import { IMenubar } from "../../../../types/app.types";
import Menubar from "../../../shared/layouts/sidebar/Menubar";

const menubarList: IMenubar[] = [
    {
        title: "Overview",
        path: "",
    },
    {
        title: "Enrollments Openings",
        path: "openings/list",
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
                title='Enrollment Details'
                showBreadcrumb={true}
                btnText='Back'
            />
            <section>
                {!data ? (
                    <div className='flex-center w-100'>
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className='card-single-row'>
                        <div className='card mb-5 mb-xxl-8 mt-5'>
                            <div className='card-body pt-9 pb-0'>
                                <div className='d-flex flex-wrap flex-sm-nowrap'>
                                    <div className='me-7 mb-4'>
                                        <div className='symbol symbol-75px symbol-lg-100px symbol-fixed position-relative shadow shadow-sm p-3'>
                                            <img
                                                src={
                                                    data?.logo
                                                        ? BASE_URL + data?.logo
                                                        : Avatar
                                                }
                                                alt='image'
                                            />
                                            <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px'></div>
                                        </div>
                                    </div>

                                    <div className='flex-grow-1'>
                                        <div>
                                            <button
                                                onClick={handleEdit}
                                                className='btn btn-info btn-sm float-end'>
                                                Edit
                                            </button>
                                        </div>

                                        <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                            <div className='d-flex flex-column'>
                                                <div className='d-flex align-items-center mb-2'>
                                                    <div className='text-gray-900 text-hover-primary fs-2 fw-bold me-1'>
                                                        {data?.name}
                                                    </div>
                                                    <a href='#'>
                                                        <i className='ki-outline ki-verify fs-1 text-primary'></i>
                                                    </a>
                                                </div>

                                                <div className='d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2'>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary me-5 mb-2'>
                                                        <i className='ki-outline ki-profile-circle fs-4 me-1'></i>
                                                        {data?.website}
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2'>
                                                    <div className='d-flex align-items-center text-gray-600 text-hover-primary mb-2'>
                                                        <Flag
                                                            size={14}
                                                            className='text-info me-2 '
                                                        />
                                                        {data?.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Menubar menubarList={menubarList} />
                            </div>
                        </div>
                        <Outlet />
                    </div>
                )}
            </section>
        </div>
    );
};

export default View;
