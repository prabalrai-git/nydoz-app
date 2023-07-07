import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='text-center'>
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
                <Spinner
                    className='mx-2'
                    variant='warning'
                    animation='grow'
                    size='sm'
                />
            </div>
        </div>
    );
};

export default LoadingPage;
