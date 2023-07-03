// {
//   "name": "string",
//   "subdomain": "string",
//   "owner_id": 0,
//   "status_id": 0,
//   "email": "string",
//   "address": "string",
//   "country": "string",
//   "state": "string",
//   "city": "string",
//   "postal_code": "string",
//   "country_calling_code": "string",
//   "phone_number": "string",
//   "contact_person": "string",
//   "website": "string",
//   "registration_type": "string",
//   "registration_number": "string",
//   "logo": "string",
//   "cover_image": "string"
// }

import Address from "../../shared/components/Address";
import Heading from "../../shared/molecules/Heading";

const AddCompany = () => {
    return (
        <div>
            <Heading
                title='Create Company'
                btnText='Back'
                showBreadcrumb={true}
            />
            <section>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <div className='card card-flush py-4'>
                            <div className='card-header'>
                                <div className='card-title'>
                                    <h2>Add Logo</h2>
                                </div>
                            </div>

                            <div className='card-body text-center pt-0'>
                                <div
                                    className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
                                    data-kt-image-input='true'>
                                    <div className='image-input-wrapper w-100px h-100px'></div>

                                    <label
                                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                        data-kt-image-input-action='change'
                                        data-bs-toggle='tooltip'
                                        aria-label='Change avatar'
                                        data-bs-original-title='Change avatar'
                                        data-kt-initialized='1'>
                                        <i className='ki-outline ki-pencil fs-7'></i>

                                        <input
                                            type='file'
                                            name='avatar'
                                            accept='.png, .jpg, .jpeg'
                                        />
                                        <input
                                            type='hidden'
                                            name='avatar_remove'
                                        />
                                    </label>

                                    <span
                                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                        data-kt-image-input-action='cancel'
                                        data-bs-toggle='tooltip'
                                        aria-label='Cancel avatar'
                                        data-bs-original-title='Cancel avatar'
                                        data-kt-initialized='1'>
                                        <i className='ki-outline ki-cross fs-2'></i>
                                    </span>

                                    <span
                                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                                        data-kt-image-input-action='remove'
                                        data-bs-toggle='tooltip'
                                        aria-label='Remove avatar'
                                        data-bs-original-title='Remove avatar'
                                        data-kt-initialized='1'>
                                        <i className='ki-outline ki-cross fs-2'></i>
                                    </span>
                                </div>

                                <div className='text-muted fs-7'>
                                    Set the company's Logo image. Only *.png,
                                    *.jpg and *.jpeg image files are accepted
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8'>
                        <div className='card card-flush py-4'>
                            <div className='card-header'>
                                <div className='card-title'>
                                    <h2>upload Cover Picture</h2>
                                </div>
                            </div>

                            <div className='card-body pt-0'>
                                <div className='fv-row mb-2'>
                                    <div
                                        className='dropzone dz-clickable'
                                        id='kt_ecommerce_add_product_media'>
                                        <div className='dz-message needsclick'>
                                            <i className='ki-outline ki-file-up text-primary fs-3x'></i>

                                            <div className='ms-4'>
                                                <h3 className='fs-5 fw-bold text-gray-900 mb-1'>
                                                    Drop files here or click to
                                                    upload.
                                                </h3>
                                                <span className='fs-7 fw-semibold text-gray-400'>
                                                    Upload up to 10 files
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='text-muted fs-7'>
                                    Set the product media gallery.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* image section ends */}
                {/* company details section starts */}
                <div className='row'>
                    <div className='card card-flush'>
                        <div className='card-header'>
                            <div className='card-title'>
                                <h2>Company Details</h2>
                            </div>
                        </div>
                        <div className='card-body pt-0'>
                            <div className='row'>
                                <div className='col-12 gap-5 gap-md-7 mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Name:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='company name'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Website:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='website url'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 gap-5 gap-md-7 mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Website Subdomain:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='website subdomain'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Email:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='Email Address'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6  mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Contact Person:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='Enter contact person name'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Registration Type:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='Enter registration type'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6  mb-6'>
                                    <div className='fv-row flex-row-fluid fv-plugins-icon-container'>
                                        <label className='required form-label'>
                                            Registration Number:
                                        </label>
                                        <input
                                            className='form-control'
                                            name='billing_order_address_1'
                                            placeholder='Enter registration number'
                                            value=''
                                        />
                                        <div className='fv-plugins-message-container invalid-feedback'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card card-flush'>
                    <div className='card-header'>
                        <div className='card-title'>
                            <h2>Company Address</h2>
                        </div>
                    </div>
                    <div className='card-body pt-0'>
                        <div className='row'>
                            <div className='col-12 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        Address Line
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your full address'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-3 col-md-4 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        Country Calling Code
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your country calling code'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-9 col-md-8 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        Phone Number
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your phone number'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        City
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your city address'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        State
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your state'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4 mb-6'>
                                <div className=' flex-row-fluid'>
                                    <label className='required form-label'>
                                        postal Code
                                    </label>
                                    <input
                                        className='form-control'
                                        name='billing_order_address_1'
                                        placeholder='Enter your postal address'
                                        value=''
                                    />
                                    <div className=' invalid-feedback'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end my-6 mb-6'>
                    <button className='btn btn-secondary me-5 mb-6'>
                        Cancel
                    </button>
                    <button type='submit' className='btn btn-primary mb-6'>
                        <span className='indicator-label'>Save Changes</span>
                        <span className='indicator-progress'>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AddCompany;
