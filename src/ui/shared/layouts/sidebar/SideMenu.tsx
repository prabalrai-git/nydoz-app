const ProductSideMenu = () => {
    return (
        <div
            className='docs-aside'
            style={{
                width: "220px",
                marginRight: "10px",
            }}>
            <div className='docs-aside-menu flex-column-fluid p-3 bg-white'>
                <div
                    className='hover-scroll-overlay-y mt-5 mb-5 mt-lg-0 mb-lg-5 pe-lg-n2 me-lg-2'
                    id='kt_docs_aside_menu_wrapper'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-height='auto'
                    data-kt-scroll-dependencies='#kt_docs_aside_logo'
                    data-kt-scroll-wrappers='#kt_docs_aside_menu'
                    data-kt-scroll-offset='10px'>
                    <div
                        id='#kt_docs_aside_menu'
                        data-kt-menu='true'
                        className='menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500'>
                        <div className='menu-item'>
                            <h4 className='menu-content text-muted mb-0 fs-7 text-uppercase'>
                                Getting started
                            </h4>
                        </div>
                        <div className='menu-item'>
                            <a
                                className='menu-link active'
                                href='https://preview.keenthemes.com/metronic8/react/docs/docs/quick-start'>
                                <span className='menu-title'>Quick Start</span>
                            </a>
                        </div>
                        <div className='menu-item'>
                            <a
                                className='menu-link'
                                href='https://preview.keenthemes.com/metronic8/react/docs/docs/overview'>
                                <span className='menu-title'>Overview</span>
                            </a>
                        </div>
                        <div className='menu-item'>
                            <a
                                className='menu-link'
                                href='https://preview.keenthemes.com/metronic8/react/docs/docs/deployment'>
                                <span className='menu-title'>Deployment</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSideMenu;
