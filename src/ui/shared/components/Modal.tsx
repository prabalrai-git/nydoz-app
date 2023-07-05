const Modal = () => {
    return (
        <div
            aria-labelledby='swal2-title'
            aria-describedby='swal2-html-container'
            className='swal2-popup swal2-modal swal2-icon-warning swal2-show'
            role='dialog'
            aria-live='assertive'
            aria-modal='true'>
            <button
                type='button'
                className='swal2-close'
                aria-label='Close this dialog'>
                ×
            </button>
            <ul className='swal2-progress-steps'></ul>
            <div className='swal2-icon swal2-warning swal2-icon-show'>
                <div className='swal2-icon-content'>!</div>
            </div>
            <img className='swal2-image' />
            <h2 className='swal2-title' id='swal2-title'></h2>
            <div className='swal2-html-container' id='swal2-html-container'>
                Are you sure you want to delete Product 1?
            </div>
            <input className='swal2-input' />
            <input type='file' className='swal2-file' />
            <div className='swal2-range'>
                <input type='range' />
                <output></output>
            </div>
            <select className='swal2-select'></select>
            <div className='swal2-radio'></div>
            <label className='swal2-checkbox'>
                <input type='checkbox' />
                <span className='swal2-label'></span>
            </label>
            <textarea className='swal2-textarea'></textarea>
            <div
                className='swal2-validation-message'
                id='swal2-validation-message'></div>
            <div className='swal2-actions'>
                <div className='swal2-loader'></div>
                <button
                    type='button'
                    className='swal2-confirm btn fw-bold btn-danger'
                    aria-label=''>
                    Yes, delete!
                </button>
                <button type='button' className='swal2-deny' aria-label=''>
                    No
                </button>
                <button
                    type='button'
                    className='swal2-cancel btn fw-bold btn-active-light-primary'
                    aria-label=''>
                    No, cancel
                </button>
            </div>
            <div className='swal2-footer'></div>
            <div className='swal2-timer-progress-bar-container'>
                <div className='swal2-timer-progress-bar'></div>
            </div>
        </div>
    );
};

export default Modal;
