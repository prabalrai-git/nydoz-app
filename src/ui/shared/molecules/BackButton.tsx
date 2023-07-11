import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(-1)}
            className='btn btn-secondary fs-7 fw-bold btn-sm mb-3'>
            {/* <CaretLeft size={14} /> */}
            <span>Back</span>
        </Button>
    );
};

export default BackButton;
