import { useEffect } from "react";
import API_ROUTE from "../../../../service/api";
import useFetch from "../../../../hooks/useFetch";
import { ICompanyResponse } from "../../../../types/payload.type";
import ImageAtom from "../../atoms/ImageAtom";
import { Link } from "react-router-dom";

const CompanyListCard = () => {
    const { data, fetchData, isloading } = useFetch<ICompanyResponse[]>(
        API_ROUTE.GET_COMPANIES,
        true
    );

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='card h-xl-100'>
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold text-dark'>
                        Company Details
                    </span>

                    <span className='text-muted mt-1 fw-semibold fs-7'>
                        {data?.length ?? "NA"} company in total
                    </span>
                </h3>

                <div className='card-toolbar'>
                    <a className='btn btn-sm btn-light'>View All</a>
                </div>
            </div>
            <div className='card-body pt6'>
                {data?.map((item: ICompanyResponse) => (
                    <Link
                        key={item.id}
                        to='company'
                        className='d-flex flex-stack mb-3 cursor-pointer'>
                        <div className='symbol symbol-40px me-4'>
                            <ImageAtom
                                src={item.logo}
                                className='h-50px w-50px'
                                alt={item.name}
                            />
                        </div>

                        <div className='d-flex align-items-center flex-row-fluid flex-wrap'>
                            <div className='flex-grow-1 me-2'>
                                <a className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                                    {item.name}
                                </a>

                                <span className='text-muted fw-semibold d-block fs-7'>
                                    {item.website}
                                </span>
                            </div>

                            <a
                                href='#'
                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px'>
                                <i className='ki-duotone ki-arrow-right fs-2'>
                                    <span className='path1'></span>
                                    <span className='path2'></span>
                                </i>{" "}
                            </a>
                        </div>
                    </Link>
                ))}

                {!isloading && data?.length === 0 && (
                    <div>
                        <h3> Not Avaible</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyListCard;
