// @ desc Products list component in dashbaord
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import { IProductResponse } from "../../../../types/payload.type";
import LoadingPage from "../../../features/utils/LoadingPage";
import ImageAtom from "../../atoms/ImageAtom";
import useHandleShowError from "../../../../hooks/useHandleShowError";

const ProductList = () => {
    const { data, error, isloading, fetchData } = useFetch<IProductResponse[]>(
        API_ROUTE.GET_PRODUCTS_LIST,
        true
    );

    useHandleShowError(error);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className=' bg-white  p-6'>
            {isloading && <LoadingPage />}
            <section className=' container'>
                <div className='d-flex'>
                    {data?.map((product: IProductResponse) => (
                        <div
                            key={product.id}
                            className='flex-wrap cursor-pointer'>
                            <div className='rounded-2 border border-secondary shadow shadow-sm m-3 p-6 shadow-sm  rounded text-center product-box mx-3'>
                                <div className='symbol symbol-100px symbol-lg-100px symbol-fixed position-relative bg-light'>
                                    <ImageAtom
                                        src={product.logo}
                                        alt={product.name}
                                        className='img-fluid card-img-top'
                                    />
                                </div>
                                <div className='card-body'>
                                    <h5 className='card-title mt-6 mb-4'>
                                        {product.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductList;
