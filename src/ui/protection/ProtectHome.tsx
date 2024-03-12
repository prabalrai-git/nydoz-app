import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import useSubdomain from "../../hooks/useSubdomain";

const ProtectHomeRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const subDomainFromUrl = useSubdomain();

  return (
    <div>
      {subDomainFromUrl ? (
        <Navigate to={`/${subDomainFromUrl}`} />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default ProtectHomeRoute;
