import { Link } from "react-router-dom";
import CompanyBreadcrumb from "../../../shared/molecules/CompanyBreadcrumb";

const EnrollmentList = () => {
    return (
        <div>
            <div>
                <CompanyBreadcrumb
                    title='CRM Enrollments'
                    btnText='Back'
                    showBreadcrumb={true}
                />
            </div>
            <div className='card shadow-sm'>
                <div className='card-header'>
                    <h3 className='card-title'>Enrollment List</h3>
                    <div className='card-toolbar'>
                        <Link
                            to={"../add"}
                            type='button'
                            className='btn btn-sm btn-info'>
                            Add
                        </Link>
                    </div>
                </div>
                <div className='card-body'>list</div>
            </div>
        </div>
    );
};

export default EnrollmentList;
