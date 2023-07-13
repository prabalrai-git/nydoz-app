// @ desc Products list component in dashbaord
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IProductResponse } from "../../../../types/payload.type";
import LoadingPage from "../../../features/utils/LoadingPage";
import ImageAtom from "../../atoms/ImageAtom";
import Breadcrumb from "../../molecules/Breadcrumb";
import Heading from "../../molecules/Heading";

const ProductList = () => {
    const { data, error, isloading, fetchData } = useFetch<IProductResponse[]>(
        API_ROUTE.GET_PRODUCTS_LIST,
        true
    );

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className=' bg-white h-100vh p-6'>
            <Heading title='Buy Products' btnText='Back' showBreadcrumb={true}>
                <Breadcrumb
                    parent='products'
                    parentLink='/account/company/list'
                    child='Buy'
                />
            </Heading>
            {isloading && <LoadingPage />}
            <section>
                <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer  '>
                    <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                            <th className='w-10px pe-2 sorting_disabled'>
                                <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        data-kt-check='true'
                                        data-kt-check-target='#kt_ecommerce_category_table .form-check-input'
                                        value='1'
                                    />
                                </div>
                            </th>
                            <th className='min-w-250px sorting'>Products</th>
                            <th
                                className='min-w-150px sorting'
                                aria-controls='kt_ecommerce_category_table'
                                aria-label='Category Type: activate to sort column ascending'>
                                Product Type
                            </th>
                            <th className='text-end min-w-70px sorting_disabled'>
                                Price
                            </th>
                        </tr>
                    </thead>

                    <tbody className='fw-semibold text-gray-600'>
                        {data?.map((product: IProductResponse) => (
                            <tr className='odd'>
                                <td>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            value='1'
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex'>
                                        <div className='symbol symbol-50px shadow shadow-sm'>
                                            <ImageAtom
                                                src={product.logo}
                                                alt={"logo"}
                                                className='img-fluid '
                                            />
                                        </div>

                                        <div className='ms-5'>
                                            <div className='text-gray-800 text-hover-primary fs-5 fw-bold mb-1'>
                                                {product.name}
                                            </div>

                                            <div className='text-muted fs-7 fw-bold'>
                                                {product.description}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='badge badge-light-success'>
                                        Automated
                                    </div>
                                </td>
                                <td className='text-end'>
                                    <a
                                        href='#'
                                        className='btn btn-sm btn-light btn-active-light-primary btn-flex btn-center'
                                        data-kt-menu-trigger='click'
                                        data-kt-menu-placement='bottom-end'>
                                        Actions
                                        <i className='ki-outline ki-down fs-5 ms-1'></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ProductList;
