// @ desc Products list brought by company

import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IUserCompanyProductsResponse } from "../../../../types/payload.type";
import LoadingSpinner from "../../molecules/LoadingSpinner";
import NotFound from "../../molecules/NotFound";
import ImageAtom from "../../atoms/ImageAtom";

const ProductList = () => {
    const { data, fetchData, isloading } =
        useFetch<IUserCompanyProductsResponse>(
            API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS,
            true
        );

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleProductClick = (iproductId: string, subdomain: string) => {
        // prod url window.location.href = `http://${subdomain}.api.nydoz.app/home/${subdomain}/products/${iproductId}`;

        window.location.href = `http://localhost:5173/home/${subdomain}/products/${iproductId}`;
    };

    return (
        <div className='py-6 px-3'>
            <h3 className='my-3'>Products</h3>
            {isloading && <LoadingSpinner title='loading...' />}
            {data && (
                <div className='row'>
                    {data?.companies?.map((companyItem) => {
                        if (companyItem?.products?.length === 0) return null;
                        return (
                            <div className='col-12 border-secondary  border-bottom  py-3 my-3'>
                                <h4 className='fs-14 fw-bolder my-3'>
                                    {companyItem.name}
                                </h4>
                                <div className='row'>
                                    {companyItem?.products?.map(
                                        (productItem) => (
                                            <div
                                                onClick={() => {
                                                    handleProductClick(
                                                        productItem.id,
                                                        companyItem.subdomain
                                                    );
                                                }}
                                                className='col-6 col-md-2 cursor-pointer'
                                                key={productItem.id}>
                                                <div className='rounded-2 border border-secondary shadow shadow-sm m-3 p-6 shadow-sm  rounded text-center'>
                                                    <div className='symbol symbol-100px symbol-lg-100px symbol-fixed position-relative bg-light'>
                                                        <ImageAtom
                                                            src={
                                                                productItem.logo
                                                            }
                                                            alt={
                                                                productItem.name
                                                            }
                                                            className='img-fluid card-img-top'
                                                        />
                                                    </div>
                                                    <div className='card-body'>
                                                        <h5 className='card-title my-3'>
                                                            {productItem.name}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {data?.companies?.length === 0 && (
                <NotFound title='Products Not Found. Please refresh the page.' />
            )}
            {!isloading &&
                data?.companies &&
                data?.companies?.length > 0 &&
                data?.companies[0]?.products?.length === 0 && (
                    <NotFound title='you are not subscribed to any products . ' />
                )}
        </div>
    );
};

export default ProductList;
