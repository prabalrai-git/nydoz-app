// @ desc Products list component in dashbaord

import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";

const ProductList = () => {
    const { data, error, loading } = useFetch(
        API_ROUTE.GET_PRODUCTS_LIST,
        true
    );

    return <div>products</div>;
};

export default ProductList;
