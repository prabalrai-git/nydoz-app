import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IProductResponse } from "../../../types/payload.type";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { useParams } from "react-router-dom";

const ProductList = () => {
    const { id: companyId } = useParams<string>();
    const proudctListUrl = `${API_ROUTE.GET_DOCUMENTS_BY_COMPANY_ID}/${companyId}/products`;
    const { data, fetchData, isloading } = useFetch<IProductResponse[]>(
        proudctListUrl,
        true
    );

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='py-6'>
            <h1>Product List</h1>
            {isloading && <LoadingSpinner title='loading...' />}
            {data && data.length > 0 && (
                <div>
                    {data.map((product) => (
                        <div key={product.id} className='col-6 col-md-3 m-5'>
                            <div className='card card-flush h-md-50  mb-xl-10 '>
                                <img
                                    src={product?.logo}
                                    className='card-img-top'
                                    alt='logo'
                                />
                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        {product.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
