import Breadcrumb from "./Breadcrumb";

interface IHeadingProps {
    title: string;
    btnText: string;
    showBreadcrumb?: boolean;
}

const Heading = (props: IHeadingProps) => {
    const { title, btnText, showBreadcrumb } = props;

    return (
        <div className='app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100 '>
            <div className='page-title d-flex flex-column justify-content-center gap-1 me-3'>
                <h1 className='page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0'>
                    {title}
                </h1>
                {showBreadcrumb && (
                    <Breadcrumb
                        parentLink='/account/dashboard'
                        parent='Company'
                        child='Overview'
                    />
                )}
            </div>

            <div className='d-flex align-items-center gap-2 gap-lg-3'>
                <button className='btn btn-flex btn-secondary  h-40px fs-7 fw-bold'>
                    {btnText}
                </button>
            </div>
        </div>
    );
};

export default Heading;
