import { IAgentResponse } from "../../../../types/payload.type";
import Accordion from "react-bootstrap/Accordion";

const ViewModal = (props: IAgentResponse) => {
    const { id } = props;

    return (
        <div key={id} className='card mb-5 mb-xl-8'>
            <div className='card-body'>
                <div className='d-flex flex-center flex-column py-5'>
                    <div className='symbol symbol-100px symbol-circle mb-7'>
                        <img src='assets/media/avatars/300-6.jpg' alt='image' />
                    </div>

                    <a
                        href='#'
                        className='fs-3 text-gray-800 text-hover-primary fw-bold mb-3'>
                        Emma Smith
                    </a>

                    <div className='mb-9'>
                        <div className='badge badge-lg badge-light-primary d-inline'>
                            Administrator
                        </div>
                    </div>

                    <div className='fw-bold mb-3'>
                        Assigned Tickets
                        <span
                            className='ms-2'
                            ddata-bs-toggle='popover'
                            data-bs-trigger='hover'
                            data-bs-html='true'
                            data-bs-content='Number of support tickets assigned, closed and pending this week.'>
                            <i className='ki-outline ki-information fs-7'></i>
                        </span>
                    </div>

                    <div className='d-flex flex-wrap flex-center'>
                        <div className='border border-gray-300 border-dashed rounded py-3 px-3 mb-3'>
                            <div className='fs-4 fw-bold text-gray-700'>
                                <span className='w-75px'>243</span>
                                <i className='ki-outline ki-arrow-up fs-3 text-success'></i>
                            </div>
                            <div className='fw-semibold text-muted'>Total</div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3'>
                            <div className='fs-4 fw-bold text-gray-700'>
                                <span className='w-50px'>56</span>
                                <i className='ki-outline ki-arrow-down fs-3 text-danger'></i>
                            </div>
                            <div className='fw-semibold text-muted'>Solved</div>
                        </div>

                        <div className='border border-gray-300 border-dashed rounded py-3 px-3 mb-3'>
                            <div className='fs-4 fw-bold text-gray-700'>
                                <span className='w-50px'>188</span>
                                <i className='ki-outline ki-arrow-up fs-3 text-success'></i>
                            </div>
                            <div className='fw-semibold text-muted'>Open</div>
                        </div>
                    </div>
                </div>
                <div className='separator'></div>
                <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Details</Accordion.Header>
                        <Accordion.Body>
                            <div
                                id='kt_user_view_details'
                                className='collapse show'>
                                <div className='pb-5 fs-6'>
                                    <div className='fw-bold mt-5'>
                                        Account ID
                                    </div>
                                    <div className='text-gray-600'>
                                        ID-45453423
                                    </div>

                                    <div className='fw-bold mt-5'>Email</div>
                                    <div className='text-gray-600'>
                                        <a
                                            href='#'
                                            className='text-gray-600 text-hover-primary'>
                                            info@keenthemes.com
                                        </a>
                                    </div>

                                    <div className='fw-bold mt-5'>Address</div>
                                    <div className='text-gray-600'>
                                        101 Collin Street,
                                        <br />
                                        Melbourne 3000 VIC
                                        <br />
                                        Australia
                                    </div>

                                    <div className='fw-bold mt-5'>Language</div>
                                    <div className='text-gray-600'>English</div>

                                    <div className='fw-bold mt-5'>
                                        Last Login
                                    </div>
                                    <div className='text-gray-600'>
                                        19 Aug 2023, 10:30 am
                                    </div>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default ViewModal;
