import { useContext, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IProductResponse } from "../../../types/payload.type";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { CompanyContext } from "../../../context/CompanyContext";
import { toast } from "react-toastify";
import NotFound from "../../shared/molecules/NotFound";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { productId } = useParams<{ productId: string }>();
    console.log(productId, "productId");
    const getProductByItem = `${API_ROUTE.GET_PRODUCTS_BY_ID}/${productId}`;
    const {
        error,
        data: product,
        fetchDataById,
        isloading,
    } = useFetch<IProductResponse>(getProductByItem, true);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (productId) {
            fetchDataById(getProductByItem);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    return (
        <div className='py-6 px-3'>
            {isloading && <LoadingSpinner title='loading...' />}
            {product && (
                <div>
                    {product && (
                        <div key={product.id}>
                            <div className='card card-flush h-md-50  mb-xl-10 h-100vh px-6'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <img
                                            src={product?.logo}
                                            className='card-img-top'
                                            alt='logo'
                                        />
                                        <div className='card-body'>
                                            <h3 className='card-title'>
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <button className='btn btn-primary float-end'>
                                            Buy Product for Company
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!product && <NotFound title='Product' />}
        </div>
    );
};

export default SingleProduct;
