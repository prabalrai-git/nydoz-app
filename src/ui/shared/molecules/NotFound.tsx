import { useNavigate } from "react-router-dom";

interface Iprops {
    title: string;
}

const NotFound = (props: Iprops) => {
    const navigate = useNavigate();
    const title = props.title;
    return (
        <div className='text-center my-6 px-3'>
            <h1 className='text-warning'>{title ?? "Not Found"} </h1>
            <button
                onClick={() => navigate(-1)}
                className='btn btn-secondary my-3 btn-sm'>
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
