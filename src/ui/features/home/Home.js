import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// home page no login
import ProductList from "../../shared/components/products/ProductList";
const Home = () => {
    return (_jsx("div", { className: 'bg-white h-100vh', children: _jsxs("section", { className: 'container-fluid my-3', children: [_jsx("div", { className: 'container my-3', children: _jsx("h3", { className: 'py-6', children: "Welcome to Nydoz" }) }), _jsx("div", { className: 'container ', children: _jsx("h3", { children: "Product List" }) }), _jsx(ProductList, {})] }) }));
};
export default Home;
