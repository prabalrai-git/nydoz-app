import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "react-bootstrap-icons";

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
        <button className='btn' title='Copy' onClick={copyToClipboard}>
            {copied ? (
                <ClipboardCheck title='Copied' color='#70b541' size={20} />
            ) : (
                <Clipboard title='Copy' size={20} />
            )}
        </button>
    );
};

export default CopyToClipboard;
