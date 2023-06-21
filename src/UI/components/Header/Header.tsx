const Header = () => {
    return (
        <div id='kt_app_header' className='app-header'>
            <div className=' container-fluid d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
                <div className='app-header-logo d-flex align-items-center ps-lg-2 me-lg-10'>
                    <div
                        className='btn btn-icon btn-color-gray-500 btn-active-color-primary w-35px h-35px ms-n2 me-2 d-flex d-lg-none'
                        id='kt_app_sidebar_mobile_toggle'>
                        <i className='ki-outline ki-abstract-14 fs-1'></i>
                    </div>
                    <a href='../../demo31/dist/index.html'>
                        <img alt='Logo' className='h-30px' />
                    </a>
                </div>
                {/* header logo end */}

                <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
                    <div
                        id='kt_app_header_menu_wrapper'
                        // menu left side
                        className='d-flex align-items-stretch'>
                        <div className='menu-link'>
                            <span className='menu-title'>Help</span>
                            <span className='menu-arrow'></span>
                        </div>
                    </div>
                    {/* menu left side end */}

                    {/* right side menu */}
                    <div className='app-navbar flex-shrink-0'>
                        <div className='app-navbar-item'>
                            <form
                                data-kt-search-element='form'
                                className='d-lg-block w-100 position-relative mb-5 mb-lg-0'
                                autoComplete='off'>
                                <input type='hidden' />
                                <i className='ki-outline ki-magnifier search-icon fs-2 text-gray-500 position-absolute top-50 translate-middle-y ms-5'></i>
                                <input
                                    type='text'
                                    className='search-input form-control form-control-sm '
                                    name='search'
                                    value=''
                                    placeholder='Search...'
                                    data-kt-search-element='input'
                                />
                                <span
                                    className='search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none'
                                    data-kt-search-element='spinner'>
                                    <span className='spinner-border h-15px w-15px align-middle text-gray-400'></span>
                                </span>
                                <span
                                    className='search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-4'
                                    data-kt-search-element='clear'>
                                    <i className='ki-outline ki-cross fs-2 fs-lg-1 me-0'></i>
                                </span>
                            </form>
                        </div>

                        <a
                            href='#'
                            className='btn btn-sm btn-flex btn-primary align-self-center ms-5 ms-lg-11 px-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_invite_friends'>
                            <i className='ki-outline ki-plus-square fs-3'></i>
                            Invite
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
