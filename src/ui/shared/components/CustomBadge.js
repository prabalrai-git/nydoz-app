import { jsx as _jsx } from "react/jsx-runtime";
const CustomBadge = ({ backgroundColor, title }) => {
    return (_jsx("div", { className: "tw-text-sm tw-font-semibold tw-rounded-md tw-px-2 tw-py-1 tw-opacity-10 ", style: {
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 2,
            borderStyle: "solid",
            color: backgroundColor,
            opacity: 1,
        }, children: _jsx("span", { children: title }) }));
};
export default CustomBadge;
