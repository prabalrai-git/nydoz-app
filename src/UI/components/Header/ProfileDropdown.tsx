const ProfileDropdown = () => {
    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show'
            data-kt-menu='true'
            style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: "0px",
                transform: "translate3d(-139.5px, 79px, 0px)",
                zIndex: 108,
            }}
            data-popper-placement='bottom-end'>
            <div className='menu-item px-3'>
                <div className='menu-content d-flex align-items-center px-3'>
                    <div className='symbol symbol-50px me-5'>
                        <img alt='Logo' src='assets/media/avatars/300-1.jpg' />
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='fw-bold d-flex align-items-center fs-5'>
                            Max Smith
                            <span className='badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2'>
                                Pro
                            </span>
                        </div>
                        <a
                            href='#'
                            className='fw-semibold text-muted text-hover-primary fs-7'>
                            max@kt.com
                        </a>
                    </div>
                </div>
            </div>
            <div className='separator my-2'></div>
            <div className='menu-item px-5'>
                <a
                    href='../../demo31/dist/account/overview.html'
                    className='menu-link px-5'>
                    My Profile
                </a>
            </div>
            <div className='separator my-2'></div>
            <div className='menu-item px-5'>
                <a
                    href='../../demo31/dist/authentication/layouts/corporate/sign-in.html'
                    className='menu-link px-5'>
                    Sign Out
                </a>
            </div>
        </div>
    );
};

export default ProfileDropdown;
