import RegisterLogo from "../../../assets/media/svg/RegisterLogo.svg";
import CompanyLogo from "../../../assets/media/svg/CompanyLogo.svg";

const Poster = () => {
    return (
        <div className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 bg-gradient-company'>
            <div className='d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100'>
                <a
                    href='../../demo31/dist/index.html'
                    className='mb-0 mb-lg-12'>
                    <img
                        alt='Logo'
                        src={CompanyLogo}
                        className='h-60px h-lg-75px'
                    />
                </a>
                <img
                    className='d-none d-lg-block mx-auto w-275px w-md-50 w-xl-400px mb-10 mb-lg-20'
                    src={RegisterLogo}
                    alt='campony'
                />
                <h1 className='d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7'>
                    Fast, Efficient and Productive
                </h1>
                <div className='d-none d-lg-block text-white fs-base text-center'>
                    In this kind of post,
                    <a
                        href='#'
                        className='opacity-75-hover text-warning fw-bold me-1'>
                        the blogger
                    </a>
                    introduces a person they’ve interviewed
                    <br />
                    and provides some background information about
                    <a
                        href='#'
                        className='opacity-75-hover text-warning fw-bold me-1'>
                        the interviewee
                    </a>
                    and their
                    <br />
                    work following this is a transcript of the interview.
                </div>
            </div>
        </div>
    );
};

export default Poster;
