import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='text-center'>
                <h1 className='display-1 fw-bold'>404</h1>
                <p className='fs-3'>
                    {" "}
                    <span className='text-danger'>Opps!</span> Page not found.
                </p>
                <p className='lead'>
                    The page you’re looking for doesn’t exist.
                </p>
                <div>
                    <Link to='/' className='btn btn-secondary   mx-3'>
                        Go Home
                    </Link>
                    <button
                        onClick={() => navigate(-1)}
                        className=' btn btn-primary   mx-3'>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
