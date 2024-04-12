import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import API_ROUTE from "../../../service/api";
import LoadingSpinner from "../../shared/molecules/LoadingSpinner";
import { toast } from "react-toastify";
import NotFound from "../../shared/molecules/NotFound";
import { useParams } from "react-router-dom";
import ImageAtom from "../../shared/atoms/ImageAtom";
const SingleProduct = () => {
    const { productId } = useParams();
    const getProductByItem = `${API_ROUTE.GET_PRODUCTS_BY_ID}/${productId}`;
    const { error, data: product, fetchDataById, isloading, } = useFetch(getProductByItem, true);
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
    return (_jsxs("div", { className: "py-6 px-3", children: [isloading && _jsx(LoadingSpinner, { title: "loading..." }), product && (_jsx("div", { children: product && (_jsx("div", { children: _jsx("div", { className: "card card-flush h-md-50  mb-xl-10 h-100vh p-6", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-3", children: _jsx("div", { children: _jsx("div", { className: "symbol symbol-100px symbol-lg-160px symbol-fixed position-relative bg-light", children: _jsx(ImageAtom, { src: product.logo, alt: product.name, className: "img-fluid" }) }) }) }), _jsxs("div", { className: "col-5", children: [_jsx("div", { className: "card-body", children: _jsx("h3", { className: "card-title", children: product.name }) }), _jsx("p", { children: product.description })] })] }) }) }, product.id)) })), !product && _jsx(NotFound, { title: "Product" })] }));
};
export default SingleProduct;
