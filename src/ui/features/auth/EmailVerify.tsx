import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PublicAxios } from "../../../service/AxiosInstance";
import API_ROUTE from "../../../service/api";
import { IResponse } from "../../../types/axios.type";
import { IUserResponseResponse } from "../../../types/payload.type";
import { AxiosError } from "axios";

const EmailVerify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const verification_code = searchParams.get("verification_code");
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    useEffect(() => {
        const verifyEmail = async () => {
            const payload = {
                email,
                verification_code,
                name,
            };
            try {
                const response = await PublicAxios.post<
                    IResponse<IUserResponseResponse>
                >(API_ROUTE.EMAIL_VERIFICATION, payload);

                console.log(response.data, "response.data");

                if (response?.data?.status === "ok") {
                    navigate("/auth/login");
                }
            } catch (error) {
                const err = error as AxiosError;
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message);
                } else {
                    toast.error("Something went wrong!");
                }
            }
        };
        if (verification_code && email) {
            verifyEmail();
        } else {
            toast.error("Something went wrong!");
        }
    }, [email, navigate, verification_code]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default EmailVerify;
