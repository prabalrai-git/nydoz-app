import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import API_ROUTE from "../../../../service/api";
const ViewPaymentMethod = () => {
    const { id } = useParams();
    const { fetchDataById } = useFetch(API_ROUTE.PAYMENT_METHODS, true);
    useEffect(() => {
        if (id)
            fetchDataById(`${API_ROUTE.PAYMENT_METHODS}/${id}}`);
    }, [fetchDataById, id]);
    return (_jsxs("div", { className: 'card', children: [_jsxs("div", { className: 'card-header', children: [_jsx("h3", { className: 'card-title', children: "Payment Method" }), _jsx("div", { className: 'card-toolbar', children: _jsx("button", { type: 'button', className: 'btn btn-sm btn-light', children: "Edit" }) })] }), _jsx("div", { className: 'card-body' })] }));
};
export default ViewPaymentMethod;
