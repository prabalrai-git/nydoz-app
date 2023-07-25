interface IProps {
    title: string | undefined;
}

const Sidebar = (props: IProps) => {
    const { title } = props;
    return (
        <div className='app-sidebar-primary'>
            <div
                className='d-flex flex-column flex-center fs-12 fw-bolder px-2 mb-5 '
                id='kt_app_sidebar_primary_header'>
                <span className='text-uppercase'>{title}</span>
            </div>
            <div
                className='app-sidebar-nav flex-grow-1 hover-scroll-overlay-y px-5 pt-2'
                id='kt_app_sidebar_primary_nav'
                data-kt-scroll='true'
                data-kt-scroll-height='auto'
                data-kt-scroll-dependencies='#kt_app_header, #kt_app_sidebar_primary_header, #kt_app_sidebar_primary_footer'
                data-kt-scroll-wrappers='#kt_app_content, #kt_app_sidebar_primary_nav'
                data-kt-scroll-offset='5px'
                style={{
                    height: " 629px",
                }}>
                <ul className='nav' role='tablist'>
                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_collections'
                            className='nav-link py-4 px-1 btn'
                            aria-selected='false'
                            role='tab'>
                            <i className='ki-outline ki-questionnaire-tablet fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                Collections
                            </span>
                        </a>
                    </li>
                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_apis'
                            className='nav-link py-4 px-1 btn active'
                            aria-selected='true'
                            role='tab'>
                            <i className='ki-outline ki-abstract-26 fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                APIs
                            </span>
                        </a>
                    </li>

                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_environment'
                            className='nav-link py-4 px-1 btn'
                            aria-selected='false'
                            role='tab'>
                            <i className='ki-outline ki-notification-status fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                Environment
                            </span>
                        </a>
                    </li>

                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_servers'
                            className='nav-link py-4 px-1 btn'
                            aria-selected='false'
                            role='tab'>
                            <i className='ki-outline ki-message-notif fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                Servers
                            </span>
                        </a>
                    </li>

                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_notifications'
                            className='nav-link py-4 px-1 btn'
                            aria-selected='false'
                            role='tab'>
                            <i className='ki-outline ki-rocket fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                Notifications
                            </span>
                        </a>
                    </li>

                    <li className='nav-item py-1' role='presentation'>
                        <a
                            data-bs-toggle='tab'
                            href='#kt_app_sidebar_secondary_history'
                            className='nav-link py-4 px-1 btn'
                            aria-selected='false'
                            role='tab'>
                            <i className='ki-outline ki-chart-line fs-1'></i>
                            <span className='pt-2 fs-9 fs-lg-7 fw-bold'>
                                History
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* <!--begin::Footer--> */}
            <div
                className='app-sidebar-footer d-flex flex-column flex-center'
                id='kt_app_sidebar_primary_footer'>
                <div className='mb-0'>
                    <button
                        type='button'
                        className='btn btn-icon btn-color-gray-400 btn-active-color-primary'
                        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                        data-kt-menu-overflow='true'
                        data-kt-menu-placement='top-start'>
                        <i className='ki-outline ki-notification-status fs-1'></i>
                    </button>
                    <div
                        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px'
                        data-kt-menu='true'>
                        <div className='menu-item px-3'>
                            <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>
                                Quick Actions
                            </div>
                        </div>

                        <div className='separator mb-3 opacity-75'></div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Ticket
                            </a>
                        </div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Customer
                            </a>
                        </div>

                        <div
                            className='menu-item px-3'
                            data-kt-menu-trigger='hover'
                            data-kt-menu-placement='right-start'>
                            <a href='#' className='menu-link px-3'>
                                <span className='menu-title'>New Group</span>
                                <span className='menu-arrow'></span>
                            </a>

                            <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Admin Group
                                    </a>
                                </div>

                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Staff Group
                                    </a>
                                </div>

                                <div className='menu-item px-3'>
                                    <a href='#' className='menu-link px-3'>
                                        Member Group
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='menu-item px-3'>
                            <a href='#' className='menu-link px-3'>
                                New Contact
                            </a>
                        </div>

                        <div className='separator mt-3 opacity-75'></div>

                        <div className='menu-item px-3'>
                            <div className='menu-content px-3 py-3'>
                                <a
                                    className='btn btn-primary btn-sm px-4'
                                    href='#'>
                                    Generate Reports
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
