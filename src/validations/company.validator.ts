import * as yup from "yup";

export const companySchema = yup.object().shape({
    name: yup.string().required(),
    subdomain: yup
        .string()
        .matches(/^\S*$/, "Subdomain should not contain spaces")
        .required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup
        .string()
        .matches(/^\S*$/, "Postal Code should not contain spaces")
        .required(),
    phone_number: yup.string().required(),
    contact_person: yup.string().required(),
    website: yup.string().url().required(),
    registration_type: yup.string().required(),
    registration_number: yup.string().required(),
});

export const companyRolesSchema = yup.object().shape({
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
