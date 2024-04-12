import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Card = (props) => {
    const { title, description } = props;
    return (_jsx("div", { className: 'card', children: _jsxs("div", { className: 'card-body', children: [_jsx("h5", { className: 'card-title', children: title }), _jsx("p", { className: 'card-text', children: description })] }) }));
};
export default Card;
