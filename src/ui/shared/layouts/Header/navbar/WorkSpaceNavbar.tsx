import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { BuildingAdd } from "react-bootstrap-icons";
import UserCompanyAndProducts from "./products/UserCompanyAndProducts";
import Images from "../../../../../constants/Images";
import AllPublicProductsDropdown from "./products/AllPublicProductsDropdown";
import { RiLockPasswordFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsBuildingAdd } from "react-icons/bs";
import APP_SETTING from "../../../../../config/AppSetting";

const Navbar = () => {
  const productRef = useRef(null);
  const { isLoggedIn, dispatch } = useAuthContext();

  useOnClickOutside(productRef, () => setShowProducts(false));
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const logoutFn = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("rememberMe");
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    window.location.href = APP_SETTING.APP_BASE_URL + "/auth/login";
  };

  return (
    <nav className=" navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white fixed-top ">
      <div className="md:tw-w-11/12 lg:tw-w-11/12 xl:tw-w-9/12 sm:tw-w-11/12 xsm:tw-w-11/12  tw-mx-auto">
        <div className="inner-container  ">
          <div className="left-container">
            <NavLink className="navbar-brand" to="/">
              <img
                className="navbar-brand-img "
                src={Images.CompanyLogo}
                alt="Company Logo"
              />
            </NavLink>
            <div ref={productRef} className="p-relative">
              <div className="nav-item xsm:tw-hidden sm:tw-block ">
                <div
                  className="d-flex align-items-center  btn btn-light-primary  btn-sm "
                  onClick={() => setShowProducts(() => !showProducts)}
                >
                  <i className="ki-outline ki-abstract-26 fs-1 me-3 "></i>
                  <span className="fw-bold fs-7">
                    Products & Services
                    <i className="fas fa-chevron-down ms-2"></i>
                  </span>
                </div>
              </div>
              <div>
                <MyProducts showProduct={showProducts}>
                  {isLoggedIn ? (
                    <UserCompanyAndProducts />
                  ) : (
                    <AllPublicProductsDropdown />
                  )}
                </MyProducts>
              </div>
            </div>
          </div>
          <div className="right-container tw-absolute tw-right-3 -tw-bottom-2 ">
            {isLoggedIn ? (
              <>
                <a
                  className="cursor-pointer me-2"
                  href={APP_SETTING.APP_BASE_URL}
                >
                  <div className="tw-flex tw-flex-row tw-items-center  ">
                    <p className="me-3">
                      <BuildingAdd size={16} color="#1e40d6" />
                    </p>
                    <p className="tw-self-end">Workspace</p>
                  </div>
                </a>

                <NavDropdown title="My Account" id="nav-dropdown">
                  <NavDropdown.Item>
                    <LinkContainer className="btn  btn-sm" to="create-company">
                      {/* <div className="tw-w-[200px] tw-flex tw-flex-row tw-items-center tw-justify-center">
                        <p className="me-3">
                          <BuildingAdd size={16} color="#1ed63d" />
                        </p>
                        <p>Create New Company</p>
                      </div> */}
                      <div className="tw-flex gap-3">
                        {/* <BuildingAdd
                          size={16}
                          color="#1ed63d"
                          className="tw-self-center"
                        /> */}

                        <BsBuildingAdd size={16} color="black" />

                        <p className="tw-w-full tw-text-gray-600">
                          Create New Company
                        </p>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <LinkContainer
                      className="btn  btn-sm w-100"
                      to="change-password"
                    >
                      <div className="tw-flex gap-3">
                        {/* <GearWide size={16} color="#000000" /> */}
                        <RiLockPasswordFill size={16} color="black" />

                        <p className="tw-text-gray-600">Change Password</p>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="text-center">
                      <div
                        className="btn  btn-sm w-100 tw-flex gap-3"
                        onClick={() => logoutFn()}
                      >
                        {/* <BoxArrowRight  /> */}
                        <RiLogoutBoxRLine size={16} color="#0b0b0b" />
                        <p className="me-3 tw-text-gray-600">Logout</p>
                      </div>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div>
                <NavLink className="nav-link fw-bold " to="/auth/login">
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
