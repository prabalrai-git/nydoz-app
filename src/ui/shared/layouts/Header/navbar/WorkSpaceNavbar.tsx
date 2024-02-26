import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../../../context/auth/useAuthContext";
import { NavLink } from "react-router-dom";
import MyProducts from "./MyProducts";
import { useOnClickOutside } from "usehooks-ts";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { BoxArrowRight, BuildingAdd, GearWide } from "react-bootstrap-icons";
import UserCompanyAndProducts from "./products/UserCompanyAndProducts";
import Images from "../../../../../constants/Images";
import AllPublicProductsDropdown from "./products/AllPublicProductsDropdown";

const Navbar = () => {
  const productRef = useRef(null);
  const { isLoggedIn, dispatch } = useAuthContext();
  const navigate = useNavigate();
  useOnClickOutside(productRef, () => setShowProducts(false));
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const logoutFn = () => {
    const rememberMeFromLocal = localStorage.getItem("rememberMe");
    if (rememberMeFromLocal) {
      localStorage.removeItem("token");
      localStorage.removeItem("rememberMe");
    } else {
      sessionStorage.removeItem("token");
    }
    navigate("/auth/login");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className=" navbar navbar-expand-lg bg-body-tertiary navbar-wrapper bg-white fixed-top">
      <div className="container-lg">
        <div className="inner-container">
          <div className="left-container">
            <NavLink className="navbar-brand" to="/">
              <img
                className="navbar-brand-img "
                src={Images.CompanyLogo}
                alt="Company Logo"
              />
            </NavLink>
            <div ref={productRef} className="p-relative">
              <div className="nav-item ">
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
          <div className="right-container">
            {isLoggedIn ? (
              <>
                <LinkContainer className="cursor-pointer me-2" to="/workspace">
                  <div className="tw-flex tw-flex-row tw-items-center  ">
                    <p className="me-3">
                      <BuildingAdd size={16} color="#1e40d6" />
                    </p>
                    <p className="tw-self-end">Workspace</p>
                  </div>
                </LinkContainer>

                <NavDropdown title="My Account" id="nav-dropdown">
                  <NavDropdown.Item>
                    <LinkContainer
                      className="btn btn-light-primary btn-sm"
                      to="create-company"
                    >
                      {/* <div className="tw-w-[200px] tw-flex tw-flex-row tw-items-center tw-justify-center">
                        <p className="me-3">
                          <BuildingAdd size={16} color="#1ed63d" />
                        </p>
                        <p>Create New Company</p>
                      </div> */}
                      <div className="tw-flex gap-3">
                        <BuildingAdd
                          size={16}
                          color="#1ed63d"
                          className="tw-self-center"
                        />

                        <p className="tw-w-full">Create New Company</p>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <LinkContainer
                      className="btn btn-light-warning btn-sm w-100"
                      to="change-password"
                    >
                      <div className="tw-flex gap-3">
                        <GearWide size={16} color="#000000" />

                        <p>Change Password</p>
                      </div>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="text-center">
                      <div
                        className="btn btn-light-danger btn-sm w-100 tw-flex gap-3"
                        onClick={() => logoutFn()}
                      >
                        <BoxArrowRight size={16} color="#0b0b0b" />
                        <p className="me-3">Logout</p>
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
