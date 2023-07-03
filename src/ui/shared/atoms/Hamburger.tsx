import { useMediaQuery } from "usehooks-ts";

const Hamburger = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    if (isSmallDevice || isMediumDevice) {
        return (
            <div
                className='btn btn-icon btn-flex btn-active-color-primary'
                id='kt_aside_mobile_toggle'>
                <i className='ki ki-menu fs-2'></i>
            </div>
        );
    } else {
        return (
            <div
                className='btn btn-icon btn-flex btn-active-color-primary'
                id='kt_docs_aside_toggle'>
                <i className='ki-duotone ki-abstract-14 fs-2'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                </i>{" "}
            </div>
        );
    }
};

export default Hamburger;
