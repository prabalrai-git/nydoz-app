import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "react-bootstrap-icons";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa6";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  console.log(text);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="btn " title="Copy" onClick={() => copyToClipboard()}>
      {copied ? (
        // <ClipboardCheck title="Copied" color="#70b541" size={18} />
        <FaClipboardCheck title="Copied" color="#70b541" size={18} />
      ) : (
        <FaClipboard title="Copied" color="gray" size={18} />
      )}
    </div>
  );
};

export default CopyToClipboard;
