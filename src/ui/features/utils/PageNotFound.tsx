import { Link, useNavigate } from "react-router-dom";
// import PublicNavbar from "../../shared/layouts/Header/navbar/PublicNavbar";
import WorkSpaceNavbar from "../../shared/layouts/Header/navbar/WorkSpaceNavbar";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* <PublicNavbar /> */}
      {/* <WorkSpaceNavbar /> */}
      <div className="d-flex align-items-center justify-content-center h-75vh ">
        <div className="text-center  tw-flex tw-flex-col tw-gap-12 ">
          <h1 className="display-1 fw-bold">404</h1>

          <div>
            <p className="fs-3">
              <span className="text-danger">Oops!</span> Page not found.
            </p>
            <br />
            <p className="lead ">The page you’re looking for doesn’t exist.</p>
          </div>
          <div>
            <Link to="/" className="btn btn-secondary  mx-3">
              Go Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className=" btn btn-primary  mx-3 hover:tw-bg-btnPrimaryHover"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
