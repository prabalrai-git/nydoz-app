// @ desc Products list component in dashbaord
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import ProductItem2 from "./ProductItem2";
import { IProductResponse } from "../../../../types/payload.type";
import LoadingPage from "../../../features/utils/LoadingPage";

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
        <div className='row'>
            {isloading && <LoadingPage />}
            {data?.map((product: IProductResponse) => (
                <div className='col-12 col-md-4   '>
                    <ProductItem2
                        link='/home/sabkura/products'
                        product={product}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
