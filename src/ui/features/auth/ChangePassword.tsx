import Images from "../../../constants/Images";

const ChangePassword = () => {
    return (
        <div className='bg-light h-100vh '>
            <div className='container '>
                <div className='row '>
                    <div className='col-md-4 offset-md-4'>
                        <div className='card mt-4'>
                            <div className='card-body'>
                                <div className='text-center mb-5'>
                                    <img
                                        src={Images.CompanyLogo}
                                        height='48'
                                        className='mb-4'
                                    />
                                    <h5>Change Password</h5>
                                </div>
                                <form>
                                    <div className='form-group mb-3'>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='Current Password'
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='New Password'
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='Confirm Password'
                                        />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button className='btn btn-primary btn-block w-100'>
                                            Change Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
