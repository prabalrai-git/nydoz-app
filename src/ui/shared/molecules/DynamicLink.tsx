import React from "react";
import APP_SETTING from "../../../config/AppSetting";
import { Link } from "react-router-dom";
import useWebSetting from "../../../context/useWebSetting";

interface Iprops {
    subdomain: string;
    pathName: string;
    children: React.ReactNode;
    className: string;
}

const DynamicLink = (props: Iprops) => {
    const appEnvironment = APP_SETTING.PROD;
    const domain = APP_SETTING.DOMAIN;
    const { subdomain, pathName, children, className } = props;
    const { hasSubdomain } = useWebSetting();

    return (
        <>
            {appEnvironment ? (
                <>
                    {hasSubdomain ? (
                        <Link to={pathName} className={className}>
                            {children}
                        </Link>
                    ) : (
                        <a
                            href={`https://www.${subdomain}.${domain}/${subdomain}${pathName}`}
                            className={className}>
                            {children}
                        </a>
                    )}
                </>
            ) : (
                <Link to={`/workspace${pathName}`} className={className}>
                    {children}
                </Link>
            )}
        </>
    );
};

export default DynamicLink;
