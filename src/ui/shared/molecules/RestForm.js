import { jsx as _jsx } from "react/jsx-runtime";
function FormReset({ reset, defaultValues, }) {
    const handleReset = () => {
        reset(defaultValues);
    };
    return (_jsx("button", { type: 'button', className: 'btn btn-light btn-sm', onClick: handleReset, children: "Reset" }));
}
export default FormReset;
