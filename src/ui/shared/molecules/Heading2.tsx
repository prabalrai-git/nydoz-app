export const Heading2 = () => {
    return (
        <div
            className='d-flex flex-wrap flex-stack mb-6'
            data-select2-id='select2-data-441-2tmc'>
            <h3 className='fw-bold my-2'>
                My Projects
                <span className='fs-6 text-gray-400 fw-semibold ms-1'>
                    Active
                </span>
            </h3>
            <div
                className='d-flex flex-wrap my-2'
                data-select2-id='select2-data-440-keky'>
                <a
                    href='#'
                    className='btn btn-primary btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_create_project'>
                    New Project
                </a>
            </div>
        </div>
    );
};
