import React from "react";

const test = () => {
    return (
        <div>
            <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                                <i className='ki-outline ki-arrow-up fs-3 text-success me-2'></i>
                                <div
                                    className='fs-2 fw-bold counted'
                                    data-kt-countup='true'
                                    data-kt-countup-value='4500'
                                    data-kt-countup-prefix='$'
                                    data-kt-initialized='1'>
                                    $4,500
                                </div>
                            </div>

                            <div className='fw-semibold fs-6 text-gray-400'>
                                Earnings
                            </div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                                <i className='ki-outline ki-arrow-down fs-3 text-danger me-2'></i>
                                <div
                                    className='fs-2 fw-bold counted'
                                    data-kt-countup='true'
                                    data-kt-countup-value='80'
                                    data-kt-initialized='1'>
                                    80
                                </div>
                            </div>

                            <div className='fw-semibold fs-6 text-gray-400'>
                                Projects
                            </div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                                <i className='ki-outline ki-arrow-up fs-3 text-success me-2'></i>
                                <div
                                    className='fs-2 fw-bold counted'
                                    data-kt-countup='true'
                                    data-kt-countup-value='60'
                                    data-kt-countup-prefix='%'
                                    data-kt-initialized='1'>
                                    %60
                                </div>
                            </div>

                            <div className='fw-semibold fs-6 text-gray-400'>
                                Success Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default test;
