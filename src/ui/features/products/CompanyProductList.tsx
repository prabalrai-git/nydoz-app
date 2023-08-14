// @ desc Products list brought by company

import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IProductResponse } from "../../../types/payload.type";
import { toast } from "react-toastify";
import NotFound from "../../shared/molecules/NotFound";
import ImageAtom from "../../shared/atoms/ImageAtom";
import useAuthContext from "../../../context/auth/useAuthContext";
import { Link } from "react-router-dom";
import LoadingPage from "../utils/LoadingPage";

const ProductList = () => {
    const { companyInfo, isCompanyOwner } = useAuthContext();
    const companyId = companyInfo?.id;
    const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;

    console.log("proudctListUrl", proudctListUrl);
    const { data, fetchData, isloading } = useFetch<IProductResponse[]>(
        proudctListUrl,
        true
    );

    useEffect(() => {
        if (companyId) {
            fetchData();
        } else {
            toast.error("Company Id not found");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId]);

    return (
        <div>
            {isloading && <LoadingPage />}
            {data && data.length > 0 && (
                <div className='d-flex'>
                    {data.map((product) => (
                        <Link
                            to={`/workspace/${companyInfo?.subdomain}/products/${product.id}`}
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
                                    <h5 className='card-title mt-6 mb-4 text-primary'>
                                        {product.name}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {data && data?.length === 0 && (
                <div>
                    <h3 className='text-warning text-center'>
                        This company is not subscribed to any products .
                    </h3>
                </div>
            )}
        </div>
    );
};

export default ProductList;
