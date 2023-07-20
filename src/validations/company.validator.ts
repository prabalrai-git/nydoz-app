import * as yup from "yup";

export const companySchema = yup.object().shape({
    name: yup.string().required("Company Name is required."),
    subdomain: yup
        .string()
        .matches(/^\S*$/, "Subdomain should not contain spaces.")
        .required("Subdomain is required."),
    email: yup
        .string()
        .email("Email must be a valid Email.")
        .required("Email is required."),
    address: yup.string().required("Address is required."),
    state: yup.string().required("State is required."),
    city: yup.string().required("City is required."),
    postal_code: yup
        .string()
        .matches(/^\S*$/, "Postal Code should not contain spaces.")
        .required(),
    phone_number: yup.string().required("Phone Number is required."),
    contact_person: yup.string().required("Contact Person's name is required."),
    website: yup.string().url().required("Website name is required."),
    registration_type: yup
        .string()
        .required("Registration Type is required. VAT, TIN, etc."),
    registration_number: yup
        .string()
        .required("Registration Number is required."),
});

export const companyRolesSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
});

export const VisaTypeSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
});

export const agentSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
        .string()
        .required()
        .max(15, "Mobile Number field must not be greater than 15 characters."),
    state: yup.string().required(),
    city: yup.string().required(),
    street_address: yup.string().required(),
    postal_code: yup
        .string()
        .matches(/^\S*$/, "Postal Code should not contain spaces")
        .max(
            10,
            "The postal code field must not be greater than 10 characters."
        )
        .required(),
});

// CompanySocialLinks Schema

export const CompanySocialLinkSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .trim()
        .strict(true)
        .matches(
            /^\S+$/,
            "Title should not contain spaces.Eg:- Facebook.com, Twitter, etc"
        ),
    link: yup
        .string()
        .required("Link is required")
        .url(
            "Invalid URL format. URL should be like:-  https://www.example.com"
        ),
});
