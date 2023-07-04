import Spinner from "react-bootstrap/Spinner";

interface IProps {
    title?: string;
}

const LoadingSpinner = (props: IProps) => {
    const { title } = props;
    return (
        <Spinner variant='primary' animation='border' role='status'>
            <span className='visually-hidden'>{title}</span>
        </Spinner>
    );
};

export default LoadingSpinner;
