import { IPagination } from "../../../types/axios.type";
import { RESULT_PER_PAGE_LIST } from "../../../constants/AppSetting";

interface IPaginationProps {
    pagination: IPagination;
    handlePrevious: () => void;
    handleNext: () => void;
    handlePerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination = (props: IPaginationProps) => {
    const { pagination, handlePrevious, handleNext, handlePerPageChange } =
        props;

    return (
        <div className='row my-3'>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-start'>
                <label className=' me-3'>Result Per page</label>
                <div className='d-flex justify-content-between  align-items-center'>
                    <select
                        value={pagination?.per_page || 20}
                        onChange={handlePerPageChange}
                        name='kt_customers_table_length'
                        aria-controls='kt_customers_table'
                        className=' form-select form-select-sm form-select-solid'>
                        {RESULT_PER_PAGE_LIST.map((item: number, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-end'>
                <div
                    className='dataTables_paginate paging_simple_numbers'
                    id='kt_customers_table_paginate'>
                    <ul className='pagination'>
                        <li
                            onClick={handlePrevious}
                            className={
                                pagination.current_page === 1
                                    ? "paginate_button page-item disabled"
                                    : "paginate_button page-item"
                            }
                            id='kt_customers_table_previous'>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='0'
                                className='page-link'>
                                <i className='previous'></i>
                                <span className='ms-3'>Prev</span>
                            </a>
                        </li>
                        <li className='paginate_button page-item active'>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='1'
                                className='page-link'>
                                1
                            </a>
                        </li>
                        <li className='paginate_button page-item '>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='2'
                                className='page-link'>
                                2
                            </a>
                        </li>
                        <li className='paginate_button page-item '>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='3'
                                className='page-link'>
                                3
                            </a>
                        </li>
                        <li className='paginate_button page-item '>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='4'
                                className='page-link'>
                                4
                            </a>
                        </li>
                        <li
                            onClick={handleNext}
                            className='paginate_button page-item next'
                            id='kt_customers_table_next'>
                            <a
                                href='#'
                                aria-controls='kt_customers_table'
                                data-dt-idx='5'
                                className='page-link me-3'>
                                Next
                                <i className='next'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
