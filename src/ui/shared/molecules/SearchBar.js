import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
const SearchBar = (props) => {
    const { placeholder, searchTerm, setSearchTerm } = props;
    const [value, setValue] = useState("");
    useEffect(() => {
        if (value.length <= 3) {
            return;
        }
        else {
            const timer = setTimeout(() => setSearchTerm(value), 500);
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };
    const resetSearchTerm = () => {
        setValue("");
        setSearchTerm("");
    };
    return (_jsxs(InputGroup, { size: 'sm', className: 'mb-3', children: [_jsx(Form.Control, { type: 'text', value: value, onChange: handleInputChange, placeholder: placeholder }), searchTerm.length > 0 && (_jsx(Button, { size: 'sm', onClick: resetSearchTerm, variant: 'warning', children: _jsx("i", { className: 'fa fa-close', "aria-hidden": 'true' }) }))] }));
};
export default SearchBar;
