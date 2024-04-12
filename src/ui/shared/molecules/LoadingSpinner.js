import { jsx as _jsx } from "react/jsx-runtime";
import Spinner from "react-bootstrap/Spinner";
const LoadingSpinner = (props) => {
    const { title } = props;
    return (_jsx(Spinner, { variant: 'primary', animation: 'border', role: 'status', children: _jsx("span", { className: 'visually-hidden', children: title }) }));
};
export default LoadingSpinner;
