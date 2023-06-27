import * as yup from "yup";

// "first_name": "string",
//   "last_name": "string",
//   "mobile": "string",
//   "email": "string",
//   "password": "string",
//   "password_confirmation": "string",

const LoginSchema = yup.object({
    email: yup.string().email().required("Email must be a valid Email."),
    password: yup.string().required(),
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

export { LoginSchema, UserRegisterSchema, ChangePasswordSchema };
