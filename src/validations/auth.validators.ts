import * as yup from "yup";

const LoginSchema = yup.object({
    email: yup.string().email().required("Email must be a valid Email."),
    password: yup.string().required(),
});
const RegisterSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
});

export { LoginSchema, RegisterSchema };
