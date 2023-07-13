// @ desc Products list brought by company

import { useContext, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IProductResponse } from "../../../types/payload.type";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { CompanyContext } from "../../../context/CompanyContext";
import { toast } from "react-toastify";
import NotFound from "../../shared/molecules/NotFound";
import ImageAtom from "../../shared/atoms/ImageAtom";

const ProductList = () => {
    const { companyInfo } = useContext(CompanyContext);
    const companyId = companyInfo?.id;
    const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;
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
        <div className='py-6 px-3'>
            {isloading && <LoadingSpinner title='loading...' />}
            {data && data.length > 0 && (
                <div>
                    {data.map((product) => (
                        <div key={product.id} className='col-6 col-md-3 m-5'>
                            <div className='card card-flush h-md-50  mb-xl-10 border shadow-sm'>
                                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative bg-light'>
                                    <ImageAtom
                                        src={product.logo}
                                        alt={product.name}
                                        className='img-fluid card-img-top'
                                    />
                                </div>
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
            {data && data?.length === 0 && <NotFound title='Product' />}
        </div>
    );
};

export default ProductList;
