import { useContext, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { IProductResponse } from "../../../types/payload.type";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { CompanyContext } from "../../../context/CompanyContext";
import { toast } from "react-toastify";
import NotFound from "../../shared/molecules/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import ImageAtom from "../../shared/atoms/ImageAtom";
import useMutation from "../../../hooks/useMutation";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { companyInfo, isCompanyAdmin } = useContext(CompanyContext);
    const { productId } = useParams<{ productId: string }>();
    console.log(productId, "productId");
    const getProductByItem = `${API_ROUTE.GET_PRODUCTS_BY_ID}/${productId}`;
    const {
        error,
        data: product,
        fetchDataById,
        isloading,
    } = useFetch<IProductResponse>(getProductByItem, true);

    const buyProductForCOmpany = `${API_ROUTE.BUY_COMPANY_PRODUCT_BY_ID}/${companyInfo.id}/products`;

    const {
        postData,
        error: postError,
        isLoading,
    } = useMutation<IProductResponse>(buyProductForCOmpany, true);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (postError) {
            toast.error(postError);
        }
    }, [postError]);

    useEffect(() => {
        if (productId) {
            fetchDataById(getProductByItem);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const handleBuyProduct = async () => {
        if (!isCompanyAdmin || !companyInfo) return;
        const payload = {
            product_ids: [productId],
        };
        const response = await postData(payload);
        if (response?.status === 201) {
            toast.success("Product bought successfully");
            navigate(`/home/${companyInfo.subdomain}`);
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='py-6 px-3'>
            {isloading && <LoadingSpinner title='loading...' />}
            {product && (
                <div>
                    {product && (
                        <div key={product.id}>
                            <div className='card card-flush h-md-50  mb-xl-10 h-100vh p-6'>
                                <div className='row'>
                                    <div className='col-3'>
                                        <div>
                                            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative bg-light'>
                                                <ImageAtom
                                                    src={product.logo}
                                                    alt={product.name}
                                                    className='img-fluid'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-5'>
                                        <div className='card-body'>
                                            <h3 className='card-title'>
                                                {product.name}
                                            </h3>
                                        </div>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className='col-4'>
                                        {isCompanyAdmin && (
                                            <div className='float-end'>
                                                <button
                                                    onClick={handleBuyProduct}
                                                    disabled={isLoading}
                                                    className='btn btn-primary my-6'>
                                                    Buy Product for Company
                                                </button>
                                            </div>
                                        )}
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
