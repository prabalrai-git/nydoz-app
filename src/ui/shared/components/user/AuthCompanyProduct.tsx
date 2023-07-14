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

    useEffect(() => {
        console.log(data, "data");
    }, [data]);

    return (
        <div className='py-6 px-3'>
            {isloading && <LoadingSpinner title='loading...' />}
            {data && (
                <div className='row'>
                    {data.companies.map((companyItem) => (
                        <div key={companyItem.id}>
                            <div>
                                {companyItem.products.map((productItem) => (
                                    <div key={productItem.id}>
                                        <div>
                                            <div className='symbol symbol-100px symbol-lg-100px symbol-fixed position-relative bg-light'>
                                                <ImageAtom
                                                    src={productItem.logo}
                                                    alt={productItem.name}
                                                    className='img-fluid card-img-top'
                                                />
                                            </div>
                                            <div className='card-body'>
                                                <h5 className='card-title'>
                                                    {productItem.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>{companyItem.name}</p>
                        </div>
                    ))}
                </div>
            )}
            {data && <NotFound title='Products' />}
        </div>
    );
};

export default ProductList;

{
    /* <div key={product.id} className='col-6 col-md-3 m-5'>
    <div className='card card-flush h-md-50  mb-xl-10 border shadow-sm'>
        <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative bg-light'>
            <ImageAtom
                src={product.logo}
                alt={product.name}
                className='img-fluid card-img-top'
            />
        </div>
        <div className='card-body'>
            <h5 className='card-title'>{product.name}</h5>
        </div>
    </div>
</div>; */
}
