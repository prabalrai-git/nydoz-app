import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ desc Products list component in dashbaord
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import LoadingPage from "../../../features/utils/LoadingPage";
import ImageAtom from "../../atoms/ImageAtom";
import useHandleShowError from "../../../../hooks/useHandleShowError";
const ProductList = () => {
    const { data, error, isloading, fetchData } = useFetch(API_ROUTE.GET_PRODUCTS_LIST, true);
    useHandleShowError(error);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsxs("div", { className: "tw-w-full ", children: [isloading && _jsx(LoadingPage, {}), _jsx("section", { className: "", children: _jsx("div", { className: "d-flex justify-content-start tw-flex tw-w-full ", children: data?.map((product) => (_jsx("div", { className: "flex-wrap cursor-pointer", children: _jsxs("div", { className: "rounded-2 border border-secondary  m-3 p-6  rounded text-center product-box mx-3 tw-shadow-sm hover:tw-shadow-md  tw-drop-shadow-sm", children: [_jsx("div", { className: "symbol symbol-100px symbol-lg-100px symbol-fixed position-relative tw-bg-gray-100 tw-w-full", children: _jsx(ImageAtom, { src: product.logo, alt: product.name, className: "img-fluid card-img-top" }) }), _jsx("div", { className: "card-body", children: _jsx("h5", { className: "card-title tw-text-lg tw-font-medium", children: product.name }) })] }) }, product.id))) }) })] }));
};
export default ProductList;
