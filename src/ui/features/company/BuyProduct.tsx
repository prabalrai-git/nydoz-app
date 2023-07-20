// @ desc Products list component in dashbaord
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { useNavigate } from "react-router-dom";
import Modal2 from "../../shared/components/Modal2";
import { IProductResponse } from "../../../types/payload.type";
import LoadingPage from "../../features/utils/LoadingPage";
import ImageAtom from "../../shared/atoms/ImageAtom";
import Breadcrumb from "../../shared/molecules/Breadcrumb";
import Heading from "../../shared/molecules/Heading";
import useAuthContext from "../../../context/auth/useAuthContext";
import useMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const BuyProduct = () => {
    // const surl =
    //     "https://api.dev.nydoz.com/api/v1/companies/99a0d2c3-22a9-4ddf-8970-a1a7637cffdb/social-links";
    // const reactUrl =
    //     "https://api.dev.nydoz.com/v1/companies/99a0d2c3-22a9-4ddf-8970-a1a7637cffdb/social-links";
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [show, setShow] = useState(false);
    const buyProductForCompany = `${API_ROUTE.BUY_COMPANY_PRODUCT_BY_ID}/${companyInfo?.id}/products`;
    const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<IProductResponse>();
    const {
        postData,
        error: postError,
        isLoading: isLoadingBuyProduct,
    } = useMutation<IProductResponse>(buyProductForCompany, true);
    const [oldProductListArray, setOldProductListArray] = useState<string[]>(
        []
    );
    const [newProductListArray, setNewProductListArray] = useState<string[]>(
        []
    );
    const { data, error, isloading, fetchData } = useFetch<IProductResponse[]>(
        API_ROUTE.GET_PRODUCTS_LIST,
        true
    );

    const { data: companyProductData, fetchData: fetchCompanyProductsFn } =
        useFetch<IProductResponse[]>(proudctListUrl, true);

    useEffect(() => {
        if (companyProductData) {
            const companyProductList = companyProductData.map(
                (item) => item.id
            );
            setOldProductListArray(companyProductList);
        }
    }, [companyProductData]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchCompanyProductsFn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNewProductAddToCart = (productId: string) => {
        const productList = [...newProductListArray];
        productList.push(productId);
        setNewProductListArray(productList);
    };

    const handleNewProductRemoveFromCart = (productId: string) => {
        const newProductList = [...newProductListArray];
        const index = newProductList.indexOf(productId);
        newProductList.splice(index, 1);
        setNewProductListArray(newProductList);
    };

    const handleSelectOldProduct = (product: IProductResponse) => {
        setShow(true);
        setSelectedProduct(product);
    };

    const handleRemoveOldProduct = (productId: string) => {
        const oldProductList = [...oldProductListArray];
        const index = oldProductList.indexOf(productId);
        oldProductList.splice(index, 1);
        setOldProductListArray(oldProductList);
        setShow(false);
    };

    const handleAddOldProduct = (productId: string) => {
        const oldProductList = [...oldProductListArray];
        oldProductList.push(productId);
        setOldProductListArray(oldProductList);
    };

    const handleProductBuy = async () => {
        const allProducts = [...newProductListArray, ...oldProductListArray];

        if (allProducts.length === 0) {
            toast.error(
                "No product selected. Please select atleast one product"
            );
            return;
        }

        // const haveSameElements =
        //     allProducts.length === oldProductListArray.length &&
        //     allProducts.every((item) => oldProductListArray.includes(item));

        // if (haveSameElements) {
        //     toast.error("No change in products. Please select new products");
        //     return;
        // }

        const payload = {
            product_ids: allProducts,
        };
        const response = await postData(payload);
        if (response?.status === 201) {
            toast.success("Product bought successfully");
            navigate(`/home/${companyInfo?.subdomain}/dashboard`);
        } else {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (postError) {
            toast.error(postError);
        }
    }, [postError]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className=' mt-3 p-6'>
            <Heading title='Buy Products' btnText='Back' showBreadcrumb={true}>
                <Breadcrumb
                    parent='products'
                    parentLink='/account/company/list'
                    child='Buy'
                />
            </Heading>
            {isloading && <LoadingPage />}
            <section className='p-6 bg-white my-6'>
                <table className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer border-bottom  '>
                    <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                            <th className='w-10px pe-2 sorting_disabled'>
                                S.N
                            </th>
                            <th className='min-w-250px sorting'>Products</th>
                            <th
                                className='min-w-150px sorting'
                                aria-controls='kt_ecommerce_category_table'
                                aria-label='Category Type: activate to sort column ascending'>
                                Price
                            </th>
                            <th className='text-end min-w-70px sorting_disabled'>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className='fw-semibold text-gray-600'>
                        {data && companyProductData && (
                            <>
                                {data?.map(
                                    (
                                        product: IProductResponse,
                                        index: number
                                    ) => (
                                        <tr key={product.id} className='odd   '>
                                            <td>
                                                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                                    <span className='fs-14'>
                                                        {" "}
                                                        {index + 1}
                                                    </span>
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
                                                            {
                                                                product.description
                                                            }
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
                                                {companyProductData?.some(
                                                    (
                                                        companyProductItem: IProductResponse
                                                    ) =>
                                                        companyProductItem.id ===
                                                        product.id
                                                ) ? (
                                                    <>
                                                        {oldProductListArray?.some(
                                                            (
                                                                newProductItem: string
                                                            ) =>
                                                                newProductItem ===
                                                                product.id
                                                        ) ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleSelectOldProduct(
                                                                        product
                                                                    )
                                                                }
                                                                title='Remove from cart'
                                                                className='btn btn-warning min-w-150px btn-sm '>
                                                                Already
                                                                Purchased
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleAddOldProduct(
                                                                        product.id
                                                                    )
                                                                }
                                                                title='Undo the changes'
                                                                className='btn btn-primary min-w-150px btn-sm '>
                                                                Undo
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {newProductListArray?.some(
                                                            (
                                                                newProductItem: string
                                                            ) =>
                                                                newProductItem ===
                                                                product.id
                                                        ) ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleNewProductRemoveFromCart(
                                                                        product.id
                                                                    )
                                                                }
                                                                title='Remove this products to cart'
                                                                className='btn btn-warning min-w-150px btn-sm'>
                                                                Remove From Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleNewProductAddToCart(
                                                                        product.id
                                                                    )
                                                                }
                                                                title='Add this products to cart'
                                                                className='btn btn-success min-w-150px btn-sm'>
                                                                Add To Cart
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </>
                        )}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-12 col-md-9 my-6 '>
                        <h5>
                            Total Price: <span> 777</span>
                        </h5>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='float-end my-6 border-top'>
                            <button
                                onClick={handleProductBuy}
                                disabled={isLoadingBuyProduct}
                                className='btn btn-primary btn-lg'>
                                {isLoadingBuyProduct ? (
                                    <>
                                        <span className='ms-2'>
                                            Please Wait...
                                        </span>
                                        <Spinner
                                            size='sm'
                                            animation='border'
                                            role='status'></Spinner>
                                    </>
                                ) : (
                                    <span> Buy Now</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal2
                handleConfirm={() =>
                    handleRemoveOldProduct(selectedProduct?.id ?? "")
                }
                showChildren={true}
                show={show}
                title='Are you sure ?'
                cancelText='Cancel'
                confirmText='Yes'
                handleClose={() => setShow(false)}>
                <div className='text-center'>
                    <p>
                        Are you sure you want to remove{" "}
                        <span className='fw-bold'>{selectedProduct?.name}</span>{" "}
                        from cart ?
                    </p>
                    <p className='text-danger'>
                        Product once removed must be purchased again for use.
                    </p>
                </div>
            </Modal2>
        </div>
    );
};

export default BuyProduct;
