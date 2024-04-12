import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from "antd";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
const CopyToClipboard = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    };
    return (_jsx("div", { className: "btn ", title: "Copy", onClick: () => copyToClipboard(), children: copied ? (_jsx(Tooltip, { title: "Copied", children: _jsx("div", { className: "hover:tw-bg-gray-200 tw-p-[7px] tw-rounded-md", children: _jsx(FaCheck, { title: "Copied", color: "#70b541", size: 16 }) }) })) : (_jsx(Tooltip, { title: "Copy", children: _jsx("div", { className: "hover:tw-bg-gray-200 tw-p-[7px] tw-rounded-md", children: _jsx(HiOutlineClipboardDocument, { title: "Copied", color: "gray", size: 16 }) }) })) }));
};
export default CopyToClipboard;
