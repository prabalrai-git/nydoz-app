import * as yup from "yup";

// "first_name": "string",
//   "last_name": "string",
//   "mobile": "string",
//   "email": "string",
//   "password": "string",
//   "password_confirmation": "string",

const LoginSchema = yup.object({
    email: yup
        .string()
        .email("Email must be a valid Email.")
        .required("Email is required."),
    password: yup
        .string()
        .min(6, "Password must be atleast 6 character long.")
        .required("Password is required."),
});

const UserRegisterSchema = yup.object({
    first_name: yup.string().required("First Name is a required."),
    last_name: yup.string().required("Last Name is a required."),
    mobile: yup.string(),
    email: yup
        .string()
        .email("Email must be a valid Email.")
        .required("Email Address is required."),
    password: yup.string().required("Password is required."),
    password_confirmation: yup
        .string()
        .required("Password confirmation is required.")
        .oneOf([yup.ref("password")], "Passwords must match"),
    isTermAndConditionAccepted: yup
        .boolean()
        .oneOf([true], "Please accept the terms and conditions.")
        .required("Please accept the terms and conditions."),
});

const ChangePasswordSchema = yup.object({
    current_password: yup.string().required("Current Password is required."),
    password: yup.string().required("New Password is required."),
    password_confirmation: yup
        .string()
        .required("Please enter your password is required.")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPasswordSchema = yup.object({
    password: yup.string().required("New Password is required."),
    password_confirmation: yup
        .string()
        .required("Please enter your password is required.")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

const ForgetPasswordSchema = yup.object({
    email: yup
        .string()
        .email("Email must be a valid Email.")
        .required("Email Address is required."),
});

export {
    LoginSchema,
    UserRegisterSchema,
    ChangePasswordSchema,
    ResetPasswordSchema,
    ForgetPasswordSchema,
};
