import React from "react";
import { Link } from "react-router-dom";

interface INavigateButtonProps {
    title: string;
    to: string;
}

const NavigateButton = () => {
    return <Link>{title}</Link>;
};

export default NavigateButton;
