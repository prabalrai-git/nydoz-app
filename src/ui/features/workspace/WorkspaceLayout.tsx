import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import API_ROUTE from "../../../service/api";
import useAuthContext from "../../../context/auth/useAuthContext";
import useFetch from "../../../hooks/useFetch";
import { IUserCompanyProductsResponse } from "../../../types/payload.type";
import { CrossStorageClient } from "cross-storage";
import { hasSubdomain } from "../../../functions/helperFunctions";

const ProtectedUserLayout: React.FC = () => {
  const { isLoggedIn, token } = useAuthContext();
  const [subDomainDetected, setSubDomainDetected] = useState(false);
  const [render, setRender] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    const currentURL = window.location.href;
    const containsSubdomain = hasSubdomain(currentURL);

    setSubDomainDetected(containsSubdomain);
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("token") && subDomainDetected) {
  //     console.log("got inside");
  //     localStorage.setItem("token", localStorage.getItem("token"));
  //   }
  //   setRender(true);
  //   console.log("render ran");
  // }, []);
  console.log(window.location.href, "window loaction");

  useEffect(() => {
    if (subDomainDetected) {
      const storage = new CrossStorageClient("http://localhost:5174", {
        timeout: 5000,
        frameId: "storageFrame",
      });
      console.log(storage, "this is the storage");

      storage
        .onConnect()
        .then(function () {
          return storage.get("token");
        })
        .then(function (res) {
          console.log(res, "yes response");
          localStorage.setItem("token", res); // 2
        })
        .catch(function (err) {
          // Handle error

          console.log(err, "error from the cross-domain paackage");
        });
    }
    setRender(true);
    console.log("i ran");
  }, [subDomainDetected]);

  const { fetchDataById } = useFetch<IUserCompanyProductsResponse>(
    API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS,
    true
  );

  useEffect(() => {
    fetchDataById(API_ROUTE.GET_USER_COMPANY_AND_PRODUCTS);
  }, [fetchDataById]);

  return (
    render && (
      <div>
        <div>
          {isLoggedIn && token ? (
            <>
              <Outlet />
            </>
          ) : (
            <Outlet />
            // <Navigate to={"/auth/login"} state={{ from: location }} replace />
          )}
        </div>
      </div>
    )
  );
};

export default ProtectedUserLayout;
