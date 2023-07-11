import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import API_ROUTE from "../../../service/api";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import useMutation from "../../../hooks/useMutation";

const EmailVerify = () => {
    const { error, isLoading, postData } = useMutation(
        API_ROUTE.EMAIL_VERIFICATION,
        false
    );
    const [searchParams] = useSearchParams();
    const verification_code = searchParams.get("verification_code");
    const email = searchParams.get("email");

    const handleEmailVerification = async () => {
        if (!verification_code || !email)
            return toast.error("Something went wrong");
        const payload = { verification_code, email };
        const response = await postData(payload);
        if (response?.data?.status === "ok") {
            toast.success(response?.data?.message);
        } else {
            toast.error(error);
        }
    };

    return (
        <Button
            variant='primary'
            onClick={handleEmailVerification}
            className='float-end'>
            {isLoading ? (
                <>
                    <span className='ms-2'>Please Wait...</span>
                    <Spinner
                        size='sm'
                        animation='border'
                        role='status'></Spinner>
                </>
            ) : (
                <span>Submit</span>
            )}
        </Button>
    );
};

export default EmailVerify;
