const Address = () => {
    return (
        <div
            className='card card-flush'
            data-select2-id='select2-data-372-3w8d'>
            <div className='card-header'>
                <div className='card-title'>
                    <h2>Company Address</h2>
                </div>
            </div>
            <div
                className='card-body pt-0'
                data-select2-id='select2-data-371-ayhy'>
                <div
                    className='d-flex flex-column gap-5 gap-md-7'
                    data-select2-id='select2-data-370-uebc'>
                    <div className='d-flex flex-column flex-md-row gap-5'>
                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                            <label className='required form-label'>
                                Address Line 1
                            </label>
                            <input
                                className='form-control'
                                name='billing_order_address_1'
                                placeholder='Address Line 1'
                                value=''
                            />
                            <div className='fv-plugins-message-container invalid-feedback'></div>
                        </div>
                        <div className='flex-row-fluid'>
                            <label className='form-label'>Address Line 2</label>
                            <input
                                className='form-control'
                                name='billing_order_address_2'
                                placeholder='Address Line 2'
                            />
                        </div>
                    </div>
                    <div className='d-flex flex-column flex-md-row gap-5'>
                        <div className='flex-row-fluid'>
                            <label className='form-label'>City</label>
                            <input
                                className='form-control'
                                name='billing_order_city'
                                placeholder=''
                                value=''
                            />
                        </div>
                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                            <label className='required form-label'>
                                Postcode
                            </label>
                            <input
                                className='form-control'
                                name='billing_order_postcode'
                                placeholder=''
                                value=''
                            />
                            <div className='fv-plugins-message-container invalid-feedback'></div>
                        </div>
                        <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                            <label className='required form-label'>State</label>
                            <input
                                className='form-control'
                                name='billing_order_state'
                                placeholder=''
                                value=''
                            />
                            <div className='fv-plugins-message-container invalid-feedback'></div>
                        </div>
                    </div>
                    <div
                        className='fv-row fv-plugins-icon-container'
                        data-select2-id='select2-data-369-n1iy'>
                        <label className='required form-label'>Country</label>
                        <select className='form-select' name='' id=''>
                            <option value=''>sdsd</option>
                        </select>
                        <div className='fv-plugins-message-container invalid-feedback'></div>
                    </div>

                    <div
                        className='d-none d-flex flex-column gap-5 gap-md-7'
                        id='kt_ecommerce_edit_order_shipping_form'>
                        <div className='fs-3 fw-bold mb-n2'>
                            Shipping Address
                        </div>

                        <div className='d-flex flex-column flex-md-row gap-5'>
                            <div className='fv-row flex-row-fluid'>
                                <label className='form-label'>
                                    Address Line 1
                                </label>

                                <input
                                    className='form-control'
                                    name='kt_ecommerce_edit_order_address_1'
                                    placeholder='Address Line 1'
                                    value=''
                                />
                            </div>
                            <div className='flex-row-fluid'>
                                <label className='form-label'>
                                    Address Line 2
                                </label>

                                <input
                                    className='form-control'
                                    name='kt_ecommerce_edit_order_address_2'
                                    placeholder='Address Line 2'
                                />
                            </div>
                        </div>

                        <div className='d-flex flex-column flex-md-row gap-5'>
                            <div className='flex-row-fluid'>
                                <label className='form-label'>City</label>

                                <input
                                    className='form-control'
                                    name='kt_ecommerce_edit_order_city'
                                    placeholder=''
                                    value=''
                                />
                            </div>
                            <div className='fv-row flex-row-fluid'>
                                <label className='form-label'>Postcode</label>

                                <input
                                    className='form-control'
                                    name='kt_ecommerce_edit_order_postcode'
                                    placeholder=''
                                    value=''
                                />
                            </div>
                            <div className='fv-row flex-row-fluid'>
                                <label className='form-label'>State</label>

                                <input
                                    className='form-control'
                                    name='kt_ecommerce_edit_order_state'
                                    placeholder=''
                                    value=''
                                />
                            </div>
                        </div>

                        <div className='fv-row'>
                            <label className='form-label'>Country</label>
                            <select name='' id=''>
                                <option value=''>sdsd</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
