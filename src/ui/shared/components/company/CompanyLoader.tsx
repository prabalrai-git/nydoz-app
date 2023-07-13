import Spinner from "react-bootstrap/Spinner";

interface IProps {
    companyTitle?: string;
}

function CompanyLoader() {
    return (
        <Spinner animation='border' role='status'>
            <span className='visually-hidden'>company Title...</span>
        </Spinner>
    );
}

export default CompanyLoader;
