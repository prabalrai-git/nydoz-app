import { Link } from "react-router-dom";

const EnrollmentList = () => {
    return (
        <div className='card shadow-sm'>
            <div className='card-header'>
                <h3 className='card-title'>Enrollment List</h3>
                <div className='card-toolbar'>
                    <Link
                        to={"add"}
                        type='button'
                        className='btn btn-sm btn-info'>
                        Add
                    </Link>
                </div>
            </div>
            <div className='card-body'>list</div>
        </div>
    );
};

export default EnrollmentList;
