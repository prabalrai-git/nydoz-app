interface IHeadingProps {
    text: string;
    btnText: string;
    showBtn: boolean;
}

import Breadcrumb from "./Breadcrumb";

const Heading = (props: IHeadingProps) => {
    const { text, btnText, showBtn } = props;

    return (
        <div className='app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100'>
            <div className='page-title d-flex flex-column justify-content-center gap-1 me-3'>
                <h1 className='page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0'>
                    Overview
                </h1>
                <Breadcrumb
                    parentLink='/account/dashboard'
                    parent='Company'
                    child='Overview'
                />
            </div>

            <div className='d-flex align-items-center gap-2 gap-lg-3'>
                <a
                    href='#'
                    className='btn btn-flex btn-warning h-40px fs-7 fw-bold'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_create_campaign'>
                    {btnText}
                </a>
            </div>
        </div>
    );
};

export default Heading;
