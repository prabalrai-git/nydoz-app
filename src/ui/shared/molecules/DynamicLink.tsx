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
  const appEnvironment = APP_SETTING.ENVIRONMENT;
  const { subdomain, pathName, children, className } = props;
  const { hasSubdomain, domainBase, protocol } = useWebSetting();

  // const clientManagement = `http://localhost:5173/workspace/mozilla/products/client-management/dashboard`;

  return (
    <>
      {appEnvironment !== "development" ? (
        <>
          {hasSubdomain ? (
            <Link to={pathName} className={className}>
              {children}
            </Link>
          ) : (
            <a
              href={`${protocol}://www.${subdomain}.${domainBase}/${pathName}`}
              className={className}
            >
              {children}
              <h6>
                {`${protocol}://www.${subdomain}.${domainBase}/${pathName}`}
              </h6>
            </a>
          )}
        </>
      ) : (
        <Link
          to={`http://${subdomain}.localhost:5174/workspace/${pathName}`}
          className={className}
        >
          {children}
        </Link>
        // <Link to={`/workspace/${pathName}`} className={className}>
        //   {children}
        // </Link>
      )}
    </>
  );
};

export default DynamicLink;
