import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import { useNavigate } from "react-router-dom";
import Modal2 from "../../shared/components/Modal2";
import LoadingPage from "../../features/utils/LoadingPage";
import ImageAtom from "../../shared/atoms/ImageAtom";
import useAuthContext from "../../../context/auth/useAuthContext";
import useMutation from "../../../hooks/useMutation";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import CompanyBreadcrumb from "../../shared/molecules/CompanyBreadcrumb";
import { Tag } from "antd";
const BuyProduct = () => {
    const { companyInfo } = useAuthContext();
    const companyId = companyInfo?.id;
    const [show, setShow] = useState(false);
    const buyProductForCompany = `${API_ROUTE.BUY_COMPANY_PRODUCT_BY_ID}/${companyInfo?.id}/products`;
    const proudctListUrl = `${API_ROUTE.GET_COMPANIES}/${companyId}/products`;
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState();
    const { postData, error: postError, isLoading: isLoadingBuyProduct, } = useMutation(buyProductForCompany, true);
    const [oldProductListArray, setOldProductListArray] = useState([]);
    const [newProductListArray, setNewProductListArray] = useState([]);
    const { data, error, isloading, fetchData } = useFetch(API_ROUTE.GET_PRODUCTS_LIST, true);
    const { data: companyProductData, fetchData: fetchCompanyProductsFn } = useFetch(proudctListUrl, true);
    useEffect(() => {
        if (companyProductData) {
            const companyProductList = companyProductData.map((item) => item.id);
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
    const handleNewProductAddToCart = (productId) => {
        const productList = [...newProductListArray];
        productList.push(productId);
        setNewProductListArray(productList);
    };
    const handleNewProductRemoveFromCart = (productId) => {
        const newProductList = [...newProductListArray];
        const index = newProductList.indexOf(productId);
        newProductList.splice(index, 1);
        setNewProductListArray(newProductList);
    };
    const handleSelectOldProduct = (product) => {
        setShow(true);
        setSelectedProduct(product);
    };
    const handleRemoveOldProduct = (productId) => {
        const oldProductList = [...oldProductListArray];
        const index = oldProductList.indexOf(productId);
        oldProductList.splice(index, 1);
        setOldProductListArray(oldProductList);
        setShow(false);
    };
    const handleAddOldProduct = (productId) => {
        const oldProductList = [...oldProductListArray];
        oldProductList.push(productId);
        setOldProductListArray(oldProductList);
    };
    const handleProductBuy = async () => {
        const allProducts = [...newProductListArray, ...oldProductListArray];
        if (allProducts.length === 0) {
            toast.error("No product selected. Please select atleast one product");
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
            navigate(`/company/dashboard`);
        }
        else {
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
    return (_jsxs("div", { className: " mt-3 p-6", children: [_jsx(CompanyBreadcrumb, { title: "Buy Products", showBreadcrumb: true, btnText: "Back" }), isloading && _jsx(LoadingPage, {}), _jsxs("section", { className: "p-6 bg-white my-6 tw-rounded-lg", children: [_jsxs("table", { className: "table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer border-bottom  ", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0", children: [_jsx("th", { className: "w-10px pe-2 sorting_disabled", children: "S.N" }), _jsx("th", { className: "min-w-250px sorting", children: "Products" }), _jsx("th", { className: "min-w-150px sorting", "aria-controls": "kt_ecommerce_category_table", "aria-label": "Category Type: activate to sort column ascending", children: "Price" }), _jsx("th", { className: "text-end min-w-70px sorting_disabled", children: "Action" })] }) }), _jsx("tbody", { className: "fw-semibold text-gray-600", children: data && companyProductData && (_jsx(_Fragment, { children: data?.map((product, index) => (_jsxs("tr", { className: "odd   ", children: [_jsx("td", { children: _jsx("div", { className: "form-check form-check-sm form-check-custom form-check-solid", children: _jsxs("span", { className: "fs-14", children: [" ", index + 1] }) }) }), _jsx("td", { children: _jsxs("div", { className: "d-flex", children: [_jsx("div", { className: "symbol symbol-50px shadow shadow-sm", children: _jsx(ImageAtom, { src: product.logo, alt: "logo", className: "img-fluid " }) }), _jsxs("div", { className: "ms-5", children: [_jsx("div", { className: "text-gray-800 text-hover-primary fs-5 fw-bold mb-1", children: product.name }), _jsx("div", { className: "text-muted fs-7 fw-bold", children: product.description })] })] }) }), _jsx("td", { children: _jsx(Tag, { color: "green", children: "Automated" }) }), _jsx("td", { className: "text-end", children: companyProductData?.some((companyProductItem) => companyProductItem.id === product.id) ? (_jsx(_Fragment, { children: oldProductListArray?.some((newProductItem) => newProductItem === product.id) ? (_jsx("button", { onClick: () => handleSelectOldProduct(product), title: "Remove from cart", className: "btn btn-light-danger min-w-150px btn-sm ", children: "Remove From Cart" })) : (_jsx("button", { onClick: () => handleAddOldProduct(product.id), title: "Undo the changes", className: "btn btn-primary min-w-150px btn-sm ", children: "Undo" })) })) : (_jsx(_Fragment, { children: newProductListArray?.some((newProductItem) => newProductItem === product.id) ? (_jsx("button", { onClick: () => handleNewProductRemoveFromCart(product.id), title: "Remove this products to cart", className: "btn btn-warning min-w-150px btn-sm", children: "Remove From Cart" })) : (_jsx("button", { onClick: () => handleNewProductAddToCart(product.id), title: "Add this products to cart", className: "btn btn-success min-w-150px btn-sm", children: "Add To Cart" })) })) })] }, product.id))) })) })] }), _jsx("div", { className: "row", children: _jsx("div", { className: "d-grid gap-2 col-12 col-md-4  mx-auto", children: _jsx("button", { onClick: handleProductBuy, disabled: isLoadingBuyProduct, className: "btn tw-bg-btnPrimary tw-text-white hover:tw-bg-btnPrimaryHover hover:tw-text-white btn-block my-6", children: isLoadingBuyProduct ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "ms-2", children: "Please Wait..." }), _jsx(Spinner, { size: "sm", animation: "border", role: "status" })] })) : (_jsx("span", { children: " Buy Now" })) }) }) })] }), _jsx(Modal2, { handleConfirm: () => handleRemoveOldProduct(selectedProduct?.id ?? ""), showChildren: true, show: show, title: "Are you sure ?", cancelText: "Cancel", confirmText: "Yes", handleClose: () => setShow(false), children: _jsxs("div", { className: "text-center", children: [_jsxs("p", { children: ["Are you sure you want to remove", " ", _jsx("span", { className: "fw-bold", children: selectedProduct?.name }), " from cart ?"] }), _jsx("p", { className: "text-danger", children: "Product once removed must be purchased again for use." })] }) })] }));
};
export default BuyProduct;
