import { Tooltip } from "antd";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="btn " title="Copy" onClick={() => copyToClipboard()}>
      {copied ? (
        <Tooltip title="Copied">
          <div className="hover:tw-bg-gray-200 tw-p-[7px] tw-rounded-md">
            <FaCheck title="Copied" color="#70b541" size={16} />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="Copy">
          <div className="hover:tw-bg-gray-200 tw-p-[7px] tw-rounded-md">
            <HiOutlineClipboardDocument title="Copied" color="gray" size={16} />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default CopyToClipboard;
