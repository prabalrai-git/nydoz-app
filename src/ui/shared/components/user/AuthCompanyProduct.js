import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ desc Products list brought by company
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
import LoadingSpinner from "../../molecules/LoadingSpinner";
import NotFound from "../../molecules/NotFound";
import ImageAtom from "../../atoms/ImageAtom";
import { useNavigate } from "react-router-dom";
const ProductList = () => {
    const navigate = useNavigate();
    const { data, fetchDataById, isloading } = useFetch(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS, true);
    useEffect(() => {
        fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
    }, [fetchDataById]);
    const handleProductClick = (productId, subdomain) => {
        navigate(`/${subdomain}/products/${productId}`);
    };
    return (_jsxs("div", { children: [isloading && _jsx(LoadingSpinner, { title: "loading..." }), data && (_jsx("div", { className: "row", children: data?.companies?.map((companyItem) => {
                    if (companyItem?.products?.length === 0)
                        return null;
                    return (_jsxs("div", { className: "col-12 border-secondary  border-bottom  py-3 my-3 w-100", children: [_jsx("h4", { className: "fs-14 fw-bolder my-3", children: companyItem.name }), _jsx("div", { className: "d-flex", children: companyItem?.products?.map((productItem) => (_jsx("div", { onClick: () => {
                                        handleProductClick(productItem.id, companyItem.subdomain);
                                    }, className: "d-flex w-100 ", children: _jsxs("div", { className: "rounded-2 border border-secondary shadow shadow-sm m-3 p-2 shadow-sm  rounded text-center product-box", children: [_jsx("div", { className: "symbol symbol-75px symbol-lg-75px symbol-fixed position-relative bg-light", children: _jsx(ImageAtom, { src: productItem.logo, alt: productItem.name, className: "img-fluid card-img-top" }) }), _jsx("div", { children: _jsx("h5", { children: productItem.name }) })] }) }, productItem.id))) })] }, companyItem.id));
                }) })), _jsxs("div", { className: "card", children: [data?.companies?.length === 0 && (_jsx(NotFound, { title: "Products Not Found. Create company to use product." })), !isloading &&
                        data?.companies &&
                        data?.companies?.length > 0 &&
                        data?.companies[0]?.products?.length === 0 && (_jsx(NotFound, { title: "you are not subscribed to any products." }))] })] }));
};
export default ProductList;
